import { all, call, takeLatest, put } from 'redux-saga/effects'
import axios from "axios"
import { newSearchSuccess } from './actions'

const apiKey = '27c6c13f-4fe0-4f77-bb2d-ec5c723462e9'

export function* newSearchResultStart({ payload }) {
  try {
    const { query, page, orderBy } = payload
    const url = `https://content.guardianapis.com/search?page=${page}&q=${query}&order-by=${orderBy}&page-size=15&api-key=${apiKey}`
    const result = yield call(axios.get, url)
    const {currentPage, pages, results} = result.data.response
    const data = {
      query,
      page,
      hasMore: currentPage < pages,
      results
    }
    yield put(
      newSearchSuccess(data)
    )
  } catch (err) {
    console.log(err)
  }
}

export function* onNewSearchStart() {
  yield takeLatest('NEW_SEARCH_START', newSearchResultStart);
}

export default function* searchResultSagas() {
  yield all([
    call(onNewSearchStart)
  ])
}
