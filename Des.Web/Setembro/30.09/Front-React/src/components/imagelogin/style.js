import styled from 'styled-components';

import Banco_logo from '../../images/Banco_logo.png';

export const Container = styled.div`
    
    background-image: url( ${Banco_logo});
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;

    @media (max-width: 800px) {
        display: none;
    }
`