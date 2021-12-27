import { call, put } from "redux-saga/effects";
import { setDredge } from "../../ducks/dredgeSlice";
import {
  requestGetDredgeData,
  requestGetDredgeDataLatest,
  requestGetDredgeExtra,
  requestGetDredgeExtraLatest,
  requestGetDredgeNonEff,
} from "../requests/dredge";

export function* handleGetDredge(action) {
  try {
    const { payload } = action;
    const { name, datetime } = payload;
    const response = yield call(requestGetDredgeData, name, datetime);
    var { data } = response;
    const responseExtra = yield call(requestGetDredgeExtra, name, datetime);
    var { data: extra_data } = responseExtra;
    const responseNonEff = yield call(requestGetDredgeNonEff, name);
    var { data: non_eff } = responseNonEff;

    if (data.data.length === 0) {
      const response = yield call(requestGetDredgeDataLatest, name);
      data = response.data;
    }
    if (extra_data.data.length === 0) {
      const responseExtra = yield call(requestGetDredgeExtraLatest, name);
      extra_data = responseExtra.data;
    }

    yield put(
      setDredge({
        data: data.data,
        extra_data: extra_data.data,
        non_eff: non_eff.data,
      })
    );
  } catch (error) {
    console.log(error);
  }
}
