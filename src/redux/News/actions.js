export const fetchNewsStart = (orderBy) => ({
  type: 'FETCH_NEWS_START',
  payload: orderBy
});


export const fetchNewsSuccess = (data) => ({
  type: 'FETCH_NEWS_SUCCESS',
  payload: data
})

export const fetchArticleStart = (id) => ({
  type: 'FETCH_ARTICLE_START',
  payload: id
})

export const fetchArticleSuccess = (data) => ({
  type: 'FETCH_ARTICLE_SUCCESS',
  payload: data
})

export const fetchArticleFail = () => ({
  type: 'FETCH_ARTICLE_FAIL',
})
