import {Container, Texto, Input} from './style.js'
import { useState } from 'react';
import ComponentButton from '../../componentes/botao/botao.js'; 
import ComponentInput from '../../componentes/input/input.js';

export default function Autorizacao({navigation}) {
  const [tag, setTag] = useState(null)

  return (
    <Container>
      <Texto style={{marginTop: 20}}>Aproxime a ferramenta do leitor!</Texto>
      <Input placeholder="Aguardando resposta ..." value={tag} onChangeText={e => setTag(e)} secury={false} editable={false}/>
    </Container>
  );
}