import React, { useState, useEffect } from 'react';
import { KeyboardAvoidingView, Image, View, ScrollView, StatusBar, Dimensions, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const Home = ({navigation}) => {

    const [nome, setNome] = useState('');

    handleGravarNome = async() => {
        try {
            await AsyncStorage.setItem('@nome', nome);
            navigation.replace('Calendar');

        } catch (e) {
            Alert.alert(e.toString());
        }
    }

    return (<>
        <StatusBar backgroundColor='#131426' barStyle="light-content" />
        <ScrollView style={{ backgroundColor: '#131426', height: HEIGHT }} keyboardShouldPersistTaps="always">
            <View style={{ margin: 30, alignItems: 'center', marginTop: 120 }}>
                <Text style={{ color: '#fff', fontSize: 20 }}>Olá, bem-vindo(a) ao</Text>
                <Text style={{ color: '#fff', fontSize: 25, fontWeight: 'bold' }}>Local Schedule App!</Text>
            </View>

            <View>
                <Image source={require('../../resources/img/welcome.png')} style={{ width: 250, height: 220, alignSelf: 'center', resizeMode: 'contain' }} />
            </View>

            <View>

                <TextInput
                    underlineColorAndroid="#00BFA6"
                    style={{ width: WIDTH * 0.8, color: '#fff', alignSelf: 'center', fontSize: 20, marginTop: 20, textAlign: 'center' }}
                    placeholder="Qual é o seu nome?"
                    placeholderTextColor="#fff"
                    value={nome}
                    onChangeText={setNome}
                />
            </View>
            <View>
                <TouchableOpacity onPress={()=>handleGravarNome()} style={[styles.btnsalvar, { width: WIDTH * 0.8, alignSelf: 'center', display: nome.length > 0 ? 'flex':'none' }]}>
                    <Text style={styles.btnsalvarText}>Continuar</Text>
                </TouchableOpacity>
            </View>

        </ScrollView>
    </>);
}

const styles = StyleSheet.create({
    btnsalvar: {
        backgroundColor: '#2ec5a0',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        borderRadius: 50,
        marginTop: 20,
        width: 150,
        elevation: 5
    },
    btnsalvarText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#fff'
    }
})

export default Home;