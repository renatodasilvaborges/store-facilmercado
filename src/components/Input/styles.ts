import styled, { css } from 'styled-components'; 

import Tooltip from '../Tooltip'; 

interface ContanierProps {
    isFocused: boolean; 
    isFilled: boolean; 
    isErrored: boolean; 
}

export const Contanier = styled.div<ContanierProps>`

    background: #FFFFFF; 
    border-radius: 10px; 
    padding: 16px; 
    width: 100%; 

    border: 2px solid #E5E5E5;
    color: #E5E5E5; 

    display: flex;
    align-items: center; 

    & + div {
            margin-top: 8px; 
    }

    ${ (props) => 
        props.isErrored && 
        css`
            border: 2px solid #c53030;
    `}

    ${ (props) => 
        props.isFocused && 
        css`
            border: 2px solid #6C63FF;
            color: #6C63FF; 
    `}
    
    ${ (props) => 
        props.isFilled && 
        css`
            color: #6C63FF; 
    `}

    input {

        flex: 1; 
        background: transparent; 
        border: 0; 
        color: #6C6C80;  

        &::placeholder {
            color: #E5E5E5; 
        }

    }
    
    svg {
            margin-right: 16px; 
    }

`;

export const Error = styled(Tooltip)`

    height: 20px; 
    margin-left: 16px; 
    
    svg {
        margin: 0px; 
    }

    span {
        background: #c53030;
        color: #fff; 

        &::before {
            border-color: #c53030 transparent; 
        }
    }
`;