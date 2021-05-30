

import { all, call, takeLatest, put } from 'redux-saga/effects'
import { fetchNewsSuccess, fetchArticleSuccess, fetchArticleFail } from './actions'
import axios from "axios";

const apiKey = '27c6c13f-4fe0-4f77-bb2d-ec5c723462e9'

export function* fetchNews({ payload }) {
  try {
    const endpoints = {
      news: `https://content.guardianapis.com/news?show-blocks=all&order-by=${payload}&api-key=${apiKey}`,
      sport: `https://content.guardianapis.com/sport?show-blocks=all&order-by=${payload}&api-key=${apiKey}`,
      culture: `https://content.guardianapis.com/culture?show-blocks=all&order-by=${payload}&api-key=${apiKey}`,
      lifeandstyle: `https://content.guardianapis.com/lifeandstyle?show-blocks=all&order-by=${payload}&api-key=${apiKey}`,
    }
    const { news, sport, culture, lifeandstyle } = yield all({
      news: call(axios.get, endpoints.news),
      sport: call(axios.get, endpoints.sport),
      culture: call(axios.get, endpoints.culture),
      lifeandstyle: call(axios.get, endpoints.lifeandstyle)
    });

    const data = {
      news: news.data.response.results,
      sport: sport.data.response.results,
      culture: culture.data.response.results,
      lifeandstyle: lifeandstyle.data.response.results,
    }

    yield put(
      fetchNewsSuccess(data)
    )

  } catch (err) {
    console.log(err, 'CANNOT FETCH NEWS')
  }
}


export function* onFetchNewsStart() {
  yield takeLatest('FETCH_NEWS_START', fetchNews)
}

export function* fetchArticle({ payload }) {
  try {
    const endpoint = `https://content.guardianapis.com/${payload}?show-elements=all&show-blocks=all&api-key=${apiKey}`
    const res = yield call(axios.get, endpoint)
    const article = res.data.response.content
    yield put(
      fetchArticleSuccess(article)
    )
  } catch (err) {
    console.log(err, 'CANNOT FIND THIS NEWS ARTICLE')
    yield put(
      fetchArticleFail()
    )
  }
}

export function* onFetchArticleStart() {
  yield takeLatest('FETCH_ARTICLE_START', fetchArticle);
}

export default function* newsSagas() {
  yield all([
    call(onFetchNewsStart),
    call(onFetchArticleStart)
  ])
}
