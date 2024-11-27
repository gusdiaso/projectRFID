import {Container, Imagem, Aviso, Cadastro, Capsula} from './style.js';
import ComponentInput from '../../componentes/input/input.js';
import { useState } from 'react';
import logo from "../../assets/logo.png";
import ComponentButton from '../../componentes/botao/botao.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

export default function LoginCadastro({navigation}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [cargo, setCargo] = useState('');

  async function registrarUser(){
    try {
      // Pega os usuários já armazenados
      const existingData = await AsyncStorage.getItem('users');
      const users = existingData ? JSON.parse(existingData) : [];

      // Valida os campos
      if (!username || !password || !email || !cargo) {
        Alert.alert('Erro', 'Preencha todos os campos!');
        return;
      }

      // Verifica se o usuário ou e-mail já existe
      const userExists = users.some(user => user.username === username || user.email === email);
      if (userExists) {
        Alert.alert('Erro', 'Usuário ou e-mail já cadastrados!');
        return;
      }

      // Adiciona um novo usuário
      const newUser = {
        id: users.length + 1, // Simples incremento
        username,
        password,
        email,
        cargo,
      };

      // Atualiza a lista de usuários e salva no AsyncStorage
      users.push(newUser);
      await AsyncStorage.setItem('users', JSON.stringify(users));
      navigation.navigate("Login");
      Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao realizar o cadastro.');
    }
  };

  return (
    <Container>
      <Imagem source={logo} />
      
      <ComponentInput placeholder={"Crie seu username"} valor={username} setValor={setUsername} secury={false} />
      <ComponentInput placeholder={"Digite seu email"} valor={email} setValor={setEmail} secury={false} />
      <ComponentInput placeholder={"Digite seu cargo"} valor={cargo} setValor={setCargo} secury={false} />
      <ComponentInput placeholder={"Crie sua senha"} valor={password} setValor={setPassword} secury={true} />

      <ComponentButton texto="Cadastrar" onPress={() => {registrarUser();}} />

      <Capsula>
        <Aviso>Já possui um login? </Aviso>
        <Cadastro onPress={() => { navigation.navigate("Login"); }}>Logar!</Cadastro>
      </Capsula>
    </Container>
  );
}
