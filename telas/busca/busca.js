import {Container, Input, Butao, Capsula} from './style.js'
import { useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function Busca({navigation}) {
  const [tag, setTag] = useState(null)

  return (
    <Container>
      <Capsula>
        <Input placeholder="Digite o nome da ferramenta ..." value={tag} onChangeText={e => setTag(e)}/>
        <Butao><Ionicons name="search" size={28} color="white" /></Butao>
      </Capsula>
    </Container>
  );
}