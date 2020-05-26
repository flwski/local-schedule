import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, Text, TouchableOpacity, Alert, Dimensions, Image, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { CalendarList, LocaleConfig } from 'react-native-calendars';
import Timeline from 'react-native-timeline-flatlist'
import Modal from 'react-native-modalbox';
import moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-community/async-storage';
import { useFocusEffect } from '@react-navigation/native';

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

    const [calendarSchedules, setCalendarSchedules] = useState([]);
    const [timelineSchedules, setTimelineSchedules] = useState([]);
    const [visibleModalConfirm, setVisibleModalConfirm] = useState(false);
    const [visibleModalDelete, setVisibleModalDelete] = useState(false);
    const [nome, setNome] = useState('');

    const [schedule, setSchedule] = useState('');

    useEffect(() => {
        let today = moment().format('YYYY-MM-DD').toString();
        manageSchedules(today, false);
        setSelected(today);
        setCalendarSchedules({ [today]: { selected: true, selectedColor: '#0f224d' } });
        setDayToString(`${today.split('-')[2]} de ${monthNames[parseInt(today.split('-')[1])]}`);
        getName();
    }, []);

    useFocusEffect(
        React.useCallback(() => {
            let today = moment().format('YYYY-MM-DD').toString();
            manageSchedules(today, false);
            setSelected(today);
            setCalendarSchedules({ [today]: { selected: true, selectedColor: '#0f224d' } });
            setDayToString(`${today.split('-')[2]} de ${monthNames[parseInt(today.split('-')[1])]}`);
            getName();
        }, [])
    );

    getName = async () => {
        try {
            let nome = await AsyncStorage.getItem('@nome');
            setNome(nome);
        } catch (e) {
            Alert.alert(e.toString());
        }
    }

    onDayPress = (day) => {
        setSelected(day.dateString);
        setCalendarSchedules({ [day.dateString]: { selected: true, selectedColor: '#0f224d' } });
        setDayToString(`${day.dateString.split('-')[2]} de ${monthNames[parseInt(day.dateString.split('-')[1])]}`);
        manageSchedules(day.dateString, false);
        let month = [{
            year: day.dateString.split('-')[0],
            month: parseInt(day.dateString.split('-')[1])
        }];
        onMonthChange(month);

    }

    onMonthChange = (month) => {
        //Alert.alert(JSON.stringify(month));
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

    manageSchedules = async (current, changes = false) => {
        try {

            let schedules = await AsyncStorage.getItem('@schedules');

            if (schedules) {                
                let json = JSON.parse(schedules);

                myArr = [];
                const nextDays = [];

                json.forEach((e) => {
                    if (e.date === current) {
                        myArr.push({
                            time: e.id,
                            title: e.title,
                            description: e.desc
                        });
                    }
                    nextDays.push(e.date);

                });

                let newDaysObject = {};

                nextDays.forEach((day) => {
                    newDaysObject[day] = {
                        selected: true,
                        selectedColor: '#a5b3d4'
                    };
                });

                if (nextDays.includes(current)) {
                    newDaysObject[current] = {
                        selected: true,
                        selectedColor: '#0f224d',
                    };
                }
                else {
                    newDaysObject[current] = {
                        selected: true,
                        selectedColor: '#0f224d',
                    };
                }

                setCalendarSchedules(newDaysObject);
                setTimelineSchedules(myArr);

                if (myArr.length > 0) {
                    setHasEvents(true);
                }
                else {
                    setHasEvents(false);
                }
            }
            else {
                setHasEvents(false);              
            }

        } catch (e) {
            Alert.alert(e.toString());
        }
    }

    createSchedule = async () => {
        let seq = 0;
        let comp = Math.floor(Math.random() * 10);

        while (seq === comp) {
            comp = Math.floor(Math.random() * 10);
        }

        try {
            let schedules = await AsyncStorage.getItem('@schedules');
            let myArr = [];
            myArr.push({
                id: comp,
                title: titulo,
                desc: descricao,
                date: selected
            });

            if (schedules) {
                let json = JSON.parse(schedules);
                json.forEach((e) => {
                    myArr.push(e);
                });
            }
            await AsyncStorage.setItem('@schedules', JSON.stringify(myArr));
            manageSchedules(selected, false);
            setVisibleModal(false);
            setVisibleModalConfirm(true);

        } catch (e) {
            Alert.alert(e.toString());
        }
    }

    handleAgendamento = (e) => {
        setSchedule(e);
        setVisibleModalDelete(true);
    }

    deleteSchedule = async (id) => {
        try {

            let schedules = JSON.parse(await AsyncStorage.getItem('@schedules'));
            let arr = [];

            schedules.forEach((e) => {
                if (e.id !== id) {
                    arr.push(e);
                }
            });

            await AsyncStorage.setItem('@schedules', JSON.stringify(arr));
            setVisibleModalDelete(false);

            manageSchedules(selected, false);

        } catch (e) {
            Alert.alert(e.toString());
        }
    }

    return (
        <>
            <ScrollView style={styles.body}>
                <View style={{ backgroundColor: '#fff' }}>
                    <TouchableOpacity onPress={() => navigation.navigate('Perfil')} activeOpacity={.8} style={styles.navbar}>
                        <Text style={styles.navbarText}>Olá, {nome}</Text>
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
                            dotColor: '#ff6f60',
                            textDayFontSize: 14,
                            "stylesheet.calendar.header": {
                                header: {
                                    height: 0,
                                    opacity: 0
                                }
                            }
                        }}
                        current={selected}
                        hideExtraDays={false}
                        style={styles.calendar}
                        onDayPress={(day) => onDayPress(day)}
                        markedDates={calendarSchedules}

                    />
                </View>

                <View style={styles.containerEvents}>

                    <View style={{ marginLeft: 10, marginTop: 10 }}>
                        <Text style={{ color: '#0f224d' }}>Tarefas do dia:</Text>
                        <View style={styles.containerCurrentDate}>
                            <Text style={styles.currentDay}>{dayToString}</Text>
                        </View>
                    </View>

                    <Timeline
                        circleSize={13}
                        separatorStyle={{ backgroundColor: '#d9d4d4' }}
                        circleColor='#ff6f60'
                        lineColor='#d9d4d4'
                        timeStyle={styles.time}
                        titleStyle={styles.titleStyle}
                        descriptionStyle={styles.description}
                        style={[styles.list, { display: hasEvents ? 'flex' : 'none' }]}
                        data={timelineSchedules}
                        onEventPress={(e) => handleAgendamento(e)}
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
                style={{ height: HEIGHT * 0.95, backgroundColor: '#fff', elevation: 11, borderTopRightRadius: 5, borderTopLeftRadius: 5 }}
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
                        <View style={{ justifyContent: 'center', position: 'absolute', right: 20, marginTop: 30 }}>
                            <TouchableOpacity activeOpacity={.8} onPress={() => setVisibleModal(false)}>
                                <Icon name="chevron-down" size={20} color="#fff" />
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
                            <TouchableOpacity onPress={() => createSchedule()} activeOpacity={.9} style={[styles.btnsalvar, { display: titulo === '' || descricao === '' ? 'none' : 'flex' }]}>
                                <Text style={styles.btnsalvarText}>Salvar</Text>
                            </TouchableOpacity>
                        </View>

                    </View>

                </View>
            </Modal>

            <Modal
                onClosed={() => setVisibleModalConfirm(false)}
                style={{ height: HEIGHT * 0.40, backgroundColor: '#fff', borderTopRightRadius: 5, borderTopLeftRadius: 5 }}
                animationDuration={1000}
                swipeToClose={true}
                entry="bottom"
                backButtonClose={true}
                position={'bottom'}
                aboveStatusBar={true}
                isOpen={visibleModalConfirm}>
                <View>
                    <View style={{ justifyContent: 'center', alignItems: 'center', height: 300, width: 250, borderRadius: 250, alignSelf: 'center', marginTop: -80, backgroundColor: '#fff' }}>
                        <Image source={require('../../resources/img/check.png')} style={{ resizeMode: 'contain', height: 200, width: 200, marginTop: -70 }} />
                    </View>

                    <View style={{ marginTop: -90 }}>
                        <Text style={{ alignSelf: 'center', fontSize: 18, fontWeight: 'bold', color: '#131426' }}>Tarefa adicionada com sucesso!</Text>
                        <Text style={{ alignSelf: 'center', fontSize: 15, color: '#a4a4a4' }}>Sua tarefa foi adicionada com sucesso ao calendário</Text>
                    </View>

                    <View style={{ width: WIDTH, alignItems: 'center', marginTop: 20 }}>
                        <TouchableOpacity style={[styles.btnsalvar, { flexDirection: 'row', height: 60 }]} onPress={() => setVisibleModalConfirm(false)}>
                            <Text style={styles.btnAddText}>Continuar</Text>
                            <Icon name="chevron-right" size={30} color="#fff" style={{ marginLeft: 5 }} />
                        </TouchableOpacity>
                    </View>
                </View>

            </Modal>

            <Modal
                onClosed={() => setVisibleModalDelete(false)}
                style={{ height: HEIGHT * 0.40, backgroundColor: '#fff', borderTopRightRadius: 5, borderTopLeftRadius: 5 }}
                animationDuration={1000}
                swipeToClose={true}
                entry="bottom"
                backButtonClose={true}
                position={'bottom'}
                aboveStatusBar={true}
                isOpen={visibleModalDelete}>
                <View>
                    <View style={{ justifyContent: 'center', alignItems: 'center', height: 300, width: 250, borderRadius: 250, alignSelf: 'center', marginTop: -80, backgroundColor: '#fff' }}>
                        <Image source={require('../../resources/img/trash.png')} style={{ resizeMode: 'contain', height: 200, width: 200, marginTop: -70 }} />
                    </View>

                    <View style={{ marginTop: -90 }}>
                        <Text style={{ alignSelf: 'center', fontSize: 18, fontWeight: 'bold', color: '#131426' }}>Deseja excluir a tarefa abaixo?</Text>
                        <Text style={{ alignSelf: 'center', fontSize: 18, color: '#a4a4a4', marginTop: 15 }}>"{schedule.title}"</Text>
                    </View>

                    <View style={{ width: WIDTH, alignItems: 'center', marginTop: 10, flexDirection: 'row', justifyContent: 'space-around' }}>

                        <TouchableOpacity onPress={() => deleteSchedule(schedule.time)} style={[styles.btnsalvar, { flexDirection: 'row', height: 60, backgroundColor: '#ff6f60' }]} >
                            <Text style={styles.btnAddText}>Excluir</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => setVisibleModalDelete(false)} style={[styles.btnsalvar, { flexDirection: 'row', height: 60, backgroundColor: '#fff' }]} >
                            <Text style={[styles.btnAddText, { color: '#131426' }]}>Fechar</Text>
                        </TouchableOpacity>
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
        flexDirection: 'row',
        backgroundColor: '#131426',
        padding: 20,
        elevation: 10,
        borderTopRightRadius: 5,
        borderTopLeftRadius: 5
    },
    topoAgendaText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff'
    },
    topoAgendaTextSub: {
        fontSize: 15,
        color: '#fff'
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