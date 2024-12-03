import { Container, Imagem, Aviso, Cadastro, Capsula } from './style.js';
import ComponentInput from '../../componentes/input/input.js';
import { useState } from 'react';
import logo from "../../assets/logo.png";
import ComponentButton from '../../componentes/botao/botao.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

export default function Login({ navigation }) {
  const [user, setUser] = useState("");
  const [senha, setSenha] = useState("");

  async function logar(username, password) {
    try {
      if (user && senha) {
        // Recupera os dados dos usuários armazenados
        const existingData = await AsyncStorage.getItem('users');
        const users = existingData ? JSON.parse(existingData) : [];

        // Procura o usuário que corresponde ao username e password
        const foundUser = users.find((u) => u.username === username && u.password === password);

        if (foundUser) {
          // Armazenar o usuário logado no AsyncStorage
          await AsyncStorage.setItem('loggedUser', JSON.stringify(foundUser));
          

          // Navegar para a tela "Ferramentas"
          navigation.navigate("Home");
        } else {
          // Exibe um alerta caso o usuário não seja encontrado
          Alert.alert(
            'Erro ao entrar',
            'Nome de usuário ou senha inválidos!',
            [
              { text: 'Cancelar', style: 'cancel' },
              { text: 'OK' },
            ]
          );
        }
      } else {
        // Alerta caso algum campo esteja vazio
        Alert.alert(
          'Campo vazio',
          'Você precisa preencher todos os campos!',
          [
            { text: 'Cancelar', style: 'cancel' },
            { text: 'OK' },
          ]
        );
      }
    } catch (error) {
      // Alerta em caso de erro no processo
      Alert.alert(
        'Algo deu errado',
        'Tente novamente mais tarde!',
        [
          { text: 'Cancelar', style: 'cancel' },
          { text: 'OK' },
        ]
      );
      console.error('Erro ao realizar login:', error);
    }
  }

  return (
    <Container>
      <Imagem source={logo} />
      <ComponentInput
        placeholder={"Digite seu username"}
        valor={user}
        setValor={setUser}
        secury={false}
      />
      <ComponentInput
        placeholder={"Digite sua senha"}
        valor={senha}
        setValor={setSenha}
        secury={true}
      />
      <ComponentButton
        texto="Entrar"
        onPress={() => logar(user, senha)}
      />
    </Container>
  );
}
