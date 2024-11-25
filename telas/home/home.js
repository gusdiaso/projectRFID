import {Container} from './style.js'
import { useState } from 'react';
import ComponentButton from '../../componentes/botao/botao.js'; 

export default function Home({navigation}) {
  return (
    <Container>
      <ComponentButton texto={"Buscar ferramentas"} onPress={() => {navigation.navigate("Busca de Ferramentas")}}/>
      <ComponentButton texto={"Manual da ferramenta"} onPress={() => {navigation.navigate("Manual da ferramenta")}}/>
      <ComponentButton texto={"Autorização para uso da ferramenta"} onPress={() => {navigation.navigate("Autorização de uso")}}/>
      <ComponentButton texto={"Cadastrar ferramenta"} onPress={() => {navigation.navigate("Cadastrar ferramenta")}}/>
    </Container>
  );
}