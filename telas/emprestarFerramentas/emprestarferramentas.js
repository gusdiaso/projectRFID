import {Container, Capsula, Texto, Textocapa, Info, Capa, Englobador} from './style.js';
import { useState, useEffect } from 'react';
import ComponentButton from '../../componentes/botao/botao.js'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native'; // Importando o Alert
import axios from 'axios'; // Para fazer as requisições HTTP

export default function EmprestarFerramenta({ navigation }) {
  const [user, setUser] = useState([]);
  const [tools, setTools] = useState([]); 
  const [tool, setTool] = useState([]); 
  const [isAvaliado, setIsAvaliado] = useState(false);
  const [tag, setTag] = useState('nenhuma'); // Inicializa com "nenhuma"

  useEffect(() => {
    const resetTag = async () => {
      try {
        // Define a tag como "nenhuma" antes de qualquer outra operação
        await axios.post('https://new-turtle-civil.ngrok-free.app/dados', { tag: 'nenhuma' });
  
        // Agora, faça o resto da lógica normalmente
        const loggedUser = await AsyncStorage.getItem('loggedUser');
        if (loggedUser) {
          setUser(JSON.parse(loggedUser)); // Atualiza o estado com o usuário
        }
  
        const fetchData = async () => {
          const existingData = await AsyncStorage.getItem('tools');
          const tools = existingData ? JSON.parse(existingData) : [];
          setTools(tools);
        };
        fetchData(); // Chama o fetchData dentro do useEffect
      } catch (error) {
        console.error('Erro ao redefinir a tag:', error);
      }
    };
  
    resetTag(); // Chama a função que redefine a tag para "nenhuma"
  }, []); // Este useEffect será executado apenas uma vez ao montar o componente
  
  useEffect(() => {
    // Função que verifica a tag a cada 1 segundo
    const interval = setInterval(async () => {
      try {
        const response = await axios.get('https://new-turtle-civil.ngrok-free.app');
        const newTag = response.data.tag || 'nenhuma';
        setTag(newTag); // Atualiza a tag
  
        if (newTag !== 'nenhuma' && !isAvaliado) {
          // A tag mudou para algo válido, então realiza a análise
          setIsAvaliado(true);
          const tool = tools.find(t => t.id === newTag); // Procurando a ferramenta pelo ID
          if (tool) {
            setTool(tool);
          }
        }
      } catch (error) {
        console.error('Erro ao verificar a tag:', error);
      }
    }, 1000); // A cada 1 segundo
  
    // Limpa o intervalo quando o componente for desmontado
    return () => clearInterval(interval);
  }, [tools, isAvaliado]);
  

  const handlePegarFerramenta = async () => {
    if (!tool.cargos_permissao.includes(user.cargo)) {
      Alert.alert(
        'Acesso Negado',
        `Seu cargo (${user.cargo}) não tem permissão para pegar a ferramenta ${tool.nome}.`,
        [{ text: 'OK' }]
      );
      navigation.navigate("Home");
      return;
    }

    const updatedTool = { ...tool, status: user.username }; 
    const updatedTools = tools.map(t => (t.id === tool.id ? updatedTool : t));

    await AsyncStorage.setItem('tools', JSON.stringify(updatedTools));

    setTools(updatedTools); 
    setTool(updatedTool); 
    setIsAvaliado(false);

    // Define a tag como "nenhuma" novamente após a operação
    await axios.post('https://new-turtle-civil.ngrok-free.app/dados', { tag: 'nenhuma' });

    Alert.alert(
      'Ferramenta Emprestada',
      `Você pegou a ferramenta ${tool.nome}. A ferramenta agora está na posse de ${user.username}`,
      [{ text: 'OK' }]
    );
    navigation.navigate("Home");
  };

  const handleDevolverFerramenta = async () => {
    const updatedTool = { ...tool, status: 'disponível' }; 
    const updatedTools = tools.map(t => (t.id === tool.id ? updatedTool : t));

    await AsyncStorage.setItem('tools', JSON.stringify(updatedTools));

    setTools(updatedTools); 
    setTool(updatedTool); 
    setIsAvaliado(false);

    // Define a tag como "nenhuma" novamente após a operação
    await axios.post('https://new-turtle-civil.ngrok-free.app/dados', { tag: 'nenhuma' });

    Alert.alert(
      'Ferramenta Devolvida',
      `Você devolveu a ferramenta ${tool.nome}. A ferramenta agora está disponível.`,
      [{ text: 'OK' }]
    );
    navigation.navigate("Home");
  };

  return (
    <Container>
      {!isAvaliado &&<Texto>Por favor, aproxime a ferramenta para a avaliação automática.</Texto>}

      {tool.status === "disponível" && isAvaliado && (
        <Capa>
        <Englobador>    
        <Capsula>
          <Textocapa>Ferramenta {tool.nome} está DISPONÍVEL.</Textocapa>
        </Capsula>

      
          <Capsula>
            <Textocapa>Manutenção:</Textocapa>
            <Info>Ultima manutenção: {tool.manutencao.ultima_manutencao}</Info>
            <Info>Periodicidade de manutenção: {tool.manutencao.periodicidade}</Info>
          </Capsula>
        </Englobador>

        <ComponentButton texto={"Pegar Ferramenta"} onPress={handlePegarFerramenta} />
      </Capa>
      )}

      {tool.status !== "disponível" && isAvaliado && (
        <Capa>
          <Englobador>    
          <Capsula>
            <Textocapa>Ferramenta {tool.nome} está indisponível, no momento ela está com {tool.status}.</Textocapa>
          </Capsula>

         
            <Capsula>
              <Textocapa>Manutenção:</Textocapa>
              <Info>Ultima manutenção: {tool.manutencao.ultima_manutencao}</Info>
              <Info>Periodicidade de manutenção: {tool.manutencao.periodicidade}</Info>
            </Capsula>
          </Englobador>

          {tool.status === user.username && <ComponentButton texto={"Devolver Ferramenta"} onPress={handleDevolverFerramenta} />}
          {tool.status !== user.username && 
          <Texto>Desculpe {user.username}! Mas apenas o {tool.status} pode devolver a ferramenta.</Texto>}
        </Capa>
      )}
    </Container>
  );
}
