import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, Text, TouchableOpacity, Alert, Dimensions, Image, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { CalendarList, LocaleConfig } from 'react-native-calendars';
import Timeline from 'react-native-timeline-flatlist'
import Modal from 'react-native-modalbox';
import moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

LocaleConfig.locales['pt-br'] = {
    monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
    monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai,', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
    dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
    dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
    today: 'Hoje'
};
LocaleConfig.defaultLocale = 'pt-br';

const Home = ({ navigation }) => {

    const [selected, setSelected] = useState(undefined);
    const [visibleModal, setVisibleModal] = useState(false);
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');
    const [markedDates, setMarkedDates] = useState([]);
    const [hasEvents, setHasEvents] = useState(false);
    const [dayToString, setDayToString] = useState('');
    const [dayWeek, setDayWeek] = useState('');

    const [titulo, setTitulo] = useState('');
    const [descricao, setDescricao] = useState('');

    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);

    const [monthNames, setMonthNames] = useState(['', 'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']);
    const [currentSchedules, setCurrentSchedules] = useState([
        { time: '09:00', title: '09:00 - BreakFast', description: 'I had breakfast from a wonderful restaurant and the food was super tasty.' },
        { time: '11:00', title: '11:00 - Tea Break', description: 'I made a tea myself and drink it with a packet of biscuits.' },
        { time: '13:00', title: '13:00 - Lunch', description: 'I ate lunch from nearby hotel but food was just okay.' },
        { time: '16:00', title: '16:00 - Tea Break', description: 'Ate two snacks.' },
        { time: '20:00', title: '20:00 - Dinner', description: 'This time I prepared dinner looking a youtube tutorial.' }
    ]
    );

    useEffect(() => {
        let today = moment().format('YYYY-MM-DD').toString();
        setSelected(today);
        setMarkedDates({ [today]: { selected: true, selectedColor: '#0f224d' } });
        setDayToString(`${today.split('-')[2]} de ${month}`);
    }, []);

    onDayPress = (day) => {
        setSelected(day.dateString);
        setMarkedDates({ [day.dateString]: { selected: true, selectedColor: '#0f224d' } });
        setDayToString(`${day.dateString.split('-')[2]} de ${month}`);
    }

    onMonthChange = (month) => {
        setMonth(monthNames[month[0].month.toString()]);
        setYear(month[0].year.toString());
    }

    onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setDate(currentDate);
    };

    handleShow = () => {
        setShow(false);
        setShow(true);
    }

    handleCloseModal = () => {
        setVisibleModal(false);
        setTitulo('');
        setDescricao('');
    }

    return (<>
        <ScrollView style={styles.body}>
            <View style={{ backgroundColor: '#fff' }}>
                <TouchableOpacity activeOpacity={.8} style={styles.navbar}>
                    <Text style={styles.navbarText}>Olá, Fernando</Text>
                    <Icon name="chevron-right" size={15} color="#0f224d" style={{ marginTop: 2 }} />
                </TouchableOpacity>

                <View style={styles.header}>
                    <View>
                        <Text style={styles.title}>{month} {year}</Text>
                        <Text style={styles.subTitle}>Gerencie suas tarefas</Text>
                    </View>

                    <TouchableOpacity TouchableOpacity={.9} style={styles.btnAdd} onPress={() => setVisibleModal(true)}>
                        <Icon name="plus" size={20} color="#fff" />
                    </TouchableOpacity>

                </View>
            </View>

            <View style={styles.calendarContainer}>
                <CalendarList
                    pastScrollRange={24}
                    futureScrollRange={24}
                    horizontal
                    pagingEnabled
                    onVisibleMonthsChange={(months) => { onMonthChange(months) }}
                    style={{ borderBottomWidth: 1, borderBottomColor: 'lightgrey' }}
                    theme={{
                        todayTextColor: '#2cc09c',
                        textDayFontWeight: 'bold',
                        textDayFontSize: 14,
                        "stylesheet.calendar.header": {
                            header: {
                                height: 0,
                                opacity: 0
                            }
                        }
                    }}
                    hideExtraDays={false}
                    style={styles.calendar}
                    onDayPress={(day) => onDayPress(day)}
                    markedDates={markedDates}

                />
            </View>

            <View style={styles.containerEvents}>

                <TouchableOpacity style={{ marginLeft: 10, marginTop: 10 }}>
                    <Text style={{ color: '#0f224d' }}>Eventos do dia:</Text>
                    <View style={styles.containerCurrentDate}>
                        <Text style={styles.currentDay}>{dayToString}</Text>
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
                    style={[styles.list, { display: hasEvents ? 'flex' : 'none' }]}
                    data={currentSchedules}
                    onEventPress={(e) => Alert.alert(JSON.stringify(e))}
                    showTime={false}
                    detailContainerStyle={{ marginBottom: 20, padding: 10, backgroundColor: "#fff", borderRadius: 10, marginRight: 10 }}
                />

                <View style={[styles.viewNoEvents, { display: hasEvents ? 'none' : 'flex' }]}>
                    <Image source={require('../../resources/img/calendar.png')} style={[styles.image]} />
                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#131426', marginTop: -20 }}>Nenhuma tarefa agendada para esse dia</Text>
                    <Text style={{ color: '#a4a4a4' }}>As tarefas agendadas aparecerão aqui</Text>
                </View>
            </View>

        </ScrollView>

        <Modal
            onClosed={() => handleCloseModal()}
            style={{ height: HEIGHT*0.95 , backgroundColor: '#fff', elevation: 11, borderTopRightRadius:5, borderTopLeftRadius:5 }}
            animationDuration={1000}
            swipeToClose={true}
            entry="bottom"
            backButtonClose={true}
            position={'bottom'}
            aboveStatusBar={true}
            isOpen={visibleModal}>
            <View>

                <View style={[styles.topoAgenda]}>
                    <View>
                        <Text style={styles.topoAgendaTextSub}>Nova tarefa para</Text>
                        <Text style={styles.topoAgendaText}>{dayToString} de {year}</Text>
                    </View>
                    <View style={{justifyContent:'center', position:'absolute', right:20, marginTop: 30}}>
                        <TouchableOpacity>
                            <Icon name="close" size={20} color="#fff" />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.viewForm}>

                    <View>
                        <TextInput
                            style={styles.titleInput}
                            placeholder="Título"
                            value={titulo}
                            onChangeText={setTitulo}
                        />
                    </View>

                    <View >
                        <TextInput
                            style={styles.DescInput}
                            placeholder="Descrição"
                            multiline={true}
                            numberOfLines={4}
                            textAlignVertical="top"
                            value={descricao}
                            onChangeText={setDescricao}
                        />
                    </View>

                    <View>
                        <TouchableOpacity activeOpacity={.9} style={[styles.btnsalvar,{display: titulo === '' || descricao === '' ? 'none' : 'flex'}]}>
                            <Text style={styles.btnsalvarText}>Salvar</Text>
                        </TouchableOpacity>
                    </View>

                </View>

            </View>
        </Modal>
    </>);
}

const styles = StyleSheet.create({
    body: {
        backgroundColor: '#f0f4fd'
    },
    navbar: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 0,
        marginTop: 20,
        marginLeft: 20,
        marginBottom: 5,
        backgroundColor: '#fff'
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
        flexDirection: 'row',
        backgroundColor: '#fff'
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
    viewNoEvents: {
        marginTop: -30,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        height: HEIGHT * 0.3,

    },
    image: {
        height: 180,
        width: 180,
        resizeMode: 'contain'
    },
    titleInput: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#131426'
    },
    DescInput: {
        fontSize: 20,
        // height:200,
        justifyContent: 'flex-start',
        color: '#131426'
    },
    viewForm: {
        marginLeft: 20,
        marginRight: 20,
        marginTop: 20
    },
    topoAgenda: {
        //margin: 20,
        flexDirection: 'row',
        backgroundColor:'#131426',
        padding:20,
        elevation: 10,
        borderTopRightRadius:5,
        borderTopLeftRadius:5
    },
    topoAgendaText: {
        fontSize: 20,
        fontWeight: 'bold',
        color:'#fff'
    },
    topoAgendaTextSub: {
        fontSize: 15,
        color:'#fff'
    },
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
});

export default Home;