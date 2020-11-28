import React from 'react'; 
import { FiLogIn } from 'react-icons/fi'; 
import { Link } from 'react-router-dom'; 

import logo from '../../assets/logo.svg'; 
import './styles.css'; 

const Home = () => {
    return (
        <div id="page-home">
            <div className="content">
                
                <header>
                    <img src={logo} alt="Ecoleta" />
                </header>

                <main>
                    <h1> Ajude os comércios locais do seu bairro  </h1>
                    <p> Ajudamos os lojistas conectando com pessoas próximas do seu estabelecimento.  </p>

                    <Link to="/signin">
                        <span>
                            <FiLogIn />
                        </span>
                        <strong>Compre agora</strong>
                    </Link>

                </main>
            </div>
        </div>
    )
}


export default Home; 