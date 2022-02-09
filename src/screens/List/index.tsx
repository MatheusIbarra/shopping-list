import React, { useEffect, useState } from 'react';
import { Switch, Text, View } from 'react-native';
import { Entypo, MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';

import * as Styled from './styles';
import { useTheme } from '../../hooks/theme';
import ShoppingList from '../../components/ShoppingList';
import { ScrollView } from 'react-native-gesture-handler';
import { useTheme as componentsTheme }  from 'styled-components/native';
import { ShoppingItem } from '../../services/classes';

const List: React.FC = () => {
    const { changeTheme, theme } = useTheme();
    const themeColors = componentsTheme();
    const [isEnabled, setIsEnabled] = useState(theme.name === 'light' ? false : true);
    const [listItems, setListItems] = useState<ShoppingItem[]>([]);
    const [item, setItem] = useState(new ShoppingItem());


    const toggleSwitch = async () => {
        setIsEnabled(previousState => !previousState);
        if(isEnabled) {
            changeTheme('light');
        } else {
            changeTheme('dark');
        }
    };

    const selectItem = (item: number) => {
        listItems[item].isSelected = !listItems[item].isSelected;
        setListItems([...listItems]);
    }

    const createNewItem = () => {
        const newItem = {...item, id: 'xd', isSelected: false}
        setListItems([...listItems, newItem])
    }

    return (
        <Styled.Container>

            <Styled.Header>
                <Styled.HeaderText>Lista de compras</Styled.HeaderText>
                <Styled.ChangeTheme>
                    <Entypo name="light-up" size={24} color="white" />
                    <Switch
                        onValueChange={toggleSwitch}
                        value={isEnabled}>
                    </Switch>
                    <MaterialCommunityIcons name="theme-light-dark" size={24} color="white" />
                </Styled.ChangeTheme>
            </Styled.Header>

            <ScrollView>
                <View style={{padding: 5}}>
                    <ShoppingList selectItem={selectItem} items={listItems}/>
                </View>
            </ScrollView>

            {listItems.length > 0 && (
                <Styled.ListCount>
                    <Styled.HeaderText>
                        {listItems.filter((e: ShoppingItem) => e.isSelected).length + '/' + listItems.length}
                    </Styled.HeaderText>
                </Styled.ListCount>
            )}

            <Styled.Footer>
                <Styled.Input value={item.name} onChangeText={(e: any) => setItem({...item, name: e})} placeholder='Novo item na lista' maxLength={25} />
                <Styled.ListButton disabled={!item.name} onPress={createNewItem}>
                    <AntDesign name="plus" size={20} color={themeColors.primary} />
                </Styled.ListButton>
            </Styled.Footer>

        </Styled.Container>
    );
}

export default List;
