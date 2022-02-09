import { Animated } from 'react-native';
import styled from 'styled-components/native';

interface ItemsContainer {
    isSelected: boolean;
}

export const ItemsContainer = styled.View<ItemsContainer>`
    padding: 15px;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    background-color: ${props => props.isSelected ? '#f8fff3' : props.theme.background}
    margin-top: 5px;
    border: 1px solid ${props => props.isSelected ? '#009688' : props.theme.border}
    border-radius: 5px;
`

export const ItemsName = styled.Text<ItemsContainer>`
    font-size: 16px;
    color: ${props => props.isSelected ? '#009688' : props.theme.text};
    text-decoration: ${props => props.isSelected && 'line-through'};
    margin-left: 20px;
`

export const ItemRow = styled.View`
    flex-direction: row;
    align-items: center;
`

export const NoItemsText = styled.Text`
    text-align: center;
    font-size: 16px;
    font-weight: bold;
    margin-top: 20px;
    color: ${props => props.theme.text};
`
export const EditItemName = styled.TouchableOpacity`
    width: 80%
`

