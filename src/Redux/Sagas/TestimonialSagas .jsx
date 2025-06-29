import { put, takeEvery } from "redux-saga/effects";
import { CREATE_TESTIMONIAL, CREATE_TESTIMONIAL_RED, GET_TESTIMONIAL_RED, UPDATE_TESTIMONIAL_RED, DELETE_TESTIMONIAL_RED, GET_TESTIMONIAL, UPDATE_TESTIMONIAL, DELETE_TESTIMONIAL } from "../Constants"
import { createRecord, deleteRecord, getRecord, updateRecord } from "./Service/ApiCallingService"
// import { createMultiPartRecord, deleteRecord, getRecord, updateRecord, updateMultiPartRecord } from "./Service/ApiCallingService"

function* createSaga(action) {      // worker saga or executer saga
    let response = yield createRecord("testimonial", action.payload)
    // let response = yield createMultiPartRecord("testimonial", action.payload)
    yield put({ type: CREATE_TESTIMONIAL_RED, payload: response })
}

function* getSaga(action) {      // worker saga or executer saga
    let response = yield getRecord("testimonial")
    yield put({ type: GET_TESTIMONIAL_RED, payload: response })
}

function* updateSaga(action) {      // worker saga or executer saga
    yield updateRecord("testimonial", action.payload)
    // yield updateMultiPartRecord("testimonial", action.payload)
    yield put({ type: UPDATE_TESTIMONIAL_RED, payload: action.payload })
}

function* deleteSaga(action) {      // worker saga or executer saga
    yield deleteRecord("testimonial", action.payload)
    yield put({ type: DELETE_TESTIMONIAL_RED, payload: action.payload })
}

export default function* testimonialSagas() {
    yield takeEvery(CREATE_TESTIMONIAL, createSaga)   //watcher saga
    yield takeEvery(GET_TESTIMONIAL, getSaga)   //watcher saga
    yield takeEvery(UPDATE_TESTIMONIAL, updateSaga)   //watcher saga
    yield takeEvery(DELETE_TESTIMONIAL, deleteSaga)   //watcher saga

}