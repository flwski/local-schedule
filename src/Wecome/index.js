import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Image, StyleSheet, ImageBackground, Dimensions, Animated, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-community/async-storage';


import logo from '../../resources/img/iconlarge.png';


const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

export default function Splash({ navigation }) {

    const [fadeValue, setfadeValue] = useState(new Animated.Value(0));

    useEffect(() => {
        _start();
        setTimeout(() => handleUsuarioConectado(), 3000);
    }, []);

    _start = () => {
        Animated.timing(fadeValue, {
            toValue: 1,
            duration: 2000
        }).start();

    };

    handleUsuarioConectado = async () => {
        try {
            const nom = await AsyncStorage.getItem('@nome');


            if (nom !== null) {
                navigation.replace('Calendar');
            }
            else {
                navigation.replace('Home');
            }

        } catch (error) {
            console.log(error.toString());
        }
    }

    return (
        <>
            <StatusBar backgroundColor='#131426' barStyle="light-content" />
            <View style={{ height: deviceHeight, width: deviceWidth, backgroundColor: '#131426' }} >
                <Animated.View style={{ justifyContent: 'center', alignItems: 'center', marginTop: deviceHeight * 0.40, opacity: fadeValue }}>
                    <Image source={logo} alt="Logo" style={{ width: 110, height: 110, resizeMode: 'contain' }} />
                </Animated.View>
            </View>
        </>
    );
}