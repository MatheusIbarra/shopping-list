import styled from 'styled-components/native';

export const CloseClick = styled.TouchableOpacity `
    position: absolute;
    right: 10px;
    top: 10px;
    z-index: 10000;
`

export const ModalContent = styled.View`
    background-color: ${props => props.theme.background};
    max-height: 500px;
    min-width: 70%;
    max-width: 500px
    border-radius: 10px;
    padding: 20px;
    justify-content: space-around;
    align-items: center;
`

export const ModalText = styled.Text`
    color: ${props => props.theme.text}
    font-size: 16px;
    font-weight: bold;
    margin-top: 20px;
`

export const ButtonsContainer = styled.View`
    margin-top: 20px;
    width: 60%;
    flex-direction: row;
    justify-content: space-around;
`

export const ModalConfirmButton = styled.Button`
    background-color: ${props => props.theme.secundary};
`

export const ModalCancelButton = styled.Button`
    background-color: ${props => props.theme.tertiary};
`

export const Input = styled.TextInput`
    background-color: ${props => props.theme.background};
    padding: 5px;
    border-radius: 10px;
    color: ${props => props.theme.text};
    border: 1px solid ${props => props.theme.border};
    min-width: 200px;
`

export const EditContainer = styled.View`
    width: 100%;
    align-items: center;
    justify-content: center;
`
