import {Layout, Row, Space, Typography} from 'antd';
import React from 'react';
import styles from './Guide.less';
import {HomeOutlined, LoadingOutlined, SettingFilled, SmileOutlined, SyncOutlined} from "@ant-design/icons";

interface Props {
    name: string;
}

// 脚手架示例组件
const Guide: React.FC<Props> = (props) => {
    const {name} = props;
    return (
        <Layout>
          <Row>
            <Typography.Title level={3} className={styles.title}>
              欢迎使用 <strong>{name}</strong> ！
            </Typography.Title>
          </Row>
        </Layout>
        // <Space>
        //     <HomeOutlined/>
        //     <SettingFilled/>
        //     <SmileOutlined/>
        //     <SyncOutlined spin/>
        //     <SmileOutlined rotate={180}/>
        //     <LoadingOutlined/>
        // </Space>
    );
};

export default Guide;
