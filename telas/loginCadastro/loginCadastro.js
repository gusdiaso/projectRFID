import {Container, Texto, Imagem, Aviso, Cadastro, Capsula} from './style.js'
import ComponentInput from '../../componentes/input/input.js';
import { useState } from 'react';
import logo from "../../assets/logo.png"
import ComponentButton from '../../componentes/botao/botao.js';

export default function LoginCadastro({navigation}) {
  
  const [newuser, setNewuser] = useState(null) 
  const [newsenha, setNewenha] = useState(null) 
  const [confirmasenha, setConfirmasenha] = useState(null) 

  
  return (
    <Container>
        <Imagem source={logo}/>
        <ComponentInput placeholder={"Crie seu username"} valor={newuser} setValor={setNewuser} secury={false}/>
        <ComponentInput placeholder={"Crie sua senha"} valor={newsenha} setValor={setNewenha} secury={true}/>
        <ComponentInput placeholder={"Repita sua senha"} valor={confirmasenha} setValor={setConfirmasenha} secury={true}/>
        <ComponentButton texto="Cadastrar" onPress={()=>{}}/>
        <Capsula><Aviso>Já possui um login? </Aviso><Cadastro onPress={() => {navigation.navigate("Login")}}>Logar!</Cadastro></Capsula>

    </Container>
  );
}