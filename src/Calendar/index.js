import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { CalendarList, LocaleConfig } from 'react-native-calendars';
import Timeline from 'react-native-timeline-flatlist'

LocaleConfig.locales['pt-br'] = {
    monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
    monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai,', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
    dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
    dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
    today: 'Hoje'
};
LocaleConfig.defaultLocale = 'pt-br';

const Home = ({navigation}) => {

    const [selected, setSelected] = useState(undefined);
    const [currentSchedules, setCurrentSchedules] = useState([
        { time: '09:00', title: '09:00 - BreakFast', description: 'I had breakfast from a wonderful restaurant and the food was super tasty.' },
        { time: '11:00', title: '11:00 - Tea Break', description: 'I made a tea myself and drink it with a packet of biscuits.' },
        { time: '13:00', title: '13:00 - Lunch', description: 'I ate lunch from nearby hotel but food was just okay.' },
        { time: '16:00', title: '16:00 - Tea Break', description: 'Ate two snacks.' },
        { time: '20:00', title: '20:00 - Dinner', description: 'This time I prepared dinner looking a youtube tutorial.' }
    ]
    );

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
                <Icon name="chevron-right" size={15} color="#0f224d" style={{ marginTop: 2 }} />
            </TouchableOpacity>

            <View style={styles.header}>
                <View>
                    <Text style={styles.title}>Maio 2020</Text>  
                    <Text style={styles.subTitle}>Gerencie suas tarefas</Text>
                </View>

                <TouchableOpacity TouchableOpacity={.9} style={styles.btnAdd} >
                  <Icon name="plus" size={20} color="#fff" />
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
                        '2020-05-23': { marked: true, dotColor: '#ff6f60' },
                        '2020-05-24': { marked: true, dotColor: '#ff6f60' },
                        '2020-05-25': { marked: true, dotColor: '#ff6f60' },
                        '2020-05-26': { marked: true, dotColor: '#ff6f60' },
                    }}

                />
            </View>

            <View style={styles.containerEvents}>

                <TouchableOpacity style={{marginLeft: 10, marginTop: 10}}>
                    <Text style={{ color: '#0f224d' }}>Eventos do dia:</Text>
                    <View style={styles.containerCurrentDate}>
                        <Text style={styles.currentDay}>20 de Maio</Text>
                        <Icon name="chevron-right" size={20} color="#0f224d" />
                    </View>
                </TouchableOpacity>

                <Timeline
                    circleSize={13}                    
                    separatorStyle={{ backgroundColor: '#d9d4d4' }}
                    circleColor='#ff6f60'
                    lineColor='#d9d4d4'                   
                    timeStyle={styles.time}
                    titleStyle={styles.titleStyle}
                    descriptionStyle={styles.description}
                    style={styles.list}
                    data={currentSchedules}
                    onEventPress={(e)=> Alert.alert(JSON.stringify(e))}
                    showTime={false}
                    detailContainerStyle={{marginBottom: 20, padding:10, backgroundColor: "#fff", borderRadius: 10, marginRight:10}}
                />
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
        marginTop: 10,
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
        width: 45,
        height: 45,
        borderRadius: 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 143,
        elevation: 5
    },
    btnAddText: {
        color: '#fff',
        marginLeft: 5,
        fontWeight: 'bold',
        fontSize: 15,
    },
    containerEvents: {
        backgroundColor: '#f1f5fe',
        padding: 10,
        marginTop: -20,
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15
    },
    list: {
        flex: 1,
        marginTop: 20,
    },    
    description: {
        color: 'gray',
    },
    titleStyle: {
        color: '#0f224d'
    },
    containerCurrentDate: {
        flexDirection: 'row',
        marginBottom: 10,
        marginTop: 2,
        alignItems: 'center',
        
    },
    currentDay: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#0f224d'
    },
});

export default Home;