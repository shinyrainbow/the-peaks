const INITIAL_STATE = {
  isSearchLoading: false,
  query: '',
  page: 1,
  hasMore: false,
  results: [],
}

const searchResultReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'NEW_SEARCH_START':
      return {
        ...state,
        isSearchLoading: true,
      }

    case 'NEW_SEARCH_SUCCESS':
      return {
        ...state,
        isSearchLoading: false,
        query: action.payload.query,
        page: action.payload.page,
        hasMore: action.payload.hasMore,
        results: [...state.results, ...action.payload.results]
      }

    case 'CLEAR_SEARCH_RESULT':
      return {
        ...state,
        query: '',
        results: [],
        hasMore: false
      }
    default: return state;
  }
}

export default searchResultReducer
