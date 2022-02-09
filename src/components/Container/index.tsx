import React from 'react';
import * as Styled from './styles';


const Container: React.FC = ({ children }) => {
    return (
        <Styled.Container>
            {children}
        </Styled.Container>
    );
}

export default Container;
