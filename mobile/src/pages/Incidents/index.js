import React,{useEffect, useState} from 'react';
import {Feather} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';
import {View, Image, FlatList,Text, TouchableOpacity} from 'react-native';

import api from  '../../services/api';

import logoImg from '../../assets/logo.png';

import styles from './styles';

export default function Incidents(){
    const [incidents,setIncidents] = useState([]);
    const [total,setTotal] = useState(0);
    const [page,setPage] = useState(1);
    const[loading,setLoding] = useState(false);
    console.log(incidents);
    const navigation = useNavigation();

    function navigateToDetail(incident){
        navigation.navigate('Detail',{incident});
    }

    async function loadincidents(){
        const response = await api.get('incidents',{params: page});
        if (loading){
            return;
        }

        if (total > 0 && incidents.length == total){
            return;
        }

        setLoding(true);

        setIncidents([...incidents,...response.data]);
        setTotal(response.headers['x-total-count']);
        setPage(page+1);
        setLoding(false);
        console.log(response.data);
    };
    
    useEffect(()=>{
        loadincidents();
        console.log(incidents);
    },[]);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg} />
                <Text style={styles.headerText}>
                    Total de <Text style={styles.headerTextBold}> {total} casos</Text>.
                </Text>
            </View>
            <Text style={styles.title}>Bem-vindo(a)!</Text>
            <Text style={styles.description}>Escolha o caso e salve o dia!</Text>

            <FlatList  style={styles.IncidentList}
            data ={incidents} 
            keyExtractor={incident => String(incident.id)}
            showsVerticalScrollIndicator={false}
            onEndReached={loadincidents}
            onEndReachedThreshold={0.2}
            renderItem={({item: incident}) => (
                <View style={styles.Incident}>
                    <Text style={styles.IncidentProperty}>ONG:</Text>
                <Text style={styles.IncidentValue}>{incident.name}</Text>

                    <Text style={styles.IncidentProperty}>CASO:</Text>
                    <Text style={styles.IncidentValue}>{incident.title}</Text>

                    <Text style={styles.IncidentProperty}>VALOR:</Text>
            <Text style={styles.IncidentValue}>{Intl.NumberFormat('pt-BR', {style:'currency',currency: 'BRL'}).format(incident.value)}</Text>

                    <TouchableOpacity 
                    style={styles.detailsButton} onPress={()=>navigateToDetail(incident)}>
                    
                    <Text style={styles.detailsButtonText}>Ver Mais detalhes!</Text>
                    <Feather name="arrow-right" size={16} color="#E02041" />
                    </TouchableOpacity>
                    
                </View>
            )}
            />

        </View>
    );
};