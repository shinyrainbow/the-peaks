const INITIAL_STATE = {
  orderBy: 'newest'
}

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'NEWEST':
      return {
        ...state,
        orderBy: 'newest'
      };
    case 'OLDEST':
      return {
        ...state,
        orderBy: 'oldest'
      };

    default: return state;
  }
};
export default reducer;