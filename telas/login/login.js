import {Container, Texto, Imagem, Aviso, Cadastro, Capsula} from './style.js'
import ComponentInput from '../../componentes/input/input.js';
import { useState } from 'react';
import logo from "../../assets/logo.png"
import ComponentButton from '../../componentes/botao/botao.js';

export default function Login({navigation}) {
  
  const [user, setUser] = useState(null) 
  const [senha, setSenha] = useState(null) 
  
  return (
    <Container>
        <Imagem source={logo}/>
        <ComponentInput placeholder={"Digite seu username"} valor={user} setValor={setUser} secury={false}/>
        <ComponentInput placeholder={"Digite sua senha"} valor={senha} setValor={setSenha} secury={true}/>
        <ComponentButton texto="Entrar" onPress={() => {navigation.navigate("Ferramentas")}}/>
        <Capsula><Aviso>Ainda não possui um login? </Aviso><Cadastro onPress={() => {navigation.navigate("Cadastro")}}>Cadastre-se!</Cadastro></Capsula>

    </Container>
  );
}