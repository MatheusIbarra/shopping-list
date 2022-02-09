import React, { useEffect, useState } from 'react';
import { Switch, View, BackHandler, Alert } from 'react-native';
import { Entypo, MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Audio } from 'expo-av';
import { useTheme as componentsTheme }  from 'styled-components/native';
import * as Random from 'expo-random';

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
    const [editModalVisible, setEditModalVisible] = useState(false);

    //Alteração no switch de tema
    const toggleSwitch = async () => {
        setIsEnabled(previousState => !previousState);
        if(isEnabled) {
            changeTheme('light');
        } else {
            changeTheme('dark');
        }
    };

    //Seleciona um item escolhido.
    const selectItem = (item: number) => {
        listItems[item].isSelected = !listItems[item].isSelected;
        setListItems([...listItems]);
        playSound();
    }

    //Cria um novo item.
    const createNewItem = () => {
        const newItem = {...item, id: Random.getRandomBytes(8).join().replace(/[^\d]+/g, ''), isSelected: false};
        setListItems([...listItems, newItem]);
        setItem(new ShoppingItem());
    }

    //Deleta um item ou os itens selecionados.
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

    //Abre modal para deletar item
    const handleDeleteItem = (item?: ShoppingItem) => {
        if(item) {
            setItem(item);
        }
        setModalVisible(true);
    }

    //Toca som ao selecionar um item
    const playSound = async () => {
        const { sound } = await Audio.Sound.createAsync(
           require('../../../assets/sounds/select-sound.mp3')
        );
        await sound.playFromPositionAsync(0)
    }

    //Seta item e dispara modal para edita-lo
    const handleEditItem = (item: any) => {
        setItem(item);
        setEditModalVisible(true);
    }

    //Controle de input
    const handleInputChange = (e: any) => {
        setItem({...item, name: e})
    }

    //Ao editar, salva na lista.
    const onEdit = () => {
        const index = listItems.findIndex(e => e.id === item.id);
        listItems[index].name = item.name;
        setListItems([...listItems]);
        setItem(new ShoppingItem());
        setEditModalVisible(false);
    }

    //Seleciona todos ou desceleciona todos.
    const selectAll = () => {
        if(listItems.filter((e: ShoppingItem) => e.isSelected).length === listItems.length) {
            listItems.forEach(e => {
                e.isSelected = false;
            })
        } else {
            listItems.forEach(e => {
                e.isSelected = true;
            })
        }
        setListItems([...listItems]);
    }

    //Evento caso usuario tente sair do app
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

    //Setagem de tema.
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
    }, []);

    return (
        <Styled.Container>
            <ModalComponent visible={editModalVisible} onClose={() => {setItem(new ShoppingItem()) ;setEditModalVisible(false)}} selectedItem={item} onDelete={onDelete} isEditing={true} onChangeText={handleInputChange} item={item} onEdit={onEdit} />
            <ModalComponent visible={modalVisible} onClose={() => {setItem(new ShoppingItem()) ;setModalVisible(false)}} selectedItem={item} onDelete={onDelete} isEditing={false} />
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
                <ShoppingList handleDeleteItem={handleDeleteItem} selectItem={selectItem} items={listItems} handleEdit={handleEditItem}/>
            </View>

            {listItems.length > 0 && (
                <>
                    <Styled.ListCount>
                        <Styled.HeaderText>
                            {listItems.filter((e: ShoppingItem) => e.isSelected).length + '/' + listItems.length}
                        </Styled.HeaderText>
                    </Styled.ListCount>

                    {listItems.filter((e: ShoppingItem) => e.isSelected).length > 0 && (
                        <>
                            <Styled.DeleteAll style={{bottom: 120}} onPress={selectAll}>
                                <Styled.HeaderText style={{fontSize: 10}}>
                                {listItems.filter((e: ShoppingItem) => e.isSelected).length === listItems.length ?
                                    'Descelecionar todos' : 'Selecionar todos'
                                }
                                </Styled.HeaderText>
                            </Styled.DeleteAll>
                            <Styled.DeleteAll onPress={() => handleDeleteItem()}>
                                <Styled.HeaderText style={{fontSize: 10}}>
                                    Apagar todos selecionados
                                </Styled.HeaderText>
                            </Styled.DeleteAll>
                        </>
                    )}

                </>
            )}

            <Styled.Footer>
                <Styled.Input value={item.name} onChangeText={handleInputChange} placeholder='Novo item na lista' maxLength={25} />
                <Styled.ListButton disabled={!item.name} onPress={createNewItem}>
                    <AntDesign name="plus" size={20} color={themeColors.primary} />
                </Styled.ListButton>
            </Styled.Footer>
        </Styled.Container>
    );
}

export default List;
