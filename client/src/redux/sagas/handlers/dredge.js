import { call, put } from "redux-saga/effects";
import { setDredge } from "../../ducks/dredgeSlice";
import {
  requestGetDredgeData,
  requestGetDredgeExtra,
} from "../requests/dredge";

export function* handleGetDredge(action) {
  try {
    const { payload } = action;
    const { name, limit } = payload;
    const response = yield call(requestGetDredgeData, name, limit);
    const { data } = response;
    const responseExtra = yield call(requestGetDredgeExtra, name, limit);
    const { data: extra_data } = responseExtra;
    yield put(setDredge({ data: data.data, extra_data: extra_data.data }));
  } catch (error) {
    console.log(error);
  }
}
