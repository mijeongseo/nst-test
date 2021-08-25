import React, { createContext, useReducer, useContext } from 'react';
import produce from 'immer';

import PropTypes from 'prop-types';

const initialState = {
    signUpLoading: false,
    signUpDone: false,
    signUpError: null,
    logInLoading: false,
    logInDone: false,
    logInError: null,
    logOutLoading: false,
    logOutDone: false,
    logOutError: null,
    loadUserLoading: false,
    loadUserDone: false,
    loadUserError: null,
    me: null,
    signUpData: {},
    loginData: {},
    imagePaths: [],
    mainPosts: [],
    uploadImagesLoading: false,
    uploadImagesDone: false,
    uploadImagesError: null,
    addPostLoading: false,
    addPostDone: false,
    addPostError: null,
    loadPostsLoading: false,
    loadPostsDone: false,
    loadPostsError: null,
};

const StateContext = createContext(initialState);
const DispatchContext = createContext(() => null);

const reducer = (state, action) =>
    produce(state, (draft) => {
        switch (action.type) {
            case 'SIGN_UP_REQUEST':
                draft.signUpLoading = true;
                draft.signUpError = null;
                draft.signUpDone = false;
                break;
            case 'SIGN_UP_SUCCESS':
                draft.signUpLoading = false;
                draft.signUpDone = true;
                break;
            case 'SIGN_UP_FAILURE':
                draft.signUpLoading = false;
                draft.signUpError = action.error;
                break;
            case 'LOG_IN_REQUEST':
                draft.logInLoading = true;
                draft.logInError = null;
                draft.logInDone = false;
                break;
            case 'LOG_IN_SUCCESS':
                draft.logInLoading = false;
                draft.me = action.data;
                draft.logInDone = true;
                break;
            case 'LOG_IN_FAILURE':
                draft.logInLoading = false;
                draft.logInError = action.error;
                break;
            case 'LOG_OUT_REQUEST':
                draft.logOutLoading = true;
                draft.logOutError = null;
                draft.logOutDone = false;
                break;
            case 'LOG_OUT_SUCCESS':
                draft.logOutLoading = false;
                draft.logOutDone = true;
                draft.me = null;
                draft.mainPosts = [];
                break;
            case 'LOG_OUT_FAILURE':
                draft.logOutLoading = false;
                draft.logOutError = action.error;
                break;
            case 'UPLOAD_IMAGES_REQUEST':
                draft.uploadImagesLoading = true;
                draft.uploadImagesDone = false;
                draft.uploadImagesError = null;
                break;
            case 'UPLOAD_IMAGES_SUCCESS': {
                draft.imagePaths = action.data;
                draft.uploadImagesLoading = false;
                draft.uploadImagesDone = true;
                break;
            }
            case 'UPLOAD_IMAGES_FAILURE':
                draft.uploadImagesLoading = false;
                draft.uploadImagesError = action.error;
                break;
            case 'ADD_POST_REQUEST':
                draft.addPostLoading = true;
                draft.addPostDone = false;
                draft.addPostError = null;
                break;
            case 'ADD_POST_SUCCESS':
                draft.addPostLoading = false;
                draft.addPostDone = true;
                draft.mainPosts = action.data.concat(draft.mainPosts);
                draft.imagePaths = [];
                break;
            case 'ADD_POST_FAILURE':
                draft.addPostLoading = false;
                draft.addPostError = action.error;
                break;
            case 'LOAD_USER_REQUEST':
                draft.loadUserLoading = true;
                draft.loadUserError = null;
                draft.loadUserDone = false;
                break;
            case 'LOAD_USER_SUCCESS':
                draft.loadUserLoading = false;
                draft.me = action.data;
                draft.loadUserDone = true;
                break;
            case 'LOAD_USER_FAILURE':
                draft.loadUserLoading = false;
                draft.loadUserError = action.error;
                break;
            case 'LOAD_POSTS_REQUEST':
                draft.loadPostsLoading = true;
                draft.loadPostsDone = false;
                draft.loadPostsError = null;
                break;
            case 'LOAD_POSTS_SUCCESS':
                draft.loadPostsLoading = false;
                draft.loadPostsDone = true;
                draft.mainPosts = draft.mainPosts.concat(action.data);
                break;
            case 'LOAD_POSTS_FAILURE':
                draft.loadPostsLoading = false;
                draft.loadPostsError = action.error;
                break;
            default:
                break;
        }
    });

export function ContextProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <StateContext.Provider value={state}>
            <DispatchContext.Provider value={dispatch}>{children}</DispatchContext.Provider>
        </StateContext.Provider>
    );
}
ContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export function useContextState() {
    const state = useContext(StateContext);
    if (!state) throw new Error('Cannot find SampleProvider');
    return state;
}

export function useContextDispatch() {
    const dispatch = useContext(DispatchContext);
    if (!dispatch) throw new Error('Cannot find SampleProvider');
    return dispatch;
}
