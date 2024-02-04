import { queryDownloadList } from '@/services/DownloadController';
import { request } from '@umijs/max';

export async function requestDownloadList(
  params: any & {
    pageSize?: number;
    current?: number;
    keyword?: string;
  },
  // sort: Record<string, SortOrder>,
  // filter: Record<string, (string | number)[] | null>,
) {
  // const { querySuccess, setQuerySuccess } = useState<boolean>(false);
  const { data, success } = await queryDownloadList({
    ...params,
    // FIXME: remove @ts-ignore
    // @ts-ignore
    // sorter,
    // filter,
  });
  return {
    data: data?.list || [],
    success,
    total: data?.total || 0,
  };
}

export async function requestDownloadStart(id: string) {
  return request(`/api/v0/download/${id}/start`, {
    method: 'POST',
  });
}

export async function requestDownloadStop(id: string) {
  return request(`/api/v0/download/${id}/stop`, {
    method: 'POST',
  });
}
