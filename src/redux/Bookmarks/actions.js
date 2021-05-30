export const addBookmark = (item) => ({
  type: 'ADD_BOOKMARK',
  payload: item
})

export const removeBookmark = (item) => ({
  type: 'REMOVE_BOOKMARK',
  payload: item
})
