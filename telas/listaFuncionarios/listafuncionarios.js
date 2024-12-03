import { Container, Input, Capsula, Texto, Card, Aviso, Cardexemplo, Textoexemplo} from './style.js';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView } from 'react-native';

export default function ListaFuncionario({ navigation }) {
  const [searchTerm, setSearchTerm] = useState(''); // Termo de busca
  const [users, setUsers] = useState([]); // Lista completa de usuários
  const [filteredUsers, setFilteredUsers] = useState([]); // Lista filtrada

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const existingData = await AsyncStorage.getItem('users');
        const parsedUsers = existingData ? JSON.parse(existingData) : [];
        setUsers(parsedUsers);
        setFilteredUsers(parsedUsers); // Inicializa com todos os usuários
      } catch (error) {
        console.error('Erro ao buscar usuários:', error.message);
        setUsers([]);
        setFilteredUsers([]);
      }
    };
    fetchUsers();
  }, []);

  // Função para filtrar usuários com base no termo de busca
  const handleSearch = (input) => {
    setSearchTerm(input);
    const filtered = users.filter(user =>
      user.username?.toLowerCase().includes(input.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  return (
    <Container>
      <Input
        placeholder="Buscar funcionário pelo username..."
        value={searchTerm}
        onChangeText={handleSearch}
      />
          <Cardexemplo>
            <Textoexemplo>Nome</Textoexemplo>
            <Textoexemplo>ID</Textoexemplo>
          </Cardexemplo>
      <Capsula>
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <Card key={user.id || Math.random().toString()}>
                <Texto>{user.username || 'Sem nome'}</Texto>
                <Texto>{user.id || 'Sem ID'}</Texto>
              </Card>
            ))
          ) : (
            <Aviso>Nenhum funcionário encontrado.</Aviso>
          )}
      </Capsula>
    </Container>
  );
}
