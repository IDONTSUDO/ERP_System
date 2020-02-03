import {createStore, combineReducers, applyMiddleware, compose} from "redux";
import {appReducer} from "./Reducers/appReducer";

import {combineEpics, createEpicMiddleware} from "redux-observable";
import {fetchBeersEpic} from "./Epics/fetchBeers";
import {beersReducers} from "./Reducers/beersReducers";

export function configureStore() {

    const rootEpic = combineEpics(fetchBeersEpic);

    const epicMiddleware = createEpicMiddleware();

    const rootReducer = combineReducers({
        app: appReducer,
        beers: beersReducers
    });

    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    const store = createStore(rootReducer, composeEnhancers(
        applyMiddleware(epicMiddleware)
    ));

    epicMiddleware.run(rootEpic);

    return store;
}