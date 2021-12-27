import axiosConfig from "../../../axiosConfig";

export function requestGetDredgeData(name, datetime) {
  if (!datetime) {
    const curD = new Date();
    const d = new Date(curD.getTime() - 30 * 60000);
    datetime = d.toISOString().slice(0, 19).replace("T", " ");
  }
  return axiosConfig.request({
    method: "get",
    url: `/dredge?name=${name}&datetime=${datetime}`,
  });
}

export function requestGetDredgeDataLatest(name) {
  return axiosConfig.request({
    method: "get",
    url: `/dredge/latest?name=${name}`,
  });
}

export function requestGetDredgeExtra(name, datetime) {
  if (!datetime) {
    const curD = new Date();
    const d = new Date(curD.getTime() - 30 * 60000);
    datetime = d.toISOString().slice(0, 19).replace("T", " ");
  }
  return axiosConfig.request({
    method: "get",
    url: `/dredge/extra?name=${name}&datetime=${datetime}`,
  });
}

export function requestGetDredgeExtraLatest(name) {
  return axiosConfig.request({
    method: "get",
    url: `/dredge/extra/latest?name=${name}`,
  });
}

export function requestGetDredgeNonEff(name) {
  return axiosConfig.request({
    method: "get",
    url: `/dredge/non_eff?name=${name}`,
  });
}
