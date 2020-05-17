import React, { Component } from 'react';
import { View, StatusBar } from 'react-native';
import 'react-native-gesture-handler';
console.disableYellowBox = true;

import Routes from './routes';

const src = () => {
    return (
        <>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />
            <Routes />
        </>
    );
}

export default src;