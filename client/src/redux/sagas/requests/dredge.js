import axiosConfig from "../../../axiosConfig";

export function requestGetDredgeData(name, limit) {
  if (!limit) {
    limit = 50;
  }
  return axiosConfig.request({
    method: "get",
    url: `/dredge?name=${name}&&limit=${limit}`,
  });
}

export function requestGetDredgeExtra(name, limit) {
  if (!limit) {
    limit = 50;
  }
  return axiosConfig.request({
    method: "get",
    url: `/dredge_extra?name=${name}&&limit=${limit}`,
  });
}
