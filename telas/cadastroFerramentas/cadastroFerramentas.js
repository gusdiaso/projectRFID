import { Container, Capsula, BotaoRemover, BotaoAdd, Textobutao, Texto } from './style.js';
import ComponentButton from '../../componentes/botao/botao.js';


export default function CadastroFerramentas({ navigation }) {
  
  return (
    <Container>
      <Capsula>
        <ComponentButton texto={"Adicionar Ferramenta"} onPress={() => {navigation.navigate("Adicionar Ferramenta")}} />
        <ComponentButton texto={"Atualizar Ferramenta"} onPress={() => {navigation.navigate("Atualizar Ferramenta")}} />
        <ComponentButton texto={"Remover Ferramenta"} onPress={() => {navigation.navigate("Remover Ferramenta")}} />
      </Capsula>
    </Container>
  );
}
