import Guide from '@/components/Guide';
import { trim } from '@/utils/format';
import { SettingFilled } from '@ant-design/icons';
import { PageContainer, PageHeader } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import React from 'react';
import styles from './index.less';

const HomePage: React.FC = () => {
  const { name } = useModel('global');
  return (
    <PageContainer
      ghost
      title={
        <a href={'/setting'}>
          <SettingFilled />
        </a>
      }
    >
      <PageHeader>
        <span>Header</span>
      </PageHeader>
      <div className={styles.container}>
        <Guide name={trim(name)} />
      </div>
      {/*<SettingFilled/>*/}
    </PageContainer>
  );
};

export default HomePage;
