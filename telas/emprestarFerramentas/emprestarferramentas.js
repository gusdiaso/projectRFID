import { Container, Capsula, Texto, Textocapa, Info, Capa, Englobador } from './style.js';
import { useState, useEffect } from 'react';
import ComponentButton from '../../componentes/botao/botao.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert, ActivityIndicator } from 'react-native'; // Importando o Alert
import axios from 'axios'; // Para fazer as requisições HTTP

export default function EmprestarFerramenta({ navigation }) {
  const [user, setUser] = useState([]);
  const [tools, setTools] = useState([]);
  const [tool, setTool] = useState(null); // Inicializa como null
  const [isAvaliado, setIsAvaliado] = useState(false);
  const [tag, setTag] = useState('nenhuma'); // Inicializa com "nenhuma"

  useEffect(() => {
    const resetTag = async () => {
      try {
        await axios.post('https://new-turtle-civil.ngrok-free.app/dados', { tag: 'nenhuma' });

        const loggedUser = await AsyncStorage.getItem('loggedUser');
        if (loggedUser) {
          setUser(JSON.parse(loggedUser)); // Atualiza o estado com o usuário
        }

        const fetchData = async () => {
          const existingData = await AsyncStorage.getItem('tools');
          const tools = existingData ? JSON.parse(existingData) : [];
          setTools(tools);
        };
        fetchData();
      } catch (error) {
        console.error('Erro ao redefinir a tag:', error);
      }
    };

    resetTag(); // Chama a função que redefine a tag para "nenhuma"
  }, []);

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const response = await axios.get('https://new-turtle-civil.ngrok-free.app');
        const newTag = response.data.tag || 'nenhuma';
        setTag(newTag);

        if (newTag !== 'nenhuma' && !isAvaliado) {
          setIsAvaliado(true);
          const foundTool = tools.find(t => t.id === newTag); // Procurando a ferramenta pelo ID
          if (foundTool) {
            setTool(foundTool);
          } else {
            setTool(null); // Define como null explicitamente
            Alert.alert(
              'Ferramenta não cadastrada',
              `Desculpe, mas a Tag aproximada não possui nenhuma ferramenta associada.`,
              [{ text: 'OK' }]
            );
            navigation.navigate("Home");
          }
        }
      } catch (error) {
        console.error('Erro ao verificar a tag:', error);
      }
    }, 1000); // A cada 1 segundo

    return () => clearInterval(interval);
  }, [tools, isAvaliado]);

  const handlePegarFerramenta = async () => {
    if (!tool?.cargos_permissao?.includes(user.cargo)) {
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
      {!isAvaliado && (
        <Capsula>
          <ActivityIndicator size="large" color="#000" style={{ transform: [{ scale: 1 }] }} />
          <Texto>Aproxime a ferramenta do leitor para a avaliação automática ...</Texto>
        </Capsula>
      )}

      {tool?.status === "disponível" && isAvaliado && (
        <Capa>
          <Englobador>
            <Capsula>
              <Textocapa>Ferramenta {tool.nome} está DISPONÍVEL.</Textocapa>
            </Capsula>
            <Capsula>
              <Textocapa>Manutenção:</Textocapa>
              <Info>Última manutenção: {tool?.manutencao?.ultima_manutencao || "Não disponível"}</Info>
              <Info>Periodicidade de manutenção: {tool?.manutencao?.periodicidade || "Não disponível"}</Info>
            </Capsula>
          </Englobador>
          <ComponentButton texto={"Pegar Ferramenta"} onPress={handlePegarFerramenta} />
        </Capa>
      )}

      {tool?.status !== "disponível" && isAvaliado && (
        <Capa>
          <Englobador>
            <Capsula>
              <Textocapa>Ferramenta {tool?.nome || "Sem Registro"} está indisponível no momento, pois ela está com {tool?.status}.</Textocapa>
            </Capsula>
            <Capsula>
              <Textocapa>Manutenção:</Textocapa>
              <Info>Última manutenção: {tool?.manutencao?.ultima_manutencao || "Sem Registro"}</Info>
              <Info>Periodicidade de manutenção: {tool?.manutencao?.periodicidade || "Sem Registro"}</Info>
            </Capsula>
          </Englobador>
          {tool?.status === user.username && <ComponentButton texto={"Devolver Ferramenta"} onPress={handleDevolverFerramenta} />}
          {tool?.status !== user.username && (
            <Texto>Desculpe {user.username}, mas apenas o {tool?.status} pode devolver a ferramenta.</Texto>
          )}
        </Capa>
      )}
    </Container>
  );
}
