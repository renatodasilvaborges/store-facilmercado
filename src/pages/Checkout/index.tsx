import React, { useCallback, useEffect, useState, useMemo } from 'react'; 
import { format } from 'date-fns';
import { useAuth } from '../../hooks/auth';
import api from '../../services/api';
import { useToast } from '../../hooks/toast';
import { useHistory, Link, useLocation } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import DayPicker, { DayModifiers } from 'react-day-picker'; 
import Button from '../../components/Button';

import { 
  Container,
  Content,
  Schedule,
  Section, 
  Product,
  Calendar,
  HourContent, 
  Hour
} from './styles'; 

  interface MonthAvailabilityItem {
    day: number;
    available: boolean; 
  }

  interface RouteParams {
    providerId: string;
    productId: string;
  }
  
  export interface Provider {
    id: string;
    name: string;
    avatar_url: string;
  }
  
  export interface Product {
    id: string;
    provider_id: string;
    name: string;
    price: Number;
    image: string;
    image_url: string;
    description: string;
  }
  
  interface AvailabilityItem {
    hour: number;
    available: boolean;
  }

  const Checkout: React.FC = () => {
    const location = useLocation(); 
    const providerId = location.search.replace('?provider=', '');
    const { addToast } = useToast(); 
    const history = useHistory(); 
    const [availability, setAvailability] = useState<AvailabilityItem[]>([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedHour, setSelectedHour] = useState(0);
    const [providers, setProviders] = useState<Provider[]>([]);
    const [selectedProvider, setSelectedProvider] = useState(providerId);
    const [products, setProducts] = useState<Product[]>([]);
    const [selectedProduct, setSelectedProducts] = useState();
    const [monthAvailability, setMonthAvailability] = useState<MonthAvailabilityItem[]>([]); 

    const { user } = useAuth();
  
    useEffect(() => {
        api.get(`/products/${selectedProvider}/available`).then(response =>{
            setProducts(response.data);
        });
    }, [selectedProvider]);
  
    useEffect(() => {
        api.get('/providers').then(response => {
          setProviders(response.data);
        });
      }, []);
    
    useEffect(() => {
        api
          .get(`/providers/${selectedProvider}/day-availability`, {
            params: {
              day: selectedDate.getDate(),
              month: selectedDate.getMonth() + 1,
              year: selectedDate.getFullYear(),
            },
          })
          .then(response => {
            setAvailability(response.data);
          });
      }, [selectedDate, selectedProvider]);
    
    const handleSelectProduct = useCallback((id) => {
      setSelectedProducts(id);
    }, []);
    
    const handleDateChange = useCallback((day: Date, modifiers: DayModifiers) => {
        if(modifiers.available && !modifiers.disable ) {
            setSelectedDate(day); 
            console.log(day);
        }
    }, []);
  
    const handleSelectHour = useCallback((hour: number) => {
      setSelectedHour(hour);
    }, []);
  
    const handleCreateAppointment = useCallback(async () => {
      try {
        const date = new Date(selectedDate);
        date.setHours(selectedHour);
        date.setMinutes(0);
  
        await api.post('/appointments', {
          provider_id: providerId,
          product_id: selectedProduct,
          date,
        });
  
        history.push('/dashboard');

        addToast({
            type: 'success',
            title: 'Pedido realizado com sucesso',
            description: 'E-mail enviado com os detalhes da transação',
        });

      } catch (err) {

        addToast({
            type: 'error',
            title: 'Erro ao finalizar pedido',
            description: 'Ocorreu algum problema na conclusão do pedido',
        });
      
    }
    }, [providerId, selectedProduct, selectedDate, selectedHour, history, addToast]);

    const morningAvailability = useMemo(() => {
      return availability
        .filter(({ hour }) => hour < 12)
        .map(({ hour, available }) => ({
          hour,
          hourFormatted: format(new Date().setHours(hour), 'HH:00'),
          available,
        }));
    }, [availability]);
  
    const afternoonAvailability = useMemo(() => {
      return availability
        .filter(({ hour }) => hour >= 12)
        .map(({ hour, available }) => ({
          hour,
          hourFormatted: format(new Date().setHours(hour), 'HH:00'),
          available,
        }));
    }, [availability]);
  
    return (
      <Container>

        <header>
          <div>
            <Link to="/dashboard">
              <FiArrowLeft size={32} />
            </Link>
          </div>
        </header>  

        <Content>
          <Schedule>
            <h1>1. Qual produto deseja ?</h1>
            <Section>
              {products?.length === 0 && (
                <p>Nenhum produto foi cadastrado ainda</p>
              )}

              {products?.map(product => (
                <Product 
                  key={product.id}
                  onClick={() => handleSelectProduct(product.id)}    
                  isFocused={product.id === selectedProduct}
                >
                  <span>
                    R$ 
                    {product.price}
                  </span>
                  
                  <div>
                    <img
                      src={
                        product.image_url || 
                        'https://facilmercado.s3.us-east-2.amazonaws.com/150.png'}
                      alt={product.name}
                    />
                    <strong>{product.name}</strong>
                  </div>
                </Product>
              ))}
            </Section>

            <h1>2. Qual data deseja pegar ? </h1>
            <Section>
              <span>{handleDateChange}</span>
              <Calendar>
                  <DayPicker
                    weekdaysShort={['D', 'S', 'T', 'Q', 'Q', 'S', 'S']}
                    fromMonth={new Date()}
                    disabledDays={[{ daysOfWeek: [0, 7]}]}
                    modifiers={{
                      available: { daysOfWeek: [1, 2, 3, 4, 5, 6]}
                    }}
                    selectedDays={selectedDate}
                    onDayClick={ handleDateChange }
                    months={
                            [
                              'Janeiro',
                              'Fevereiro',
                              'Março',
                              'Abril',
                              'Maio',
                              'Junho',
                              'Julho',
                              'Agosto',
                              'Setembro',
                              'Outubro',
                              'Novembro',
                              'Dezembro',
                            ]
                          }
                  />
              </Calendar>
            </Section>

            <h1>3. Qual horário ? </h1>
            <Section>
              <strong>Manhã</strong>
              <HourContent>
              {morningAvailability.map(
                ({ hour, hourFormatted }) => (
                  <Hour
                    onClick={() => handleSelectHour(hour)}
                    isFocused={hour === selectedHour}
                    key={hourFormatted}
                  >
                    <span>
                      {hourFormatted}
                    </span>
                  </Hour>
                ),
              )}
              </HourContent>
            </Section>

            <Section>
              <strong>Tarde</strong>
              <HourContent>
              {afternoonAvailability.map(
                ({ hour, hourFormatted }) => (
                  <Hour
                    onClick={() => handleSelectHour(hour)}
                    isFocused={hour === selectedHour}
                    key={hourFormatted}
                  >
                    <span>
                      {hourFormatted}
                    </span>
                  </Hour>
                ),
              )}
              </HourContent>
            </Section>

            <Button onClick={handleCreateAppointment}>Comprar</Button>
          
          </Schedule>  
        </Content>
      </Container>
    );  

};

export default Checkout;