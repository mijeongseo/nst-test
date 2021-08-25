import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const PopContainer = styled.div`
    width: '100%';
    height: auto;
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.8);
    & > .mask {
        width: 100vw;
        height: 100vh;
    }
`;
const Header = styled.header`
    height: 80px;
    line-height: 80px;
    background: black;
    position: relative;
    padding: 0;
    text-align: center;
    & > h1 {
        color: white;
    }
    margin-bottom: 30px;
`;

const CloseBtn = styled.div`
    width: 120px;
    height: 80px;
    font-size: 30px;
    line-height: 80px;
    text-align: center;
    position: absolute;
    right: 0;
    top: 0;
    cursor: pointer;
    color: white;
`;

function ImagePopup({ src, onClick }) {
    return (
        <PopContainer>
            <Header>
                <h1>원본 이미지</h1>
                <CloseBtn onClick={onClick}>X</CloseBtn>
            </Header>
            <img src={src} alt="" />
            <div className="mask" />
        </PopContainer>
    );
}

ImagePopup.propTypes = {
    src: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
};

export default ImagePopup;
