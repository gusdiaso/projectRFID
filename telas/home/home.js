import {Container, Textobutao, BotaoExit} from './style.js'
import { useState, useEffect } from 'react';
import ComponentButton from '../../componentes/botao/botao.js'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

export default function Home({navigation}) {

  const [user, setUser] = useState([]);

  // Função assíncrona para recuperar o usuário do AsyncStorage
  useEffect(() => {
    const getLoggedUser = async () => {
      try {
        const loggedUser = await AsyncStorage.getItem('loggedUser');
        if (loggedUser) {
          setUser(JSON.parse(loggedUser)); // Atualiza o estado com o usuário
        }
      } catch (error) {
        console.error('Erro ao recuperar o usuário:', error);
      }
    };

    getLoggedUser();
  }, []); // Este efeito será executado uma vez após o componente ser montado

  const logout = async () => {
    try {
      // Limpa os dados do usuário armazenados no AsyncStorage
      await AsyncStorage.removeItem('loggedUser');
      Alert.alert(`Até logo, ${user.username}!`, 'Você foi desconectado com sucesso.');
      setUser([]);
      // Redireciona para a tela de login
      navigation.replace('Login'); // Certifique-se de que 'Login' seja o nome correto da rota de login
    } catch (error) {
      console.error('Erro ao deslogar:', error);
      Alert.alert('Erro!', 'Ocorreu um erro ao tentar deslogar.');
    }
  };

  return (
    <Container>
      <ComponentButton texto={"Buscar ferramentas"} onPress={() => {navigation.navigate("Busca de Ferramentas")}}/>
      <ComponentButton texto={"Manual da ferramenta"} onPress={() => {navigation.navigate("Manual da ferramenta")}}/>
      <ComponentButton texto={"Emprestar ou devolver ferramenta"} onPress={() => {navigation.navigate("Emprestimo de Ferramenta")}}/>
      {
        user.cargo === "Administrador" && <ComponentButton texto={"Cadastrar ferramenta"} onPress={() => {navigation.navigate("Cadastrar ferramenta")}}/>
      }
      <BotaoExit onPress={logout}>
        <Textobutao>Sair da Conta</Textobutao>
      </BotaoExit>
    </Container>
  );
}