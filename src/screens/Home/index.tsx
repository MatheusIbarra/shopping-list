import React, { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const logoIcon = require('../../../assets/shopping-icon.png');
import * as Styled from './styles';
interface HomeProps {
    navigation: any;
}

const Home: React.FC<HomeProps> = ({ navigation }) => {

    useEffect(() => {
        const getStorage = async () => {
            const isFirstTime = await AsyncStorage.getItem('firstTime');
            if(isFirstTime === 'false') {
                navigation.navigate('List');
            } else {
                await AsyncStorage.setItem('firstTime', 'false')
            }
        }
        getStorage();
    }, []);

    return (
        <Styled.Container>
            <Styled.LogoIcon source={logoIcon} />
            <Styled.ButtonContainer>
                <Styled.EntryButton title='Entrar' onPress={() =>  {navigation.navigate('List')}}/>
            </Styled.ButtonContainer>
        </Styled.Container>
    );
}

export default Home;
