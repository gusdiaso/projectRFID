import { Container, Title } from './style.js';
import ComponentInput from '../../componentes/input/input.js';
import { useState } from 'react';
import ComponentButton from '../../componentes/botao/botao.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

export default function ApagarFuncionario({ navigation }) {
  const [id, setId] = useState('');

  async function confirmarRemocao(user) {
    Alert.alert(
      "Confirmação de Remoção",
      `Tem certeza de que deseja remover o funcionário "${user.username}"?`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Remover",
          style: "destructive",
          onPress: async () => {
            try {
              // Recupera os usuários existentes
              const existingData = await AsyncStorage.getItem('users');
              const users = existingData ? JSON.parse(existingData) : [];

              // Remove o funcionário da lista (garante que a comparação seja feita corretamente com o tipo correto)
              const updatedUsers = users.filter(u => u.id !== user.id);

              // Atualiza o AsyncStorage
              await AsyncStorage.setItem('users', JSON.stringify(updatedUsers));
              Alert.alert('Sucesso', 'Funcionário removido com sucesso!');
              navigation.navigate("Home");
            } catch (error) {
              console.error('Erro ao remover funcionário:', error);
              Alert.alert('Erro', 'Ocorreu um erro ao remover o funcionário.');
            }
          },
        },
      ]
    );
  }

  async function buscarUser() {
    try {
      // Recupera os usuários já armazenados
      const existingData = await AsyncStorage.getItem('users');
      const users = existingData ? JSON.parse(existingData) : [];

      // Valida o campo de entrada
      if (!id) {
        Alert.alert('Erro', 'Preencha o ID do funcionário!');
        return;
      }

      // Converte o ID para número
      const userId = parseInt(id, 10);

      // Verifica se o ID é válido
      if (isNaN(userId)) {
        Alert.alert('Erro', 'O ID deve ser um número válido!');
        return;
      }

      // Busca o funcionário pelo ID
      const user = users.find(user => user.id === userId);
      if (!user) {
        Alert.alert('Erro', 'Funcionário com o ID especificado não encontrado!');
        return;
      }

      // Exibe a confirmação de remoção
      confirmarRemocao(user);
    } catch (error) {
      console.error('Erro ao buscar funcionário:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao buscar o funcionário.');
    }
  }

  return (
    <Container>
      <Title>Remova um funcionário:</Title>
      <ComponentInput
        placeholder={"Digite o ID do funcionario"}
        valor={id}
        setValor={setId}
        secury={false}
      />

      <ComponentButton
        texto="Buscar e Remover Funcionario"
        onPress={() => { buscarUser(); }}
      />
    </Container>
  );
}
