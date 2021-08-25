import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import 'antd/dist/antd.css';
import axios from 'axios';

import wrapper from '../store/configureStore';

axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://localhost:3065';

const App = ({ Component }) => (
    <>
        <Head>
            <meta charSet="utf-8" />
            <title>NST TEST</title>
        </Head>
        <Component />
    </>
);

App.propTypes = {
    Component: PropTypes.elementType.isRequired,
};

export default wrapper.withRedux(App);
