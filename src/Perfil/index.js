import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StatusBar, Dimensions, Linking, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-community/async-storage';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const Perfil = ({ navigation }) => {

    const [nome, setNome] = useState('');

    useEffect(() => {
        getNome();
    }, []);

    getNome = async () => {
        try {
            let nome = await AsyncStorage.getItem('@nome');
            setNome(nome);
        } catch (e) {
            Alert.alert(e.toString());
        }
    }

    removeSchedules = async () => {
        try {
            await AsyncStorage.removeItem('@schedules');
            Alert.alert('Tarefas Removidas', 'Todas as tarefas foram removidas com sucesso!');
        } catch (e) {
            Alert.alert(e.toString);
        }
    }

    logout = async () => {
        try {
            await AsyncStorage.removeItem('@schedules');
            await AsyncStorage.removeItem('@nome');
            navigation.replace('Welcome');
        } catch (e) {
            Alert.alert(e.toString);
        }
    }

    return (
        <>
            <StatusBar backgroundColor='#131426' barStyle="light-content" />
            <View style={{ backgroundColor: '#131426', padding: 20 }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name="arrow-left" size={25} color="#fff" />
                </TouchableOpacity>
            </View>
            <View style={{ backgroundColor: '#131426', height: 90, paddingLeft: 20, paddingTop: 8 }}>
                <Text style={{ color: '#fff', fontSize: 20 }}>Perfil de</Text>
                <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 25 }}>{nome}</Text>
            </View>
            <View style={{ marginLeft: 10, marginTop: 10 }}>
                <TouchableOpacity onPress={()=>removeSchedules()} style={{ flexDirection: 'row', alignItems: 'center', height: 50, paddingBottom: 20, borderBottomColor: '#d6d6d6', borderBottomWidth: 1, margin: 10 }}>
                    <Icon name="calendar-remove" size={35} color="#131426" />
                    <View style={{ marginLeft: 15, width: WIDTH * 0.65 }}>
                        <Text style={{ fontSize: 18, color: "#131426", fontWeight: 'bold' }}>Apagar Tarefas</Text>
                        <Text style={{ fontSize: 15, color: "#a4a4a4", }}>Restaura as tarefas criadas</Text>
                    </View>
                    <View >
                        <Icon name="chevron-right" color="#131426" size={30} />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>logout()} style={{ flexDirection: 'row', alignItems: 'center', height: 50, paddingBottom: 20, borderBottomColor: '#d6d6d6', borderBottomWidth: 1, margin: 10 }}>
                    <Icon name="close-circle-outline" size={35} color="#e53935" />
                    <View style={{ marginLeft: 15, width: WIDTH * 0.65, }}>
                        <Text style={{ fontSize: 18, color: "#131426", fontWeight: 'bold' }}>Sair da conta</Text>
                        <Text style={{ fontSize: 15, color: "#a4a4a4", }}>Apagar todos os registros e sair</Text>
                    </View>
                    <View>
                        <Icon name="chevron-right" color="#131426" size={30} />
                    </View>
                </TouchableOpacity>
            </View>
            <View style={{ margin: 20, position: 'absolute', bottom: 0, backgroundColor:'#eee', padding: 10 }}>
                <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#a4a4a4' }}>Sobe o app (v 1.0.0)</Text>
                <Text style={{ fontSize: 13, color: '#a4a4a4' }}>
                    Aplicativo criado para fins de demonstração de portifóllio de Fernando Levandoski Pecinato. Os dados são armazenados localmente no dispositivo e não acessa qualquer tipo de API.
                    Qualquer dúvida, entre em contato pelo e-mail:
                </Text>
                <TouchableOpacity onPress={() => Linking.openURL('mailto:fernandolevandoskip@gmail.com')}>
                    <Text style={{ fontSize: 13, color: '#a4a4a4', fontWeight: 'bold' }}>fernandolevandoskip@gmail.com</Text>
                </TouchableOpacity>
            </View>
        </>
    );
}

export default Perfil;