import React, { useState, useEffect, FormEvent } from 'react'; 
import 'react-day-picker/lib/style.css'; 

import { 
    Container, 
    Header, 
    HeaderContent,
    Profile, 
    Content, 
    Schedule, 
    Section,
    Provider, 
    Form,

} from './styles'; 

import logoImg from '../../assets/logo.svg'; 
import { FiClock, FiPower } from 'react-icons/fi';
import { useAuth } from '../../hooks/auth';
import api from '../../services/api';
import { Link } from 'react-router-dom';

export interface Provider {
    id: string;
    name: string;
    avatar: string;
  }

const Dashboard: React.FC = () => {
    const [providers, setProviders] = useState<Provider[]>([]);
    const [search, setSearch] = useState('');
    const { user, signOut } = useAuth();

    useEffect(() => {
        api.get('/providers').then(response => {
          setProviders(response.data);
          console.log(response.data); 
        });
    }, [search]);

    const filteredProviders = providers.filter(provider => {
        return provider.name.toLowerCase().includes(search.toLowerCase()); 
    });

    return (
        <Container>
            <Header>
                <HeaderContent>
                    
                    <img src={logoImg} alt="Go" />

                    <Profile>
                        <img 
                            src={user.avatar_url || 
                                'https://facilmercado.s3.us-east-2.amazonaws.com/150.png'
                            } 
                            alt={user.name} 
                        />
                        <div>
                            <span>Bem-vindo,</span>
                            <Link to="/profile"><strong>{user.name}</strong></Link>
                        </div>
                    </Profile>
                    
                    <button type="button" onClick={signOut} >
                        <FiPower />
                    </button>
                </HeaderContent>
            </Header>
            <Content>
                <Schedule>  
                    <h1>Lojas Disponíveis</h1>
                    <p>RS - Porto Alegre, Região Metropolitana</p>
                    <Form>
                        <input 
                            type="search"
                            placeholder="Digite o nome da loja que deseja buscar"
                            value={search}
                            onChange={(ev) => setSearch(ev.target.value)}
                        />
                    </Form>
                    <Section>
                        {filteredProviders?.map(provider => (
                            <Link to={`/checkout/?provider=${provider.id}`}>
                            <Provider key={provider.id}>
                                <span>
                                    <FiClock />
                                    Aberto
                                </span>
                                <div>
                                    <img 
                                        src={
                                            `https://facilmercado.s3.us-east-2.amazonaws.com/${provider.avatar}` ||
                                            'https://facilmercado.s3.us-east-2.amazonaws.com/150.png'
                                        } 
                                        alt={provider.name}
                                    />
                                    <strong>{provider.name}</strong>
                                </div>
                            </Provider>
                            </Link>
                        ))}
                    </Section>
                </Schedule>
            </Content>
        </Container>
    );
};
export default Dashboard; 