/* eslint-disable */
// 该文件由 OneAPI 自动生成，请勿手动修改！
import { VersionURL } from '@/services/version';

import { request } from '@umijs/max';

/** 此处后端没有提供注释 GET /api/v0/downloads */
export async function queryDownloadList(
  params: {
    /** order */
    order?: string;
    /** current */
    current?: number;
    /** pageSize */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.Result_PageInfo_DownloadInfo__>(VersionURL('downloads'), {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** POST /api/v0/download */
export async function addDownload(
  body?: API.ResourceInfoV0,
  options?: { [key: string]: any },
) {
  return request<API.Result_UserInfo_>(VersionURL('download'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** GET /api/v0/download/${param0} */
export async function getUserDetail(
  params: {
    /** id */
    id?: string;
  },
  options?: { [key: string]: any },
) {
  const { id: param0 } = params;
  return request<API.Result_UserInfo_>(VersionURL(`download/${param0}`), {
    method: 'GET',
    params: { ...params },
    ...(options || {}),
  });
}

/** PUT /api/v0/download/${param0} */
export async function modifyUser(
  params: {
    // path
    /** userId */
    userId?: string;
  },
  body?: API.UserInfoVO,
  options?: { [key: string]: any },
) {
  const { userId: param0 } = params;
  return request<API.Result_UserInfo_>(VersionURL(`download/${param0}`), {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...params },
    data: body,
    ...(options || {}),
  });
}

/** DELETE /api/v0/download/${param0} */
export async function deleteDownload(
  params: { id: string },
  options?: { [p: string]: any },
) {
  const { id: param0 } = params;
  return request<API.Result_string_>(VersionURL(`download/${param0}`), {
    method: 'DELETE',
    params: { ...params },
    ...(options || {}),
  });
}
