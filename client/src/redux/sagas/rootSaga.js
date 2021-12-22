import { takeLatest } from "redux-saga/effects";
import { getDredge } from "../ducks/dredgeSlice";
import { handleGetDredge } from "./handlers/dredge";

export function* watcherSaga() {
  yield takeLatest(getDredge.type, handleGetDredge);
}
