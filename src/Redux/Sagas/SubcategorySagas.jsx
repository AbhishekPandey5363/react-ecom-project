import { put, takeEvery } from "redux-saga/effects";
import { CREATE_SUBCATEGORY, CREATE_SUBCATEGORY_RED, GET_SUBCATEGORY_RED, UPDATE_SUBCATEGORY_RED, DELETE_SUBCATEGORY_RED, GET_SUBCATEGORY, UPDATE_SUBCATEGORY, DELETE_SUBCATEGORY } from "../Constants"
import { createRecord, deleteRecord, getRecord, updateRecord } from "./Service/ApiCallingService"
// import { createMultiPartRecord, deleteRecord, getRecord, updateRecord, updateMultiPartRecord } from "./Service/ApiCallingService"

function* createSaga(action) {      // worker saga or executer saga
    let response = yield createRecord("subcategory", action.payload)
    // let response = yield createMultiPartRecord("subcategory", action.payload)
    yield put({ type: CREATE_SUBCATEGORY_RED, payload: response })
}

function* getSaga(action) {      // worker saga or executer saga
    let response = yield getRecord("subcategory")
    
    yield put({ type: GET_SUBCATEGORY_RED, payload: response })
}

function* updateSaga(action) {      // worker saga or executer saga
    yield updateRecord("subcategory", action.payload)
    // yield updateMultiPartRecord("subcategory", action.payload)
    yield put({ type: UPDATE_SUBCATEGORY_RED, payload: action.payload })
}

function* deleteSaga(action) {      // worker saga or executer saga
    yield deleteRecord("subcategory", action.payload)
    yield put({ type: DELETE_SUBCATEGORY_RED, payload: action.payload })
}

export default function* SubcategorySagas() {
    yield takeEvery(CREATE_SUBCATEGORY, createSaga)   //watcher saga
    yield takeEvery(GET_SUBCATEGORY, getSaga)   //watcher saga
    yield takeEvery(UPDATE_SUBCATEGORY, updateSaga)   //watcher saga
    yield takeEvery(DELETE_SUBCATEGORY, deleteSaga)   //watcher saga

}