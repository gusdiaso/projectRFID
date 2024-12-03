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

    // Função para definir a tag como "nenhuma" no servidor
    const setTagToNenhuma = async () => {
      try {
        const response = await fetch('https://new-turtle-civil.ngrok-free.app/dados', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ tag: 'nenhuma' }),
        });

        if (!response.ok){
          console.error('Erro ao definir a tag:', response.status);
        }
      } catch (error) {
        console.error('Erro ao comunicar com o servidor:', error);
      }
    };

    // Adiciona o listener para quando a tela for focada
    const focusListener = navigation.addListener('focus', () => {
      setTagToNenhuma(); // Define a tag como "nenhuma" sempre que a tela for exibida
    });

    // Limpa o listener quando o componente for desmontado
    return () => {
      focusListener();
    };

  }, [navigation]); // O efeito será executado sempre que a navegação mudar

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
      <ComponentButton texto={"Buscar Ferramentas"} onPress={() => {navigation.navigate("Busca de Ferramentas")}}/>
      <ComponentButton texto={"Manual da Ferramenta"} onPress={() => {navigation.navigate("Manual da Ferramenta")}}/>
      <ComponentButton texto={"Emprestar ou devolver Ferramenta"} onPress={() => {navigation.navigate("Emprestimo de Ferramenta")}}/>
      {
        user.cargo === "Administrador" && <ComponentButton texto={"Cadastrar Ferramenta"} onPress={() => {navigation.navigate("Cadastrar Ferramenta")}}/>
      }
      {
        user.cargo === "Administrador" && <ComponentButton texto={"Cadastrar Funcionario"} onPress={() => {navigation.navigate("Cadastrar Funcionario")}}/>
      }
      <BotaoExit onPress={logout}>
        <Textobutao>Sair da Conta</Textobutao>
      </BotaoExit>
    </Container>
  );
}
