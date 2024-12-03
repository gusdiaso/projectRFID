import { Container, Capsula, BotaoRemover, BotaoAdd, Textobutao, Texto } from './style.js';
import { useState } from 'react';
import ComponentInput from '../../componentes/input/input.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

export default function RemoveFerramentas({ navigation }) {

  const [idToRemove, setIdToRemove] = useState('');

  const removerFerramenta = async () => {
    if (!idToRemove.trim()) {
      Alert.alert('Ops!','Por favor, insira o ID da ferramenta que deseja remover.');
      return;
    }
  
    // Mostrar uma caixa de diálogo para confirmação
    Alert.alert(
      'Confirmar remoção', // Título
      'Tem certeza de que deseja remover essa ferramenta?', // Mensagem
      [
        {
          text: 'Cancelar', // Botão de cancelamento
          onPress: () => console.log('Remoção cancelada'), // Apenas loga que a remoção foi cancelada
          style: 'cancel',
        },
        {
          text: 'Remover', // Botão para confirmar remoção
          onPress: async () => {
            try {
              const existingToolsData = await AsyncStorage.getItem('tools');
              const tools = existingToolsData ? JSON.parse(existingToolsData) : [];
  
              const updatedTools = tools.filter(tool => tool.id !== idToRemove.trim());
  
              if (tools.length === updatedTools.length) {
                alert('Vishh!','Nenhuma ferramenta encontrada com esse ID.');
                return;
              }
  
              await AsyncStorage.setItem('tools', JSON.stringify(updatedTools));
  
              Alert.alert('Pronto!','Ferramenta removida com sucesso!');
              setIdToRemove(''); // Limpa o campo após remoção
            } catch (error) {
              console.error('Erro ao remover ferramenta:', error);
              alert('Ocorreu um erro ao remover a ferramenta.');
            }
          },
        },
      ],
      { cancelable: false } // Impede o fechamento da janela de alerta ao tocar fora dela
    );
  };

  return (
    <Container>
      <Capsula>
        <Texto>Preencha para remover ferramenta</Texto>
        <ComponentInput
          placeholder="Digite o ID da ferramenta para remover"
          valor={idToRemove}
          setValor={setIdToRemove}
          secury={false}
        />
        <BotaoRemover onPress={removerFerramenta}><Textobutao>Remover Ferramenta</Textobutao></BotaoRemover>
      </Capsula>
    </Container>
  );
}
