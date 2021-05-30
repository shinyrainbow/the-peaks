import { createStore, applyMiddleware } from 'redux'
import createSagaMiddle from 'redux-saga'
import { persistStore } from 'redux-persist'
import rootSaga from './rootSaga'
import rootReducer from './rootReducer'

const sagaMiddleware = createSagaMiddle()
export const middlewares = [sagaMiddleware]
export const store = createStore(rootReducer, applyMiddleware(...middlewares))
sagaMiddleware.run(rootSaga)

export const persistor = persistStore(store)
export default { store, persistor }