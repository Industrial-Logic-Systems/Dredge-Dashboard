import axiosConfig from "../../../axiosConfig";

export function requestGetDredgeData(name, minutes = 30) {
  const curD = new Date();
  const d = new Date(curD.getTime() - minutes * 60000);
  const datetime = d.toISOString();

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

export function requestGetDredgeExtra(name, minutes = 30) {
  const curD = new Date();
  const d = new Date(curD.getTime() - minutes * 60000);
  const datetime = d.toISOString();

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
