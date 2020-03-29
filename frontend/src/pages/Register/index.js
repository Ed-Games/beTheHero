import React, {useState}  from 'react';
import logoImg from '../../assets/logo.svg';
import {Link,useHistory} from 'react-router-dom';
import {FiArrowLeftCircle} from "react-icons/fi";

import api from '../../services/api';

import './styles.css';

export default function Register(){
    const [name, SetName] = useState('');
    const [email, SetEmail] = useState('');
    const [whatsapp, SetWhatsapp] = useState('');
    const [city, SetCity] = useState('');
    const [uf, SetUf] = useState('');

    const history = useHistory();

    async function handleRegister(e){
        e.preventDefault();

        const data ={ 
            name,
            email,
            whatsapp,
            city,
            uf
        };

        try{

       const response = await  api.post('ongs',data);

       alert(`Seu ID de acesso:${response.data.id}`);
        history.push('/');
      } catch(err){
          alert('Erro no cadastro, por favor tente novamente');
      }

};
    return(
       <div className="register-container">
           <div  className="content1">
               <section>
                    <img src={logoImg} alt="Be The Hero"/>
                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontraram os casos de sua ONG</p>
                    <Link className="back-link" to="/" color="E02041">
                            <FiArrowLeftCircle size={16} color="E02041"/>
                            Voutar para o logon
                        </Link>
               </section>
               <form onSubmit={handleRegister}>
                    <input placeholder="Nome da ONG"
                    value ={name}
                    onChange={e => SetName(e.target.value)}/>
                    <input type="email" placeholder="E-mail"
                    value ={email}
                    onChange={e => SetEmail(e.target.value)}/>
                    <input placeholder="Whatsapp"
                    value ={whatsapp}
                    onChange={e => SetWhatsapp(e.target.value)}/>

                    <div className="input-group">
                    <input placeholder="Cidade"
                    value ={city}
                    onChange={e => SetCity(e.target.value)}/>
                    <input placeholder="UF" style={{width: 80}} 
                    value ={uf}
                    onChange={e => SetUf(e.target.value)}/>
                    </div>

                    <button className="button" type="submit">Cadastrar</button>

               </form>
           </div>
       </div>
    );
}