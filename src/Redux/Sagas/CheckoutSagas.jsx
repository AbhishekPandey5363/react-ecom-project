import { put, takeEvery } from "redux-saga/effects";
import { CREATE_CHECKOUT, CREATE_CHECKOUT_RED, GET_CHECKOUT_RED, UPDATE_CHECKOUT_RED, DELETE_CHECKOUT_RED, GET_CHECKOUT, UPDATE_CHECKOUT, DELETE_CHECKOUT } from "../Constants"
import { createRecord, deleteRecord, getRecord, updateRecord } from "./Service/ApiCallingService"
// import { createMultiPartRecord, deleteRecord, getRecord, updateRecord, updateMultiPartRecord } from "./Service/ApiCallingService"

function* createSaga(action) {      // worker saga or executer saga
    let response = yield createRecord("checkout", action.payload)
    // let response = yield createMultiPartRecord("checkout", action.payload)
    yield put({ type: CREATE_CHECKOUT_RED, payload: response })
}

function* getSaga(action) {      // worker saga or executer saga
    let response = yield getRecord("checkout")
    yield put({ type: GET_CHECKOUT_RED, payload: response })
}

function* updateSaga(action) {      // worker saga or executer saga
    yield updateRecord("checkout", action.payload)
    // yield updateMultiPartRecord("checkout", action.payload)
    yield put({ type: UPDATE_CHECKOUT_RED, payload: action.payload })
}

function* deleteSaga(action) {      // worker saga or executer saga
    yield deleteRecord("checkout", action.payload)
    yield put({ type: DELETE_CHECKOUT_RED, payload: action.payload })
}

export default function* checkoutSagas() {
    yield takeEvery(CREATE_CHECKOUT, createSaga)   //watcher saga
    yield takeEvery(GET_CHECKOUT, getSaga)   //watcher saga
    yield takeEvery(UPDATE_CHECKOUT, updateSaga)   //watcher saga
    yield takeEvery(DELETE_CHECKOUT, deleteSaga)   //watcher saga

}