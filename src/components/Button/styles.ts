import styled from 'styled-components'; 
import { shade } from 'polished';

export const Contanier = styled.button`
    background: #6C63FF; 
    height: 56px; 
    border-radius: 10px; 
    border: 0; 
    padding: 0 16px; 
    color: #FFFFFF; 
    width: 100%;  
    font-weight: 500; 
    margin-top: 16px; 
    transition: background-color 0.2s; 

    &:hover {
        background: ${shade(0.2, '#6C63FF')};
    }
`;