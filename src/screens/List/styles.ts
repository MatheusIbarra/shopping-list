import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
    background-color: ${props => props.theme.background};
`

export const Header = styled.View`
    width: 100%;
    padding: 5px;
    background-color: ${props => props.theme.primary};
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`

export const HeaderText = styled.Text`
    font-size: 16px;
    color: white;
    font-weight: bold;
`

export const ChangeTheme = styled.View`
    align-items: center;
    flex-direction: row;
`

export const Footer = styled.View`
    background-color: ${props => props.theme.primary};
    padding: 10px;
    flex-direction: row;
    width: 100%;
`

export const Input = styled.TextInput`
    background-color: ${props => props.theme.background};
    padding: 5px;
    border-radius: 10px;
    color: ${props => props.theme.text};
    width: 80%;
`

export const ListButton = styled.TouchableOpacity`
    background-color: ${props => props.theme.background};
    padding: 5px;
    border-radius: 10px;
    color: ${props => props.theme.text};
    margin-left: 10px;
    width: 17%;
    justify-content: center;
    align-items: center;
`

export const ListCount = styled.View`
    background-color: ${props => props.theme.primary};
    color: white;
    font-weight: bold;
    position: absolute;
    width: 50px;
    height: 50px;
    bottom: 80px;
    right: 20px;
    border-radius: 5px;
    border: 1px solid white;
    justify-content: center;
    align-items: center;
`


