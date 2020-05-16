import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Calendar, CalendarList, Agenda, LocaleConfig } from 'react-native-calendars';

LocaleConfig.locales['pt-br'] = {
    monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
    monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai,', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
    dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
    dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
    today: 'Hoje'
};
LocaleConfig.defaultLocale = 'pt-br';

const Home = () => {

    const [selected, setSelected] = useState(undefined);

    useEffect(() => {

    }, []);

    onDayPress = (day) => {
        setSelected(day.dateString);
    }

    onMonthChange = (day) => {
        setSelected(day.dateString);
    }

    return (<>
        <ScrollView style={styles.body}>

            <TouchableOpacity activeOpacity={.8} style={styles.navbar}>
                <Text style={styles.navbarText}>Olá, Fernando</Text>
                <Icon name="chevron-right" size={15} color="#0f224d" style={{marginTop: 2}}/>
            </TouchableOpacity>

            <View style={styles.header}>
                <View>
                    <Text style={styles.title}>Suas Tarefas de Maio</Text>
                    <Text style={styles.subTitle}>16 de Maio de 2020</Text>
                </View>

                <TouchableOpacity style={styles.btnAdd}>

                    <Text style={styles.btnAddText}>Adicionar</Text>
                </TouchableOpacity>

            </View>

            <View style={styles.calendarContainer}>
                <CalendarList
                    pastScrollRange={24}
                    futureScrollRange={24}
                    horizontal
                    pagingEnabled
                    style={{ borderBottomWidth: 1, borderBottomColor: 'lightgrey' }}
                    theme={{
                        "stylesheet.calendar.header": {
                            header: {
                                height: 0,
                                opacity: 0
                            }
                        }
                    }}
                    hideExtraDays={false}
                    style={styles.calendar}
                    onMonthChange={(month) => onMonthChange(month)}
                    onDayPress={(day) => onDayPress(day)}
                    markedDates={{
                        '2020-05-16': { selected: true, selectedColor: '#0f224d' },
                        '2020-05-23': { marked: true, dotColor: '#0f224d' },
                        '2020-05-24': { marked: true, dotColor: '#0f224d' },
                        '2020-05-25': { marked: true, dotColor: '#0f224d' },
                        '2020-05-26': { marked: true, dotColor: '#0f224d' },
                    }}

                />
            </View>

            <View style={styles.containerEvents}>

            </View>

        </ScrollView>
    </>);
}

const styles = StyleSheet.create({
    body: {
        backgroundColor: '#fff'
    },
    navbar: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 0,
        marginTop: 20,
        marginLeft: 20,
        marginBottom: 5,   
    },
    navbarText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#131426'
    },
    header: {
        marginLeft: 20,
        marginTop: 0,
        marginBottom: 20,
        marginRight: 20,
        flexDirection: 'row'
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#131426'
    },
    subTitle: {
        color: '#a4a4a4',
        fontSize: 15,
        fontWeight: 'bold'
    },
    btnAdd: {
        backgroundColor: '#2ec5a0',
        width: 90,
        borderRadius: 100,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 25,
        elevation: 5

    },
    btnAddText: {
        color: '#fff',
        marginLeft: 5,
        fontWeight: 'bold',
        fontSize: 15,
    },
    containerEvents: {
        backgroundColor: '#f0f4fd',
        height: 100,
        marginTop: -10,
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15
    }
});

export default Home;