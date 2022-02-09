import React from 'react';
import * as Styled from './styles';
const logoIcon = require('../../../assets/shopping-icon.png');

// import { Container } from './styles';

interface HomeProps {
    navigation: any;
}

const Home: React.FC<HomeProps> = ({ navigation }) => {

    return (
        <Styled.Container>
            <Styled.LogoIcon source={logoIcon} />
            <Styled.ButtonContainer>
                <Styled.EntryButton title='Entrar' onPress={() => navigation.navigate('List')}/>
            </Styled.ButtonContainer>
        </Styled.Container>
    );
}

export default Home;
