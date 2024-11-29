import {Container, Capsula, Texto} from './style.js'
import { useState, useEffect} from 'react';
import ComponentButton from '../../componentes/botao/botao.js'; 
import ComponentInput from '../../componentes/input/input.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native'; // Importando o Alert

export default function Emprestar({navigation}) {
  const [user, setUser] = useState([]);
  const [id, setId] = useState('');
  const [tools, setTools ] = useState([]); 
  const [tool, setTool ] = useState([]);  // Estado para armazenar todas as ferramentas
  const [isAvaliado, setIsAvaliado] = useState(false);
  

  useEffect(() => {
    const getLoggedUser = async () => {
      try {
        const loggedUser = await AsyncStorage.getItem('loggedUser');
        if (loggedUser) {
          setUser(JSON.parse(loggedUser)); // Atualiza o estado com o usuário
        }

        const fetchData = async () => {
          const existingData = await AsyncStorage.getItem('tools');
          const tools = existingData ? JSON.parse(existingData) : [];
          setTools(tools);
        };
        fetchData(); // Aqui estava faltando chamar o fetchData dentro de useEffect
      } catch (error) {
        console.error('Erro ao recuperar o usuário:', error);
      }
    };

    getLoggedUser();
  }, []); 

  const handleCheckStatus = () => {
    const tool = tools.find(t => t.id === id); // Procurando ferramenta pelo ID
    if (tool) {
      setIsAvaliado(true);
      setTool(tool);
    } 
  };

  const handlePegarFerramenta = async () => {
    const updatedTool = { ...tool, status: user.username }; // Atualizando o status da ferramenta para o nome do usuário
    const updatedTools = tools.map(t => (t.id === id ? updatedTool : t));
    
    // Atualiza as ferramentas no AsyncStorage
    await AsyncStorage.setItem('tools', JSON.stringify(updatedTools));
    
    setTools(updatedTools); // Atualiza o estado local
    setTool(updatedTool); // Atualiza a ferramenta exibida
    setIsAvaliado(false);
    setId('')
    // Exibe o alerta de sucesso
    Alert.alert(
      'Ferramenta Emprestada',
      `Você pegou a ferramenta ${tool.nome}. A ferramenta agora está na posse de ${user.username}`,
      [{ text: 'OK' }]
    );
  };

  const handleDevolverFerramenta = async () => {
    const updatedTool = { ...tool, status: 'disponível' }; // Alterando o status de volta para "disponível"
    const updatedTools = tools.map(t => (t.id === id ? updatedTool : t));
    
    // Atualiza as ferramentas no AsyncStorage
    await AsyncStorage.setItem('tools', JSON.stringify(updatedTools));
    
    setTools(updatedTools); // Atualiza o estado local
    setTool(updatedTool); // Atualiza a ferramenta exibida
    setIsAvaliado(false);
    setId('')
    // Exibe o alerta de sucesso
    Alert.alert(
      'Ferramenta Devolvida',
      `Você devolveu a ferramenta ${tool.nome}. A ferramenta agora está disponível.`,
      [{ text: 'OK' }]
    );
  };

  return (
    <Container>
      <Texto>Digite o ID da ferramenta que quer emprestado ou que deseja devolver:</Texto>
      <Capsula>
        <ComponentInput placeholder={"Digite o ID da ferramenta"} secury={false} valor={id} setValor={setId} />
        <ComponentButton texto={"Analisar Ferramenta"} onPress={handleCheckStatus} />
      </Capsula>
      {
        isAvaliado &&
        <Capsula>
          <Texto>A ferramenta está {tool.status !== "disponível" && "na posse de "}{tool.status}</Texto>
        </Capsula>
      }

      {
        tool.status === "disponível" && isAvaliado &&
        <Capsula>
          <Texto>Clique para pegar a ferramenta</Texto>
          <ComponentButton texto={"Pegar Ferramenta"} onPress={handlePegarFerramenta} />
        </Capsula>
      }
      {
        tool.status !== "disponível" && isAvaliado &&
        <Capsula>
          <Texto>Clique para devolver a ferramenta</Texto>
          <ComponentButton texto={"Devolver Ferramenta"} onPress={handleDevolverFerramenta} />
        </Capsula>
      }
    </Container>
  );
}
