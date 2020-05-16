import React, { Component } from 'react';
import { View, StatusBar } from 'react-native';
import 'react-native-gesture-handler';


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