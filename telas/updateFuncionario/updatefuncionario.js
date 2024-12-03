import { Container, Title } from './style.js';
import ComponentInput from '../../componentes/input/input.js';
import { useState } from 'react';
import ComponentButton from '../../componentes/botao/botao.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

export default function UpdateFuncionario({ navigation }) {
  const [id, setId] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [cargo, setCargo] = useState('');

  async function atualizarUser() {
    try {
      // Recupera os usuários já armazenados
      const existingData = await AsyncStorage.getItem('users');
      const users = existingData ? JSON.parse(existingData) : [];

      // Valida o campo de ID
      if (!id) {
        Alert.alert('Erro', 'Preencha o ID do funcionário!');
        return;
      }

      // Valida se pelo menos um campo além do ID foi preenchido
      if (!username && !password && !email && !cargo) {
        Alert.alert('Erro', 'Preencha pelo menos um campo além do ID!');
        return;
      }

      // Converte o ID para número
      const userId = parseInt(id, 10);

      // Verifica se o ID é válido
      if (isNaN(userId)) {
        Alert.alert('Erro', 'O ID deve ser um número válido!');
        return;
      }

      // Encontra o usuário pelo ID
      const userIndex = users.findIndex(user => user.id === userId);
      if (userIndex === -1) {
        Alert.alert('Erro', 'Funcionário com o ID especificado não encontrado!');
        return;
      }

      // Atualiza os dados do usuário (somente os campos preenchidos)
      if (username) users[userIndex].username = username;
      if (password) users[userIndex].password = password;
      if (email) users[userIndex].email = email;
      if (cargo) users[userIndex].cargo = cargo;

      // Atualiza a lista de usuários no AsyncStorage
      await AsyncStorage.setItem('users', JSON.stringify(users));
      Alert.alert('Sucesso', 'Dados do funcionário atualizados com sucesso!');
      navigation.navigate("Home");
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao atualizar os dados do funcionário.');
    }
  }

  return (
    <Container>
      <Title>Digite o ID do funcionario e preencha o campo que deseja alterar. O campo que não for preenchido não sofrerá alteração.</Title>
      <ComponentInput
        placeholder={"Digite o ID do funcionário"}
        valor={id}
        setValor={setId}
        secury={false}
      />
      <ComponentInput
        placeholder={"Digite o username do funcionário"}
        valor={username}
        setValor={setUsername}
        secury={false}
      />
      <ComponentInput
        placeholder={"Digite o email do funcionário"}
        valor={email}
        setValor={setEmail}
        secury={false}
      />
      <ComponentInput
        placeholder={"Digite o cargo do funcionário"}
        valor={cargo}
        setValor={setCargo}
        secury={false}
      />
      <ComponentInput
        placeholder={"Atualize a senha do funcionário"}
        valor={password}
        setValor={setPassword}
        secury={true}
      />

      <ComponentButton
        texto="Atualizar Funcionário"
        onPress={atualizarUser}
      />
    </Container>
  );
}
