import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

// reducers
import bookmarkReducer from './Bookmarks/reducer'
import orderByReducer from './OrderBy/reducer'
import newsReducer from './News/reducer'
import searchResultReducer from './SearchResult/reducer'

const rootReducer = combineReducers({
  news: newsReducer,
  bookmarks: bookmarkReducer,
  orderBy: orderByReducer,
  searchResult: searchResultReducer
});

const configStorage = {
  key: 'root',
  storage,
  whitelist: ['bookmarks']
}

export default persistReducer(configStorage, rootReducer)
