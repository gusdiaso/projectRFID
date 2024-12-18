import { Container, Texto } from './style.js';
import { useState, useCallback, useRef } from 'react';
import * as Linking from 'expo-linking';
import { Alert, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';

export default function ManualFerramenta({ navigation }) {
  const [tag, setTag] = useState('nenhuma');
  const [isProcessing, setIsProcessing] = useState(false); // Flag para evitar múltiplas execuções
  const intervalRef = useRef(null); // Referência para o intervalo

  // Função para pegar a tag do servidor
  const fetchTag = async () => {
    if (isProcessing) return; // Evita chamadas simultâneas

    setIsProcessing(true); // Marca como processamento iniciado

    try {
      const response = await axios.get('https://new-turtle-civil.ngrok-free.app');
      const tagFromServer = response.data.tag;

      if (!tagFromServer) {
        return;
      }

      setTag(tagFromServer);

      // Se a tag for diferente de "nenhuma", abre o link do manual
      if (tagFromServer !== 'nenhuma') {
        openLink(tagFromServer);
      }
    } catch (error) {
      Alert.alert('Erro', 'Ocorreu um problema ao buscar a tag do servidor.');
    } finally {
      setIsProcessing(false); // Libera após o processamento
    }
  };

  // Função para resolver a URL final com axios (seguindo redirecionamentos)
  const resolveFinalUrl = async (url) => {
    try {
      const response = await axios.get(url, { maxRedirects: 5 });
      return response.request.responseURL || url;
    } catch (error) {
      return url;
    }
  };
  
  const openLink = async (id) => {
    const tools = await AsyncStorage.getItem('tools');
    const toolsArray = tools ? JSON.parse(tools) : [];
    const tool = toolsArray.find(item => item.id === id);

    if (tool && tool.manual) {
      let url = tool.manual;

      // Resolver URL final
      url = await resolveFinalUrl(url);

      // Decodificar URL
      const decodedUrl = decodeURIComponent(url);

      const supported = await Linking.canOpenURL(decodedUrl);
      console.log(`URL Final Decodificada: ${decodedUrl}, Suporte: ${supported}`);

      if (supported) {
        await Linking.openURL(decodedUrl);
      } else {
        Alert.alert('Erro', `Não foi possível abrir o link: ${decodedUrl}`);
      }
    } else {
      Alert.alert('Erro', 'ID da ferramenta não encontrado ou sem manual associado.');
    }

    // Após abrir o manual, setamos a tag como "nenhuma" novamente
    await axios.post('https://new-turtle-civil.ngrok-free.app/dados', { tag: 'nenhuma' });

    navigation.navigate("Home");
  };

  // Usando useFocusEffect para garantir que a requisição seja feita apenas quando a tela estiver em foco
  useFocusEffect(
    useCallback(() => {
      // Start the interval when the screen is in focus
      intervalRef.current = setInterval(fetchTag, 1000); // Verifica a tag a cada 1 segundo

      return () => {
        // Clear the interval when the screen loses focus
        clearInterval(intervalRef.current);
      };
    }, []) // A dependência vazia garante que o efeito será executado apenas uma vez ao entrar na tela
  );

  return (
    <Container>
      <ActivityIndicator size="large" color="#000" style={{transform: [{scale:1}]}}/>
      <Texto>Aproxime a ferramenta do leitor para consultar o manual automaticamente ...</Texto>
    </Container>
  );
}
