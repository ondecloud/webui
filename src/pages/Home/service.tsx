import { queryDownloadList } from '@/services/DownloadController';

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
