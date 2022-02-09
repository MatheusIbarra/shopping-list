import React from 'react';

import Container from '../../components/Container';
const logoIcon = require('../../../assets/shopping-icon.png');
import * as Styled from './styles';
interface HomeProps {
    navigation: any;
}

const Home: React.FC<HomeProps> = ({ navigation }) => {
    return (
        <Container>
            <Styled.LogoIcon source={logoIcon} />
            <Styled.ButtonContainer>
                <Styled.EntryButton title='Entrar' onPress={() => navigation.navigate('List')}/>
            </Styled.ButtonContainer>
        </Container>
    );
}

export default Home;
