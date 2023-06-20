import StateInfoDrawer from '@/pages/Home/components/StateInfoDrawer';
import { requestDownloadList } from '@/pages/Home/service';
import CreateForm from '@/pages/Table/components/CreateForm';
import { addDownload, deleteDownload } from '@/services/DownloadController';
import { SettingFilled } from '@ant-design/icons';
import {
  ActionType,
  FooterToolbar,
  PageContainer,
  ProColumns,
  ProDescriptions,
  ProTable,
} from '@ant-design/pro-components';
import { Button, Drawer, message } from 'antd';
import React, { useRef, useState } from 'react';

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
      userId: selectedRows.find((row) => row.id)?.id || '',
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

const HomePage: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [selectedRowsState, setSelectedRows] = useState<API.DownloadInfo[]>([]);
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
  const detailList = [
    {
      tab: '文件',
      key: 'file',
      closable: false,
    },
    {
      tab: '详细信息',
      key: 'detail',
      closable: false,
    },
  ];

  // const [data, success] = useSelector(requestDownloadList);
  function getDownloadList() {
    setLoading(true);
    return requestDownloadList([]).then((res) => {
      setRows(res.data);
      setLoading(false);
      return res;
    });
  }

  const columns: ProColumns<API.DownloadInfo>[] = [
    {
      title: 'ID',
      dataIndex: 'id',
      className: 'id',
      hideInSearch: true,
      tip: '名称是唯一的 key',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '名称为必填项',
          },
        ],
      },
      width: 80,
    },
    // {
    //   title: 'URL',
    //   dataIndex: 'url',
    //   hideInSearch: true,
    //   valueType: 'text',
    // },
    {
      title: '文件名',
      dataIndex: 'file_name',
      className: 'file_name',
      // hideInForm: true,
      valueType: 'text',
      // valueEnum: {
      //   0: { text: '男', status: 'MALE' },
      //   1: { text: '女', status: 'FEMALE' },
      // },
    },
    {
      title: '进度',
      dataIndex: 'progress',
      className: 'progress',
      width: 120,
      valueType: 'text',
    },
    {
      title: '状态',
      dataIndex: 'status',
      className: 'status',
      width: 80,
      // hideInForm: true,
      valueType: 'text',
      // valueEnum: {
      //   0: { text: '男', status: 'MALE' },
      //   1: { text: '女', status: 'FEMALE' },
      // },
    },
  ];
  console.log(selectedRowsState);
  return (
    // <ProCard
    //   title="左右分栏带标题"
    //   extra="2019年9月28日"
    //   split={'vertical'} //: 'vertical'
    //   bordered
    //   headerBordered
    // >
    //   <ProCard title="左侧详情" colSpan="50%">
    <PageContainer
      ghost
      // style={{ ...style }}
      tabList={tabList}
      // style={{ height: '100%' }}
      // footer={[
      //   <Button key="3">重置</Button>,
      //   <Button key="2" type="primary">
      //     提交
      //   </Button>,
      // ]}
      title={
        <a href={'/setting'}>
          <SettingFilled> </SettingFilled>
          <span>设置</span>
        </a>
      }
    >
      <ProTable<API.DownloadInfo>
        headerTitle="下载列表"
        actionRef={actionRef}
        rowKey="id"
        loading={loading}
        search={{
          labelWidth: 120,
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
          onChange: (_, selectedRows) => setSelectedRows(selectedRows),
        }}
      />

      <CreateForm
        onCancel={() => handleModalVisible(false)}
        modalVisible={createModalVisible}
      >
        <ProTable<API.DownloadInfo, API.ResourceInfoV0>
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
          columns={columns}
        />
      </CreateForm>
      {/*{selectedRowsState?.length > 0 && (*/}
      <StateInfoDrawer
        width={600}
        open={selectedRowsState.length === 1}
        onClose={() => {
          setSelectedRows([]);
        }}
        closable={true}
        data={selectedRowsState[0]}
        tabList={detailList}
        title={selectedRowsState[0].file_name}
      />
      <Drawer
        width={600}
        open={selectedRowsState.length === 1}
        onClose={() => {
          setSelectedRows([]);
        }}
        closable={true}
      >
        {selectedRowsState?.length === 1 && (
          <PageContainer
            tabList={detailList}
            title={
              selectedRowsState.length === 1
                ? selectedRowsState[0].file_name
                : []
            }
          >
            <ProDescriptions<API.DownloadInfo>
              column={2}
              title={selectedRowsState[0].file_name}
              request={async () => ({
                data: selectedRowsState[0],
              })}
            />
          </PageContainer>
        )}
      </Drawer>

      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              已选择{' '}
              <a style={{ fontWeight: 600 }}>{selectedRowsState.length}</a>{' '}
              项&nbsp;&nbsp;
            </div>
          }
        >
          <Button
            onClick={async () => {
              await handleRemove(selectedRowsState);
              setSelectedRows([]);
              actionRef.current?.reloadAndRest?.();
            }}
          >
            批量删除
          </Button>
          <Button type="primary">批量审批</Button>
        </FooterToolbar>
      )}
    </PageContainer>
  );
};

export default HomePage;
