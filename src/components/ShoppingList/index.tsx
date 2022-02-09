import React, { useState } from 'react';
import { Animated, FlatList, Text, TouchableOpacity } from 'react-native';
import CheckBox from 'expo-checkbox'
import { AntDesign } from '@expo/vector-icons';
import * as Styled from './styles';
import { ShoppingItem } from '../../services/classes';

interface ListProps {
    items: ShoppingItem[];
    selectItem(index: number): void;
}

const ShoppingList: React.FC<ListProps> = ({ items, selectItem }) => {


    return (
        <FlatList
            ListEmptyComponent={() => (
                <Styled.NoItemsText>Nenhum item na lista.</Styled.NoItemsText>
            )}
            data={items}
            keyExtractor={(item: ShoppingItem) => item.id}
            renderItem={({ item: item, index }) => {
                return (
                    <Styled.ItemsContainer isSelected={item.isSelected} >
                        <Styled.ItemRow>
                            <CheckBox
                                value={item.isSelected}
                                onValueChange={() => selectItem(index)}
                            />
                            <Styled.ItemsName isSelected={item.isSelected}>{item.name}</Styled.ItemsName>
                        </Styled.ItemRow>
                        <TouchableOpacity>
                            <AntDesign name="closecircle" size={24} color="red" />
                        </TouchableOpacity>
                    </Styled.ItemsContainer>
                )
            }}
        />

    );
}

export default ShoppingList;
