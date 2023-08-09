import StateLine from '@/pages/Home/components/StateLine';
import {
  ListToolBarProps,
  PageContainer,
  ProColumns,
  ProTable,
} from '@ant-design/pro-components';
import { FormattedMessage } from '@umijs/max';
import { Drawer } from 'antd';
import React, { useState } from 'react';

interface DrawerProps {
  data: API.DownloadInfo;
  width: number;
  open: boolean;
  onClose: () => void;
  closable: boolean;
  tabList?: any[] | undefined;
}

const detailList = [
  {
    hide: true,
    tab: '文件',
    key: 'file',
    index: 1,
    closable: false,
  },
  {
    tab: '详细信息',
    key: 'detail',
    index: 0,
    closable: false,
  },
];

const columns: ProColumns<API.DownloadInfo>[] = [
  {
    title: 'ID',
    dataIndex: 'id',
    className: 'id',
    hideInSearch: true,
    hideInForm: true,
    hideInTable: true,
    width: 80,
  },
  {
    title: <FormattedMessage id="file.name" />,
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
    title: '大小',
    dataIndex: 'file_size',
    className: 'file_size',
    width: 80,
    // hideInForm: true,
    valueType: 'text',
    // valueEnum: {
    //   0: { text: '男', status: 'MALE' },
    //   1: { text: '女', status: 'FEMALE' },
    // },
  },
];

const DownloadStateDrawer: React.FC<DrawerProps> = (props: DrawerProps) => {
  const [tabSelected, setTabSelected] = useState<string>(detailList[0].key);
  const getDetailList = () => {
    return props.tabList === undefined ? detailList : props.tabList;
  };

  const toolBar: ListToolBarProps = {};

  return (
    <Drawer
      width={props.width}
      open={props.open}
      onClose={props.onClose}
      closable={true}
    >
      {props.open && (
        <PageContainer
          ghost
          // className="download-state-page-container"
          tabList={getDetailList()}
          tabActiveKey={tabSelected}
          title={props.data.file_name}
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
          onTabChange={(selectedKey: string) => {
            console.log('select', selectedKey);
            setTabSelected(selectedKey);
          }}
        >
          {tabSelected === 'file' && (
            <ProTable
              headerTitle={<FormattedMessage id="file.list" />}
              toolbar={toolBar}
              search={false}
              columns={columns}
              toolBarRender={false}
              cardProps={{
                // tabs: {
                bodyStyle: {
                  paddingBlock: 0,
                  paddingInline: 0,
                },
                // },
              }}
            ></ProTable>
            // <ProDescriptions<API.DownloadInfo>
            //   column={2}
            //   title={props.data.file_name}
            // >

            // </ProDescriptions>
          )}
          {tabSelected === 'detail' && (
            // <ProDescriptions<API.DownloadInfo>
            //   column={1}
            //   title={props.data.file_name}
            // >
            <StateLine></StateLine>
            // <Button> this is detail page</Button>
            // </ProDescriptions>
          )}
        </PageContainer>
      )}
    </Drawer>
  );
};

export default DownloadStateDrawer;
