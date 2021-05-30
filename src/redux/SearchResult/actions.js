export const newSearchStart = (payload) => ({
  type: 'NEW_SEARCH_START',
  payload
})

export const newSearchSuccess = (data) => ({
  type: 'NEW_SEARCH_SUCCESS',
  payload: data
})

export const clearSearchResult = () => ({
  type: 'CLEAR_SEARCH_RESULT'
})
