import { requestDownloadList } from '@/pages/Home/service';
import CreateForm from '@/pages/Table/components/CreateForm';
import { addDownload, deleteDownload } from '@/services/DownloadController';
import { SettingFilled } from '@ant-design/icons';
import {
  ActionType,
  FooterToolbar,
  PageContainer,
  ProDescriptionsItemProps,
  ProTable,
} from '@ant-design/pro-components';
import { Button, message } from 'antd';
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

  const columns: ProDescriptionsItemProps<API.DownloadInfo>[] = [
    {
      title: 'ID',
      dataIndex: 'id',
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
    },
    {
      title: 'URL',
      dataIndex: 'url',
      hideInSearch: true,
      valueType: 'text',
    },
    {
      title: 'FileName',
      dataIndex: 'filename',
      // hideInForm: true,
      valueType: 'text',
      // valueEnum: {
      //   0: { text: '男', status: 'MALE' },
      //   1: { text: '女', status: 'FEMALE' },
      // },
    },
  ];

  return (
    <PageContainer
      ghost
      title={
        <a href={'/setting'} style={{ fontSize: '120%' }}>
          <SettingFilled> </SettingFilled>
          <span>设置</span>
        </a>
      }
    >
      <ProTable<API.DownloadInfo>
        headerTitle="下载列表"
        actionRef={actionRef}
        rowKey="id"
        loading={false}
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button
            key="1"
            type="primary"
            onClick={() => handleModalVisible(true)}
          >
            新建下载
          </Button>,
        ]}
        request={requestDownloadList}
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
