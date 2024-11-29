import {Container} from './style.js'
import { useState, useEffect } from 'react';
import ComponentButton from '../../componentes/botao/botao.js'; 
import AsyncStorage from '@react-native-async-storage/async-storage';

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


  return (
    <Container>
      <ComponentButton texto={"Buscar ferramentas"} onPress={() => {navigation.navigate("Busca de Ferramentas")}}/>
      <ComponentButton texto={"Manual da ferramenta"} onPress={() => {navigation.navigate("Manual da ferramenta")}}/>
      <ComponentButton texto={"Emprestar ou devolver ferramenta"} onPress={() => {navigation.navigate("Emprestimo de Ferramenta")}}/>
      {
        user.cargo === "Administrador" && <ComponentButton texto={"Cadastrar ferramenta"} onPress={() => {navigation.navigate("Cadastrar ferramenta")}}/>
      }
     
    </Container>
  );
}