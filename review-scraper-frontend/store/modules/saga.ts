import { all, takeLatest, call, put } from 'redux-saga/effects';
import { ServerResponse } from 'http';
import axios from 'axios';

export const createUrl = (originalUrl: string) =>
  axios.post('/api/url', { originalUrl });

export function createRequestSaga(type: string, request: any) {
  const SUCCESS = `${type}_SUCCESS`;
  const FAILURE = `${type}_FAILURE`;

  return function* (action: any) {
    // yield put(startLoading(type));
    try {
      const response: ServerResponse = yield call(request, action.payload);
      yield put({
        type: SUCCESS,
        payload: response, // payload: response.data,
        meta: response,
      });
    } catch (e) {
      yield put({
        type: FAILURE,
        payload: e,
        error: true,
      });
    }
    // yield put(finishLoading(type));
  };
}

const CREATE_URL = 'CREATE_URL';

const createUrlSaga = createRequestSaga(CREATE_URL, createUrl);

export function* urlSaga() {
  yield takeLatest(CREATE_URL, createUrlSaga);
}

export function* rootSaga() {
  yield all([urlSaga()]);
}
