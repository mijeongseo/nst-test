import { all, fork, put, takeLatest, call } from 'redux-saga/effects';
import axios from 'axios';

import { backUrl } from '../../config/config';

axios.defaults.withCredentials = true;
axios.defaults.baseURL = backUrl;

function loadUserAPI() {
    return axios.get(`/user`);
}

function* loadUser() {
    try {
        const result = yield call(loadUserAPI);
        console.log(result.data);
        yield put({
            type: 'LOAD_USER_SUCCESS',
            data: result.data,
        });
    } catch (err) {
        console.error(err);
        yield put({
            type: 'LOAD_USER_FAILURE',
            error: err.response.data,
        });
    }
}

function* watchLoadUser() {
    yield takeLatest('LOAD_USER_REQUEST', loadUser);
}
//-----------------------------------------------------------------
function signUpAPI(data) {
    return axios.post(`/user`, data);
}

function* signUp(action) {
    try {
        const result = yield call(signUpAPI, action.data);
        console.log(result.data);
        yield put({
            type: 'SIGN_UP_SUCCESS',
        });
    } catch (err) {
        console.error(err);
        yield put({
            type: 'SIGN_UP_FAILURE',
            error: err.response.data,
        });
    }
}

function* watchSignUp() {
    yield takeLatest('SIGN_UP_REQUEST', signUp);
}

//-----------------------------------------------------------------
function logInAPI(data) {
    return axios.post(`/user/login`, data);
}

function* logIn(action) {
    try {
        const result = yield call(logInAPI, action.data);
        console.log(result.data);
        yield put({
            type: 'LOG_IN_SUCCESS',
            data: result.data,
        });
    } catch (err) {
        console.error(err);
        yield put({
            type: 'LOG_IN_FAILURE',
            error: err.response.data,
        });
    }
}

function* watchLogIn() {
    yield takeLatest('LOG_IN_REQUEST', logIn);
}
//-----------------------------------------------------------------
function loadPostsAPI() {
    return axios.get(`/posts`);
}

function* loadPosts() {
    try {
        const result = yield call(loadPostsAPI);
        console.log(result.data);
        yield put({
            type: 'LOAD_POSTS_SUCCESS',
            data: result.data,
        });
    } catch (err) {
        console.error(err);
        yield put({
            type: 'LOAD_POSTS_FAILURE',
            error: err.response.data,
        });
    }
}

function* watchLoadPosts() {
    yield takeLatest('LOAD_POSTS_REQUEST', loadPosts);
}
//-----------------------------------------------------------------
function logOutAPI() {
    return axios.post('/user/logout');
}

function* logOut() {
    try {
        const result = yield call(logOutAPI);
        console.log(result.data);
        yield put({
            type: 'LOG_OUT_SUCCESS',
        });
    } catch (err) {
        console.error(err);
        yield put({
            type: 'LOG_OUT_FAILURE',
            error: err.response.data,
        });
    }
}

function* watchLogOut() {
    yield takeLatest('LOG_OUT_REQUEST', logOut);
}
//-----------------------------------------------------------------
function uploadImgAPI(data) {
    return axios.post('/post/images', data);
}

function* uploadImg(action) {
    try {
        const result = yield call(uploadImgAPI, action.data);
        yield put({
            type: 'UPLOAD_IMAGES_SUCCESS',
            data: result.data,
        });
    } catch (err) {
        console.error(err);
        yield put({
            type: 'UPLOAD_IMAGES_FAILURE',
            error: err.response.data,
        });
    }
}

function* watchUploadImg() {
    yield takeLatest('UPLOAD_IMAGES_REQUEST', uploadImg);
}

//-----------------------------------------------------------------
function addPostAPI(data) {
    return axios.post(`/post`, data);
}

function* addPost(action) {
    try {
        const result = yield call(addPostAPI, action.data);
        yield put({
            type: 'ADD_POST_SUCCESS',
            data: result.data,
        });
    } catch (err) {
        console.error(err);
        yield put({
            type: 'ADD_POST_FAILURE',
            error: err.response.data,
        });
    }
}

function* watchAddPost() {
    yield takeLatest('ADD_POST_REQUEST', addPost);
}
//-----------------------------------------------------------------
export function* rootSaga() {
    yield all([
        fork(watchLoadUser),
        fork(watchSignUp),
        fork(watchLogIn),
        fork(watchLogOut),
        fork(watchLoadPosts),
        fork(watchUploadImg),
        fork(watchAddPost),
    ]);
}
