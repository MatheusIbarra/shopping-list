import React from 'react';
import { View, ViewProps, Modal, useWindowDimensions } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';


import * as Styled from './styles';

interface ModalProps extends ViewProps {
    visible: boolean;
    onClose?: () => void;
}

const ModalComponent: React.FC<ModalProps> = ({ visible, onClose, children, ...rest }) => {
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
                        <Styled.CloseClick onPress={onClose}>
                            <FontAwesome name="times" size={20} color="black" />
                        </Styled.CloseClick>
                        {children}
                    </Styled.ModalContent>
                </View>
            </Modal>
    );
}

export default ModalComponent;
