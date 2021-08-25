import React, { useCallback, useState } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import axios from 'axios';
import AppLayout from '../components/AppLayout';
import PostForm from '../components/PostForm';
import ImagePopup from '../components/ImagePopup';

import { useSelector, useDispatch } from 'react-redux';
import { END } from 'redux-saga';
import wrapper from '../store/configureStore';
import { backUrl } from '../config/config';

const Button = styled.button`
    border: 0;
    line-height: 2.5;
    padding: 0 20px;
    font-size: 1rem;
    text-align: center;
    color: #fff;
    text-shadow: 1px 1px 1px #000;
    border-radius: 10px;
    background-color: rgba(220, 0, 0, 1);
    background-image: linear-gradient(to top left, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2) 30%, rgba(0, 0, 0, 0));
    box-shadow: inset 2px 2px 3px rgba(255, 255, 255, 0.6), inset -2px -2px 3px rgba(0, 0, 0, 0.6);
    margin: 0 10px;

    &:hover {
        background-color: rgba(255, 0, 0, 1);
        cursor: pointer;
    }

    &:active {
        box-shadow: inset -2px -2px 3px rgba(255, 255, 255, 0.6), inset 2px 2px 3px rgba(0, 0, 0, 0.6);
    }
`;

export default function Home() {
    const state = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const { me, mainPosts } = state;
    const [imgbool, setImgbool] = useState(false);
    const [imgsrc, setImgsrc] = useState('');

    const onLogout = useCallback(() => {
        dispatch({ type: 'LOG_OUT_REQUEST' });
    }, []);

    const popOpen = useCallback((e) => {
        setImgbool((prev) => !prev);
        setImgsrc(e.target.src);
    }, []);

    return (
        <AppLayout>
            {me ? (
                <>
                    <h1>{me.userid}님 환영합니다</h1>
                    <Button onClick={onLogout}>로그아웃</Button>

                    <PostForm />
                </>
            ) : (
                <>
                    <Link href="/signup">
                        <a>
                            <Button>회원가입</Button>
                        </a>
                    </Link>
                    <Link href="/login">
                        <a>
                            <Button>로그인</Button>
                        </a>
                    </Link>
                </>
            )}

            {me &&
                mainPosts?.length !== 0 &&
                mainPosts.map((post) => (
                    <div style={{ cursor: 'pointer' }} key={post.id}>
                        <img
                            style={{ display: 'block', width: '100%', marginTop: 20 }}
                            src={`${backUrl}/${post.src}`}
                            onClick={popOpen}
                            alt=""
                        />
                    </div>
                ))}
            {imgbool && <ImagePopup src={imgsrc} onClick={popOpen} />}
        </AppLayout>
    );
}

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
    const cookie = context.req ? context.req.headers.cookie : '';
    axios.defaults.headers.Cookie = '';
    if (context.req && cookie) {
        axios.defaults.headers.Cookie = cookie;
    }
    context.store.dispatch({
        type: 'LOAD_USER_REQUEST',
    });
    context.store.dispatch({
        type: 'LOAD_POSTS_REQUEST',
    });
    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
});
