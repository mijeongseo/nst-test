import React, { useEffect } from 'react';
import { Form, Input, Button } from 'antd';

import Router from 'next/router';
import useInput from '../hooks/useInput';

import AppLayout from '../components/AppLayout';
import { useSelector, useDispatch } from 'react-redux';

import wrapper from '../store/configureStore';
import axios from 'axios';
import { END } from 'redux-saga';

export default function login() {
    const [userid, onChangeUserid] = useInput('');
    const [password, onChangePassword] = useInput('');
    const state = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const { logInLoading, logInError, me } = state;

    useEffect(() => {
        if (logInError) {
            alert(logInError);
        }
    }, [logInError]);

    useEffect(() => {
        if (me && me.id) {
            Router.replace('/');
        }
    }, [me]);

    const onSubmit = () => {
        dispatch({ type: 'LOG_IN_REQUEST', data: { userid, password } });
    };

    return (
        <AppLayout>
            <Form onFinish={onSubmit}>
                <Form.Item label="이메일">
                    <Input name="userid" required value={userid} onChange={onChangeUserid} />
                </Form.Item>

                <Form.Item label="비밀번호">
                    <Input.Password name="password" required value={password} onChange={onChangePassword} />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={logInLoading}>
                        로그인
                    </Button>
                </Form.Item>
            </Form>
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
