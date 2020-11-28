import React, { ButtonHTMLAttributes } from 'react'; 
import { boolean } from 'yup';

import { Contanier } from './styles'; 

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    loading?: boolean; 
}; 

const Button: React.FC<ButtonProps> = ({ children, loading, ...rest}) => (
    <Contanier {...rest} > 
        {loading ? 'Carregando...': children }
    </Contanier>
);

export default Button; 