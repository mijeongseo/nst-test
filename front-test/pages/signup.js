import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';

import Router from 'next/router';
import useInput from '../hooks/useInput';

import { useSelector, useDispatch } from 'react-redux';
import AppLayout from '../components/AppLayout';

export default function signup() {
    const [userid, onChangeUserid] = useInput('');
    const [password, onChangePassword] = useInput('');
    const [passwordCheck, setPasswordCheck] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    const [term, setTerm] = useState(false);
    const [termError, setTermError] = useState(false);

    const state = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const { signUpLoading, signUpDone, signUpError } = state;

    const onChangePasswordCheck = (e) => {
        setPasswordError(e.target.value !== password);
        setPasswordCheck(e.target.value);
    };
    const checkHandler = (target) => {
        setTermError(false);
        setTerm(target.checked);
    };

    useEffect(() => {
        if (signUpDone) {
            alert('회원가입이 완료되었습니다.');
            Router.replace('/login');
        }
    }, [signUpDone]);

    useEffect(() => {
        if (signUpError) {
            alert(signUpError);
        }
    }, [signUpError]);

    const onSubmit = () => {
        if (password !== passwordCheck) {
            setPasswordError(true);
            return;
        }
        if (!term) {
            setTermError(true);
            return;
        }
        dispatch({ type: 'SIGN_UP_REQUEST', data: { userid, password } });
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
                <Form.Item label="비밀번호 확인">
                    <Input.Password name="password-check" required value={passwordCheck} onChange={onChangePasswordCheck} />
                    {passwordError && <div style={{ color: 'red' }}>비밀번호가 일치하지 않습니다.</div>}
                </Form.Item>

                <Form.Item>
                    <Checkbox name="checked" checked={term} onChange={(e) => checkHandler(e.target)}>
                        가입약관 동의
                    </Checkbox>
                    {termError && <div style={{ color: 'red' }}>약관에 동의하셔야 합니다.</div>}
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={signUpLoading}>
                        가입하기
                    </Button>
                </Form.Item>
            </Form>
        </AppLayout>
    );
}
