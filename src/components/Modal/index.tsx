import React from 'react';
import { View, ViewProps, Modal, useWindowDimensions } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useTheme } from 'styled-components/native';

import * as Styled from './styles';
import { ShoppingItem } from '../../services/classes';
interface ModalProps extends ViewProps {
    visible: boolean;
    onClose?: () => void;
    onDelete?: () => void;
    selectedItem: ShoppingItem;
    isEditing: boolean;
    onChangeText?(e: any): void;
    item?: any;
    onEdit?(): void;
}

const ModalComponent: React.FC<ModalProps> = ({ visible, onClose, onDelete, isEditing = false, onChangeText, item, onEdit }) => {
    const theme: any = useTheme();
    const deviceWidth = useWindowDimensions().width;
    const deviceHeight = useWindowDimensions().height;

    return (
            <Modal
                visible={visible}
                animationType="fade"
                transparent={true}
            >
                <View style={{width: deviceWidth,height: deviceHeight, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center'}}>
                    <Styled.ModalContent>
                        {isEditing ? (
                            <Styled.EditContainer>
                                <Styled.Input value={item.name} onChangeText={onChangeText} placeholder='Editar item' maxLength={25} />
                                <Styled.ButtonsContainer>
                                    <Styled.ModalConfirmButton color={theme.secundary} onPress={onEdit} title="Confirmar"></Styled.ModalConfirmButton>
                                    <Styled.ModalCancelButton color={theme.tertiary} onPress={onClose} title="Cancelar"></Styled.ModalCancelButton>
                                </Styled.ButtonsContainer>
                            </Styled.EditContainer>
                        ) : (
                            <>
                                <FontAwesome name="warning" size={60} color='orange' />
                                <Styled.ModalText>Você tem certeza que deseja apagar ?</Styled.ModalText>
                                <Styled.ButtonsContainer>
                                    <Styled.ModalConfirmButton color={theme.secundary} onPress={onDelete} title="Confirmar"></Styled.ModalConfirmButton>
                                    <Styled.ModalCancelButton color={theme.tertiary} onPress={onClose} title="Cancelar"></Styled.ModalCancelButton>
                                </Styled.ButtonsContainer>
                            </>
                        )}
                    </Styled.ModalContent>
                </View>
            </Modal>
    );
}

export default ModalComponent;
