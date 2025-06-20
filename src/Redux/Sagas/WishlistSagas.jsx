import { put, takeEvery } from "redux-saga/effects";
import { CREATE_WISHLIST, CREATE_WISHLIST_RED, GET_WISHLIST_RED, UPDATE_WISHLIST_RED, DELETE_WISHLIST_RED, GET_WISHLIST, UPDATE_WISHLIST, DELETE_WISHLIST } from "../Constants"
import { createRecord, deleteRecord, getRecord, updateRecord } from "./Service/ApiCallingService"
// import { createMultiPartRecord, deleteRecord, getRecord, updateRecord, updateMultiPartRecord } from "./Service/ApiCallingService"

function* createSaga(action) {      // worker saga or executer saga
    let response = yield createRecord("wishlist", action.payload)
    // let response = yield createMultiPartRecord("wishlist", action.payload)
    yield put({ type: CREATE_WISHLIST_RED, payload: response })
}

function* getSaga(action) {      // worker saga or executer saga
    let response = yield getRecord("wishlist")
    yield put({ type: GET_WISHLIST_RED, payload: response })
}

function* updateSaga(action) {      // worker saga or executer saga
    yield updateRecord("wishlist", action.payload)
    // yield updateMultiPartRecord("wishlist", action.payload)
    yield put({ type: UPDATE_WISHLIST_RED, payload: action.payload })
}

function* deleteSaga(action) {      // worker saga or executer saga
    yield deleteRecord("wishlist", action.payload)
    yield put({ type: DELETE_WISHLIST_RED, payload: action.payload })
}

export default function* wishlistSagas() {
    yield takeEvery(CREATE_WISHLIST, createSaga)   //watcher saga
    yield takeEvery(GET_WISHLIST, getSaga)   //watcher saga
    yield takeEvery(UPDATE_WISHLIST, updateSaga)   //watcher saga
    yield takeEvery(DELETE_WISHLIST, deleteSaga)   //watcher saga

}