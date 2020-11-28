import React, { useCallback, useRef } from 'react'; 
import { FiArrowLeft , FiMail, FiUser, FiLock } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup'; 
import getValidationErros from '../../utils/getValidationErros'; 
import { Link, useHistory } from 'react-router-dom'; 
import api from '../../services/api'; 

import { useToast } from '../../hooks/toast'; 

import logoImg from '../../assets/logo.svg'; 
import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content, AnimationContainer, Background } from './styles'; 

interface SignUpFormData {
    name: string;
    email: string;
    password: string;
}

const SignUp: React.FC = () => {
    const formRef = useRef<FormHandles>(null); 
    const { addToast } = useToast(); 
    const history = useHistory(); 

    const handleSubmit = useCallback(async (data: SignUpFormData) => {
        try {
            formRef.current?.setErrors({});
            
            const schema = Yup.object().shape({
                name: Yup.string()
                    .required('Nome obrigatório'),
                email: Yup.string()
                    .required('Email obrigatório')
                    .email('Digite um e-mail válido'),
                password: Yup.string()
                    .min(6, 'No mínimo 6 dígitos'),
            });

            await schema.validate(data, {
                abortEarly: false, 
            }); 

            await api.post('/users', data); 

            history.push('/signin'); 

            addToast({
                type: 'success',
                title: 'Cadastro realizado com sucesso!',
                description: 'Você já pode fazer o seu logon no Facil Mercado!',
            });

        } catch (err) {

            if(err instanceof Yup.ValidationError) {
                const errors = getValidationErros(err); 
                formRef.current?.setErrors(errors);
                return; 
            }   

            addToast({
                type: 'error', 
                title: 'Erro no Cadastro', 
                description: 'Ocorreu um erro ao fazer o cadastro, tente novamente', 
            }); 

        }
    }, [addToast, history]); 

    return (
        <Container>
            <Background />
            <Content>
                <AnimationContainer>
                    <img src={logoImg} alt="FacilMercado" />

                    <Form ref={formRef} onSubmit={handleSubmit}>
                        <h1>Faça o seu Cadastro </h1>
                        <Input name="name" icon={FiUser} placeholder="Seu nome" />
                        <Input name="email" icon={FiMail} placeholder="Seu e-mail" />
                        <Input 
                            name="password" 
                            icon={FiLock} 
                            type="password"
                            placeholder="Sua senha"
                        />

                        <Button type="submit">Fazer Parte</Button>
                    </Form>

                    <Link to="/signin">
                        <FiArrowLeft />
                        Voltar
                    </Link>
                </AnimationContainer>
            </Content>
    </Container>
    );
}
export default SignUp;