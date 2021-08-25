import axios from 'axios';

export const singUpAsync = (userid, password) => async (dispatch, getState) => {
    console.log(getState());
    dispatch({ type: 'SIGN_UP_REQUEST' });
    try {
        await axios.post('/user', { userid, password });
        dispatch({ type: 'SIGN_UP_SUCCESS' });
    } catch (err) {
        dispatch({ type: 'SIGN_UP_FAILURE', error: err });
    }
};

export const logInAsync = (userid, password) => async (dispatch, getState) => {
    console.log(getState());
    dispatch({ type: 'LOG_IN_REQUEST' });
    try {
        const response = await axios.post('/user/login', { userid, password });

        dispatch({ type: 'LOG_IN_SUCCESS', data: response.data });
    } catch (err) {
        dispatch({ type: 'LOG_IN_FAILURE', error: err });
    }
};

const fetchPosts = async (dispatch) => {
    dispatch({ type: 'LOAD_POSTS_REQUEST' });
    try {
        const response = await axios.get('/posts');
        dispatch({ type: 'LOAD_POSTS_SUCCESS', data: response.data });
    } catch (err) {
        dispatch({ type: 'LOAD_POSTS_FAILURE', error: err });
    }
};

export const loadUserAsync = () => async (dispatch) => {
    dispatch({ type: 'LOAD_USER_REQUEST' });
    try {
        const response = await axios.get('/user');

        dispatch({ type: 'LOAD_USER_SUCCESS', data: response.data });
        if (response.data) fetchPosts(dispatch);
    } catch (err) {
        dispatch({ type: 'LOAD_USER_FAILURE', error: err });
    }
};

export const logOutAsync = () => async (dispatch) => {
    dispatch({ type: 'LOG_OUT_REQUEST' });
    try {
        await axios.post('/user/logout');
        dispatch({ type: 'LOG_OUT_SUCCESS' });
    } catch (err) {
        dispatch({ type: 'LOG_OUT_FAILURE', error: err });
    }
};

export const uploadImgAsync = (imageFormData) => async (dispatch) => {
    dispatch({ type: 'UPLOAD_IMAGES_REQUEST' });
    try {
        const response = await axios.post('/post/images', imageFormData);
        dispatch({ type: 'UPLOAD_IMAGES_SUCCESS', data: response.data });
    } catch (err) {
        dispatch({ type: 'UPLOAD_IMAGES_FAILURE', error: err });
    }
};
