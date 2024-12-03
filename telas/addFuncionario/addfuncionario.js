import {Container, Title} from './style.js';
import ComponentInput from '../../componentes/input/input.js';
import { useState } from 'react';
import ComponentButton from '../../componentes/botao/botao.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

export default function AddFuncionario({navigation}) {
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
      navigation.navigate("Cadastrar Funcionario");
      Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao realizar o cadastro.');
    }
  };

  return (
    <Container>
      <Title>Preencha as informaçoes:</Title>
      <ComponentInput placeholder={"Digite o username do funcionario"} valor={username} setValor={setUsername} secury={false} />
      <ComponentInput placeholder={"Digite o email do funcionario"} valor={email} setValor={setEmail} secury={false} />
      <ComponentInput placeholder={"Digite o cargo do funcionario"} valor={cargo} setValor={setCargo} secury={false} />
      <ComponentInput placeholder={"Crie a senha do funcionario"} valor={password} setValor={setPassword} secury={true} />

      <ComponentButton texto="Adicionar Funcionario" onPress={() => {registrarUser();}} />

    </Container>
  );
}
