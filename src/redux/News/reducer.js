const INITIAL_STATE = {
  isNewsLoading: false,
  data: {
    news: [],
    sport: [],
    culture: [],
    lifeandstyle: [],
  },
  article: {},
  isArticleLoading: false,
  fetchArticleFail: false,
}

const newsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'FETCH_NEWS_START':
      return {
        ...state,
        isNewsLoading: true
      }

    case 'FETCH_NEWS_SUCCESS':
      return {
        ...state,
        data: action.payload,
        isNewsLoading: false,
      }

    case 'FETCH_ARTICLE_START':
      return {
        ...state,
        isArticleLoading: true
      }

    case 'FETCH_ARTICLE_SUCCESS':
      return {
        ...state,
        article: action.payload,
        isArticleLoading: false,
      }

    case 'FETCH_ARTICLE_FAIL':
      return {
        ...state,
        fetchArticleFail: true,
        isArticleLoading: false,
      }
    default: return state;
  }
};
export default newsReducer