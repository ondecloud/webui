/* eslint-disable */
// 该文件由 OneAPI 自动生成，请勿手动修改！

declare namespace API {
  interface TreeNode {
    id: number;
    parent_id: number;
    label: string;
    is_selected: boolean;
    file_size: number;
    progress: number;
  }

  interface DownloadInfo {
    id: string;
    state: number;
    max_speed: number;
    average_speed: number;
    start_time: string;
    file_name: string;
    is_tree: boolean;
    tree_list: TreeNode[];
    url: string;
    total: number;
    selected: number;
    file_size: number;
    progress: number;
  }

  interface PageInfo {
    /**
         1 */
    current?: number;
    pageSize?: number;
    total?: number;
    list?: Array<Record<string, any>>;
  }

  interface PageInfo_DownloadInfo_ {
    current?: number;
    pageSize?: number;
    total?: number;
    list?: Array<DownloadInfo>;
  }

  interface Result {
    success?: boolean;
    errorMessage?: string;
    data?: Record<string, any>;
  }

  interface Result_PageInfo_DownloadInfo__ {
    success?: boolean;
    errorMessage?: string;
    data?: PageInfo_DownloadInfo_;
  }

  interface Result_UserInfo_ {
    success?: boolean;
    errorMessage?: string;
    data?: UserInfo;
  }

  interface Result_string_ {
    success?: boolean;
    errorMessage?: string;
    data?: string;
  }

  // type UserGenderEnum = 'MALE' | 'FEMALE';

  interface UserInfo {
    id?: string;
    name?: string;
    /** nick */
    nickName?: string;
    /** email */
    email?: string;
    gender?: UserGenderEnum;
  }

  interface Arg {
    Name: string;
    Value: string;
  }

  interface ResourceInfoV0 {
    FileName: string;
    Referer: string;
    Type: string;
    URL: string;
    Path: string;
    Args: { [key: string]: Arg[] };
  }

  interface ResourceInfoV0Result {
    FileName: string;
    Referer: string;
    Type: string;
    URL: string;
    Path: string;
    Args: { [key: string]: Arg[] };
  }

  interface UserInfoVO {
    name?: string;
    /** nick */
    nickName?: string;
    /** email */
    email?: string;
  }

  // type definitions_0 = null;
}
