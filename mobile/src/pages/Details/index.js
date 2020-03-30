import React from 'react';
import {Feather} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';
import {View,TouchableOpacity, Image, Text,Linking} from 'react-native';
import * as MailComposer from 'expo-mail-composer';

import logoImg from '../../assets/logo.png';

import styles from './styles';

export default function Detail(){
    const navigation = useNavigation();
    const message ='olá Ed_Games, estou entrando em contato pois gostaria de  ajudar no caso "Cadelinha atropelada", com o valor de 120 R$';

    function navigateBack(){
        navigation.goBack();
    }

    function sendMail(){
        MailComposer.composeAsync({
            subject: 'Heroi do caso: Cadelinha atropelada',
            recipients:['edmarcosfilho2015@gmail.com'],
            body: message,
        })
    };

    function sendWhatsapp(){
        Linking.openURL(`whatsapp://send?phone=+55(77)991383901&t=${message}`);
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg} />

               <TouchableOpacity onPress={navigateBack}>
                   <Feather name="arrow-left" size={28} color="#e02041" />
               </TouchableOpacity>
            </View>

            <View style={styles.incident}>
            <Text style={styles.IncidentProperty}>ONG:</Text>
                    <Text style={styles.IncidentValue}>Ed_Games1:</Text>

                    <Text style={styles.IncidentProperty}>CASO::</Text>
                    <Text style={styles.IncidentValue}>Cadelinha atropelada:</Text>

                    <Text style={styles.IncidentProperty}>VALOR:</Text>
                    <Text style={styles.IncidentValue}>120,00 R$:</Text>
            </View>

            <View style={styles.contactBox}>
                <Text style={styles.heroTitle}>Salve o dia!</Text>
                <Text style={styles.heroTitle}>Seja o Heroi desse caso!</Text>

                <Text style={styles.heroDescription}>Entre em contato:</Text>

                <View style={styles.actions}>
                        <TouchableOpacity style={styles.action} onPress={sendWhatsapp}>
                            <Text style={styles.actionText}>Whatsapp</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.action} onPress={sendMail}>
                            <Text style={styles.actionText}>G-mail</Text>
                        </TouchableOpacity>

                </View>
            </View>
        </View>
    );
};