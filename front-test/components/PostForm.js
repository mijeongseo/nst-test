import React, { useRef, useCallback } from 'react';
import { Button, Form } from 'antd';
import { useSelector, useDispatch } from 'react-redux';

export default function PostForm() {
    const state = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const { imagePaths, addPostLoading } = state;

    const imageInput = useRef();

    const onClickImageUpload = useCallback(() => {
        if (imageInput.current) imageInput.current.click();
    }, [imageInput.current]);

    const onChangeImages = useCallback((e) => {
        const imageFormData = new FormData();
        [].forEach.call(e.target.files, (f) => {
            imageFormData.append('image', f);
        });

        dispatch({ type: 'UPLOAD_IMAGES_REQUEST', data: imageFormData });
    }, []);

    const onSubmit = useCallback(() => {
        const formData = new FormData();
        if (imagePaths?.length !== 0)
            imagePaths.forEach((p) => {
                formData.append('image', p);
            });

        dispatch({ type: 'ADD_POST_REQUEST', data: formData });
    }, [imagePaths]);

    return (
        <>
            <Form style={{ marginTop: 30 }} onFinish={onSubmit}>
                <input type="file" name="image" multiple hidden ref={imageInput} onChange={onChangeImages} />
                {imagePaths?.length === 0 ? (
                    <Button onClick={onClickImageUpload}>이미지 선택</Button>
                ) : (
                    <Button type="primary" style={{ float: 'right' }} htmlType="submit" loading={addPostLoading}>
                        업로드
                    </Button>
                )}
            </Form>
            {imagePaths &&
                imagePaths.map((v) => (
                    <div key={v} style={{ display: 'inline-block' }}>
                        <img src={`http://localhost:3065/${v}`} style={{ width: '200px' }} alt={v} />
                    </div>
                ))}
        </>
    );
}
