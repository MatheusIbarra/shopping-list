import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
    background-color: ${props => props.theme.background};
    justify-content: center;
    align-items: center;
    padding: 20px;
`

export const LogoIcon = styled.Image`
    width: 30%;
    height: 30%;
    resize-mode: contain;
`

export const EntryButton = styled.Button`
    background: ${props => props.theme.primary};
    color: ${props => props.theme.text};
`

export const ButtonContainer = styled.View`
    width: 70%;
`

