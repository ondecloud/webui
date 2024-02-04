import DownloadStateDrawer from '@/pages/Download/components/DownloadStateDrawer';
import {
  requestDownloadList,
  requestDownloadStart,
  requestDownloadStop,
} from '@/pages/Download/service';
import CreateForm from '@/pages/Table/components/CreateForm';
import { addDownload, deleteDownload } from '@/services/DownloadController';
import { Link } from '@@/exports';
import { SettingFilled } from '@ant-design/icons';
import {
  ActionType,
  FooterToolbar,
  PageContainer,
  ProColumns,
  ProTable,
} from '@ant-design/pro-components';
import { FormattedMessage } from '@umijs/max';
import { Button, message } from 'antd';
import React, { Key, useRef, useState } from 'react';
import style from './index.less';

/**
 * 添加节点
 * @param fields
 */
const handleAdd = async (fields: API.ResourceInfoV0) => {
  const hide = message.loading('正在添加');
  try {
    await addDownload({ ...fields });
    hide();
    message.success('添加成功');
    return true;
  } catch (error) {
    hide();
    message.error('添加失败请重试！');
    return false;
  }
};

/**
 *  删除节点
 * @param selectedRows
 */
const handleRemove = async (selectedRows: API.DownloadInfo[]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;
  try {
    await deleteDownload({
      id: selectedRows.find((row) => row.id)?.id || '0',
    });
    hide();
    message.success('删除成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    message.error('删除失败，请重试');
    return false;
  }
};

// function onRowSelect(param: any[], param2: Record<string, any>[]) {}

const DownloadPage: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [selectedRows, setSelectedRows] = useState<API.DownloadInfo[]>([]);
  const [selectRowKeys, setSelectedRowKeys] = useState<Key[]>([]);
  const [downloadStateDrawer, setDownloadStateDrawer] = useState(false);
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState<API.DownloadInfo[]>([]);
  const tabList = [
    {
      tab: '全部',
      key: 'all',
      closable: false,
    },
    {
      tab: '下载中',
      key: 'downloading',
      closable: false,
    },
    {
      tab: '已完成',
      key: 'finished',
      closable: false,
    },
  ];

  // const [data, success] = useSelector(requestDownloadList);
  async function getDownloadList() {
    setLoading(true);
    let res = await requestDownloadList([]);
    setRows(res.data);
    setLoading(false);
    return res;
  }

  async function startDownload(id: string) {
    let res = await requestDownloadStart(id);
    console.log('start', id, res);
  }

  async function stopDownload(id: string) {
    let res = await requestDownloadStop(id);
    console.log('stop', id, res);
  }

  const columns: ProColumns<API.DownloadInfo>[] = [
    {
      title: 'ID',
      dataIndex: 'id',
      className: 'id',
      hideInSearch: true,
      hideInForm: true,
      hideInTable: true,
    },
    {
      title: <FormattedMessage id="home.fileName" />,
      dataIndex: 'file_name',
      className: 'file_name',
      valueType: 'text',
    },
    {
      title: <FormattedMessage id="home.progress" />,
      dataIndex: 'progress',
      className: 'progress',
      width: 120,
      valueType: 'text',
      renderText: (_, record: API.DownloadInfo) => {
        if (!record.progress) return '0%';
        return record.progress + '%';
      },
    },
    {
      title: <FormattedMessage id="home.status" />,
      dataIndex: 'status',
      className: 'status',
      width: 80,
      valueType: 'text',
      renderText: (text: any, record: API.DownloadInfo) => {
        console.log('renderText', text, record);
        switch (record.state) {
          case 0:
            return (
              <Button type={'primary'} onClick={() => startDownload(record.id)}>
                <FormattedMessage id="download.start" />
              </Button>
            );
          case 1:
            return (
              <Button type={'primary'} onClick={() => stopDownload(record.id)}>
                <FormattedMessage id="download.stop" />
              </Button>
            );
          case 2:
            return (
              <Button type={'primary'} onClick={() => stopDownload(record.id)}>
                <FormattedMessage id="download.restart" />
              </Button>
            );
        }
      },
    },
  ];

  const addColumns: ProColumns<API.ResourceInfoV0>[] = [
    {
      title: <FormattedMessage id="download.fileName" />,
      dataIndex: 'file_name',
      className: 'file_name',
      valueType: 'text',
      editable: false,
    },
    {
      title: <FormattedMessage id="download.type" />,
      dataIndex: 'type',
      className: 'type',
      valueType: 'select',
      valueEnum: {
        http: {
          text: <FormattedMessage id="download.type.http" />,
          status: 'http',
        },
        ftp: {
          text: <FormattedMessage id="download.type.ftp" />,
          status: 'ftp',
        },
      },
    },
    {
      title: <FormattedMessage id="download.url" />,
      dataIndex: 'url',
      className: 'url',
      // width: 80,
      valueType: 'text',
    },
  ];

  function onRowSelect(record: API.DownloadInfo, index: Key, event: any) {
    // console.log(index, record, event);
    setSelectedRows(selectedRows.concat(record));
    setSelectedRowKeys(selectRowKeys.concat(index));
    setDownloadStateDrawer(true);
    event.stopPropagation(); //阻止默认事件
  }

  console.log(selectedRows);

  return (
    <PageContainer
      className={style.pageContainer}
      ghost
      tabList={tabList}
      header={{
        style: {
          paddingBlock: 0,
          paddingInline: 15,
        },
      }}
      childrenContentStyle={{
        paddingBlock: 0,
        paddingInline: 15,
      }}
      title={
        <Link to="/setting">
          <SettingFilled> </SettingFilled>
          <span>设置</span>
        </Link>
      }
    >
      <ProTable<API.DownloadInfo>
        // className="home-download-list-table"
        headerTitle="下载列表"
        actionRef={actionRef}
        rowKey="id"
        loading={loading}
        search={false}
        cardProps={{
          bodyStyle: {
            paddingBlock: 0,
            paddingInline: 30,
          },
        }}
        tableAlertRender={false}
        // style={{ height: '100%' }}
        dataSource={rows}
        // scroll={{ y: 'calc(100vh - 400px)' }}
        toolBarRender={() => [
          <Button
            key="1"
            type="primary"
            onClick={() => handleModalVisible(true)}
          >
            新建下载
          </Button>,
        ]}
        request={getDownloadList}
        columns={columns}
        rowSelection={{
          onChange: (selectedRowKeys, selectedRows) => {
            setSelectedRows(selectedRows);
            setSelectedRowKeys(selectedRowKeys);
          },
          selectedRowKeys: selectRowKeys,
        }}
        onRow={(record, key) => {
          return {
            onClick: (event) => {
              if (key !== undefined) {
                onRowSelect(record, key, event);
              }
            },
          };
        }}
      />

      <CreateForm
        onCancel={() => handleModalVisible(false)}
        modalVisible={createModalVisible}
      >
        <ProTable<API.ResourceInfoV0, API.ResourceInfoV0Result>
          onSubmit={async (value) => {
            const success = await handleAdd(value);
            if (success) {
              handleModalVisible(false);
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          rowKey="id"
          type="form"
          columns={addColumns}
        />
      </CreateForm>
      <DownloadStateDrawer
        width={600}
        open={downloadStateDrawer}
        onClose={() => {
          setDownloadStateDrawer(false);
        }}
        closable={true}
        data={selectedRows[0]}
      />
      {selectedRows?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              已选择 <a style={{ fontWeight: 600 }}>{selectedRows.length}</a> 项
            </div>
          }
        >
          <Button
            onClick={async () => {
              await handleRemove(selectedRows);
              setSelectedRows([]);
              actionRef.current?.reloadAndRest?.();
            }}
          >
            删除选择
          </Button>
        </FooterToolbar>
      )}
    </PageContainer>
  );
};

export default DownloadPage;
