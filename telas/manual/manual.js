import {Container, Texto, Input} from './style.js';
import { useState } from 'react';
import ComponentButton from '../../componentes/botao/botao.js';
import ComponentInput from '../../componentes/input/input.js';
import * as Linking from 'expo-linking'; // Use esta importação ao trabalhar com Expo
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Adiciona o AsyncStorage

export default function Manual({navigation}) {
  const [tag, setTag] = useState(null);

  const openLink = async (id) => {
    try {
      // Recupera o item do AsyncStorage pelo ID
      const tools = await AsyncStorage.getItem('tools'); // Supondo que você tenha armazenado todos os itens com a chave 'tools'
      const toolsArray = tools ? JSON.parse(tools) : [];

      // Encontra o item pelo ID
      const tool = toolsArray.find(item => item.id === id);

      if (tool && tool.manual) {
        const url = tool.manual; // Recupera o link do manual
        const supported = await Linking.canOpenURL(url);

        if (supported) {
          await Linking.openURL(url); // Abre o link no navegador
        } else {
          Alert.alert('Erro', `Não foi possível abrir o link: ${url}`);
        }
      } else {
        Alert.alert('Erro', 'ID da ferramenta não encontrado ou sem manual associado.');
      }
    } catch (error) {
      console.error('Erro ao abrir o link:', error);
      Alert.alert('Erro', 'Ocorreu um problema ao tentar abrir o link.');
    }
  };

  return (
    <Container>
      <ComponentInput
        placeholder={'Digite o ID da ferramenta'}
        secury={false}
        valor={tag}
        setValor={setTag}
      />
      <ComponentButton 
        texto={'Consultar Manual'} 
        onPress={() => openLink(tag)} // Passa o ID digitado para a função openLink
      />
    </Container>
  );
}
