import styled from 'styled-components/native';

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
