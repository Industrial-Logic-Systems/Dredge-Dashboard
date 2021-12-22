import { configureStore, combineReducers } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { watcherSaga } from "./sagas/rootSaga";
import dredgeReducer from "./ducks/dredgeSlice";

const sagaMiddleware = createSagaMiddleware();

const reducer = combineReducers({
  dredge: dredgeReducer
});

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(watcherSaga);

export default store;
