import { PageContainer, ProDescriptions } from '@ant-design/pro-components';
import { Drawer } from 'antd';
import React from 'react';

interface DrawerProps {
  data: any;
  title: React.ReactNode | undefined;
  width: number;
  open: boolean;
  onClose: () => void;
  closable: boolean;
  tabList: any[];
}

const StateInfoDrawer: React.FC<DrawerProps> = (props: DrawerProps) => {
  // const [selectedRowsState, setSelectedRows] = useState<API.DownloadInfo[]>([]);
  return (
    <Drawer
      width={props.width}
      open={props.open}
      onClose={props.onClose}
      closable={true}
    >
      {props.open && (
        <PageContainer
          tabList={props.tabList}
          title={props.open ? props.title : ''}
        >
          <ProDescriptions<API.DownloadInfo>
            column={2}
            title={props.title}
            request={async () => ({
              data: props.data,
            })}
          />
        </PageContainer>
      )}
    </Drawer>
  );
};

export default StateInfoDrawer;
