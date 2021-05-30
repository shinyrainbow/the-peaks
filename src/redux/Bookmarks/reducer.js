const INITIAL_STATE = {
  bookmarks: []
}

const bookMarkReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'ADD_BOOKMARK':
      return {
        ...state,
        bookmarks: [...state.bookmarks, action.payload]
      }

    case 'REMOVE_BOOKMARK':
      return {
        ...state,
        bookmarks: state.bookmarks.filter(item => item.id !== action.payload.id),
      }

    default: return state
  }
}
export default bookMarkReducer