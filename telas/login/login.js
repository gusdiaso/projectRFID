import {Container, Imagem, Aviso, Cadastro, Capsula} from './style.js'
import ComponentInput from '../../componentes/input/input.js';
import { useEffect, useState } from 'react';
import logo from "../../assets/logo.png"
import ComponentButton from '../../componentes/botao/botao.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

export default function Login({navigation}) {
  
  const [user, setUser] = useState("") 
  const [senha, setSenha] = useState("") 

  async function logar(username, password) {
    try {

      if(user && senha) {
        const existingData = await AsyncStorage.getItem('users');
        const users = existingData ? JSON.parse(existingData) : [];

        const user = users.find(
          (u) => u.username === username && u.password === password
        );
    
        if (user) {
          navigation.navigate("Ferramentas");
          return user;
        } else {
          Alert.alert(
            'Erro ao entrar',         
            'Nome de usuário ou senha inválidos!',   
            [
              {
                text: 'Cancelar',
                style: 'cancel',   
              },      
              { 
                text: 'OK',
              },
            ]
          );
          return null;
      }} else {
        Alert.alert(
          'Campo vazio',         
          'Você precisa preencher todos os campos!',   
          [
            {
              text: 'Cancelar',
              style: 'cancel',   
            },      
            { 
              text: 'OK',
            },
          ]
        );
      }
    } catch (error) {
      Alert.alert(
        'Algo deu errado',         
        'Tente novamente mais tarde!',   
        [
          {
            text: 'Cancelar',
            style: 'cancel',   
          },      
          { 
            text: 'OK',
          },
        ]
      );
    }
  }
  
  return (
    <Container>
        <Imagem source={logo}/>
        <ComponentInput placeholder={"Digite seu username"} valor={user} setValor={setUser} secury={false}/>
        <ComponentInput placeholder={"Digite sua senha"} valor={senha} setValor={setSenha} secury={true}/>
        <ComponentButton texto="Entrar" onPress={() => {
          // logar(user, senha);
          navigation.navigate("Ferramentas")
          }}/>
        <Capsula><Aviso>Ainda não possui um login? </Aviso><Cadastro onPress={() => {navigation.navigate("Cadastro")}}>Cadastre-se!</Cadastro></Capsula>

    </Container>
  );
}