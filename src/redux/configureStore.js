import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storageSession from 'redux-persist/lib/storage/session';
import { rootReducer } from './reducers';
import { encryptTransform } from 'redux-persist-transform-encrypt';
import thunk from 'redux-thunk';
import { encryptionKey } from '../utils/utils';

const encryptor = encryptTransform({
	secretKey: encryptionKey,
	onError(error) {
		// Handle the error.
	}
});

const persistConfig = {
	key: 'root',
	transforms: [encryptor],
	storage: storageSession
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const composeEnhancers =
	(typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const store = createStore(persistedReducer, composeEnhancers(applyMiddleware(thunk)));
const persistor = persistStore(store);

export { persistor, store };
