import { all, call } from 'redux-saga/effects'
import newsSagas from './News/sagas'
import searchResultSagas from './SearchResult/sagas'

export default function* rootSaga() {
  yield all([
    call(newsSagas),
    call(searchResultSagas)
  ])
}
