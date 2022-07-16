import {applyMiddleware , createStore } from 'redux'
import thunkMiddleware from 'redux-thunk'
import rootReducer from '../redux/reducer/rootReducer'
import {composeWithDevTools} from 'redux-devtools-extension'

export default function configureStore(preLoadedState){
    const middleWares = [thunkMiddleware]
    const middlewareEnhancer = applyMiddleware(...middleWares)
    const enhancers = middlewareEnhancer

    const composedEnhancers = composeWithDevTools(enhancers)

    const store = createStore(rootReducer , preLoadedState , composedEnhancers);

    return store;
}