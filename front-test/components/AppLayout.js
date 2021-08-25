import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const CommonHeader = styled.div`
    width: '100%';
    height: 100px;
    text-align: center;
    line-height: 100px;
    font-size: 30px;
    font-weight: 900;
    border-bottom: 1px solid #e9ecef;
`;

const Container = styled.div`
    margin: 0 auto;
    width: 500px;
    height: auto;
    padding-top: 30px;
    font-weight: 600;
    text-align: center;
`;

const AppLayout = ({ children }) => (
    <>
        <CommonHeader>기능 테스트</CommonHeader>
        <Container>{children}</Container>
    </>
);

AppLayout.propTypes = {
    children: PropTypes.node.isRequired,
};
export default AppLayout;
