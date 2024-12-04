import { Container, Capsula, BotaoRemover, BotaoAdd, Textobutao, Texto } from './style.js';
import { useState } from 'react';
import ComponentInput from '../../componentes/input/input.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import ComponentButton from '../../componentes/botao/botao.js';

export default function RemoveFerramentas({ navigation }) {

  const [idToRemove, setIdToRemove] = useState('');

  const removerFerramenta = async () => {
    if (!idToRemove.trim()) {
      Alert.alert('Ops!','Por favor, insira o ID da ferramenta que deseja remover.');
      return;
    }
  
    try {
      const existingToolsData = await AsyncStorage.getItem('tools');
      const tools = existingToolsData ? JSON.parse(existingToolsData) : [];
  
      // Procurar a ferramenta com o ID fornecido
      const toolToRemove = tools.find(tool => tool.id === idToRemove.trim());
  
      if (!toolToRemove) {
        Alert.alert('Vishh!', 'Nenhuma ferramenta encontrada com esse ID.');
        return;
      }
  
      // Exibir o nome da ferramenta na caixa de confirmação
      Alert.alert(
        'Confirmar remoção', // Título
        `Tem certeza de que deseja remover a ferramenta: ${toolToRemove.nome}?`, // Mensagem com o nome da ferramenta
        [
          {
            text: 'Cancelar', // Botão de cancelamento
            onPress: () => console.log('Remoção cancelada'), // Apenas loga que a remoção foi cancelada
            style: 'cancel',
          },
          {
            text: 'Remover', // Botão para confirmar remoção
            onPress: async () => {
              const updatedTools = tools.filter(tool => tool.id !== idToRemove.trim());
  
              await AsyncStorage.setItem('tools', JSON.stringify(updatedTools));
  
              Alert.alert('Pronto!', 'Ferramenta removida com sucesso!');
              setIdToRemove(''); // Limpa o campo após remoção
              navigation.navigate("Home");

            },
          },
        ],
        { cancelable: false } // Impede o fechamento da janela de alerta ao tocar fora dela
      );
    } catch (error) {
      console.error('Erro ao remover ferramenta:', error);
      Alert.alert('Erro!', 'Ocorreu um erro ao remover a ferramenta.');
    }

  };

  return (
    <Container>
      <Capsula>
        <Texto>Preencha para remover ferramenta:</Texto>
        <ComponentInput
          placeholder="Digite o ID da ferramenta para remover"
          valor={idToRemove}
          setValor={setIdToRemove}
          secury={false}
        />
        <ComponentButton texto={"Remover Ferramenta"} onPress={removerFerramenta}/>
      </Capsula>
    </Container>
  );
}
