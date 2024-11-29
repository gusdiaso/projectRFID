import {Container, Input, Butao, Capsula} from './style.js'
import { useEffect, useState } from 'react';
import ComponentCardFerramenta from '../../componentes/cardFerramenta/cardFerramenta.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Busca({navigation}) {
  const [ferramenta, setFerramenta] = useState('');  // Estado para armazenar o valor da busca
  const [tools, setTools] = useState([]);  // Estado para armazenar todas as ferramentas
  const [filteredTools, setFilteredTools] = useState([]);  // Estado para armazenar ferramentas filtradas

  useEffect(() => {
    const fetchData = async () => {
      const existingData = await AsyncStorage.getItem('tools');
      const tools = existingData ? JSON.parse(existingData) : [];
      setTools(tools);
      setFilteredTools(tools);  // Define a lista filtrada com todas as ferramentas
    };
    fetchData();
  }, []);

  // Função para filtrar as ferramentas conforme o nome
  const handleSearch = (input) => {
    const filtered = tools.filter(tool => 
      tool.nome.toLowerCase().includes(input.toLowerCase())  // Filtra pelas ferramentas que contém o texto digitado
    );
    setFilteredTools(filtered);  // Atualiza as ferramentas filtradas
  };

  return (
    <Container>
      <Input 
        placeholder="Digite o nome da ferramenta ..."
        value={ferramenta}
        onChangeText={(e) => {
          setFerramenta(e);  // Atualiza o valor da busca
          handleSearch(e);   // Chama a função de busca
        }}  
      />
      <Capsula>
        {
          filteredTools.map((elemento) => {
            return (
              <ComponentCardFerramenta 
                key={elemento.id} 
                nome={elemento.nome} 
                onPress={() => {navigation.navigate("Detalhamento da Ferramenta", {ferramenta: elemento})}}
              />
            );
          })
        }
      </Capsula>
    </Container>
  );
}
