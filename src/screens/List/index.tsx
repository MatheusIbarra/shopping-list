import React, { useEffect, useState } from 'react';
import { Switch, View, ScrollView, BackHandler, Alert } from 'react-native';
import { Entypo, MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Audio } from 'expo-av';
import { useTheme as componentsTheme }  from 'styled-components/native';

import * as Styled from './styles';
import { useTheme } from '../../hooks/theme';
import ShoppingList from '../../components/ShoppingList';
import { ShoppingItem } from '../../services/classes';
import ModalComponent from '../../components/Modal';
import usePersistedState from '../../utils/usePersistedState';

const List: React.FC = () => {
    const { changeTheme } = useTheme();
    const themeColors = componentsTheme();
    const [isEnabled, setIsEnabled] = useState(false);
    const [listItems, setListItems] = usePersistedState<ShoppingItem[]>('listItems', []);
    const [item, setItem] = useState(new ShoppingItem());
    const [modalVisible, setModalVisible] = useState(false);

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
        playSound();
    }

    const createNewItem = () => {
        const newItem = {...item, id: Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1), isSelected: false};
        setListItems([...listItems, newItem]);
        setItem(new ShoppingItem());
    }

    const onDelete = () => {
        if(item?.id) {
            const index = listItems.findIndex(e => e.id === item.id);
            listItems.splice(index, 1);
            setListItems([...listItems]);
            setItem(new ShoppingItem());
            setModalVisible(false);
        } else {
            const filteredItems: any = listItems.filter(e => !e.isSelected);
            setListItems(filteredItems);
            setModalVisible(false);
        }
    }

    const handleDeleteItem = (item?: ShoppingItem) => {

        if(item) {
            setItem(item);
        }

        setModalVisible(true);
    }

    async function playSound() {
        const { sound } = await Audio.Sound.createAsync(
           require('../../../assets/sounds/select-sound.mp3')
        );
        await sound.playFromPositionAsync(0)
    }

    useEffect(() => {
        const backAction = () => {
          Alert.alert('Aviso', 'Você tem certeza que deseja fechar o app ?', [
            {
              text: 'Cancelar',
              onPress: () => null,
            },
            { text: 'Sim', onPress: () => {
                BackHandler.exitApp()
            } },
          ]);
          return true;
        };

        const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

        return () => backHandler.remove();
    }, []);

    useEffect(() => {
        const getTheme = async () => {
            const storageValue = await AsyncStorage.getItem('theme');
            if(storageValue) {
                const newValue = JSON.parse(storageValue);
                if(newValue.name === 'light') {
                    setIsEnabled(false);
                } else {
                    setIsEnabled(true);
                }
            }
        }

        getTheme();
    }, [])

    return (
        <Styled.Container>
            <ModalComponent visible={modalVisible} onClose={() => setModalVisible(false)} selectedItem={item} onDelete={onDelete} />
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

            <View style={{padding: 5, flex: 1}}>
                <ShoppingList handleDeleteItem={handleDeleteItem} selectItem={selectItem} items={listItems}/>
            </View>

            {listItems.length > 0 && (
                <>
                    <Styled.ListCount>
                        <Styled.HeaderText>
                            {listItems.filter((e: ShoppingItem) => e.isSelected).length + '/' + listItems.length}
                        </Styled.HeaderText>
                    </Styled.ListCount>

                    {listItems.filter((e: ShoppingItem) => e.isSelected).length > 0 && (
                        <Styled.DeleteAll onPress={() => handleDeleteItem()}>
                            <Styled.HeaderText style={{fontSize: 10}}>
                                Apagar todos selecionados
                            </Styled.HeaderText>
                        </Styled.DeleteAll>
                    )}

                </>
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
