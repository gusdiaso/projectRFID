import { Container, Capsula, BotaoRemover, BotaoAdd, Textobutao, Texto } from './style.js';
import ComponentButton from '../../componentes/botao/botao.js';


export default function CadastroFuncionario({ navigation }) {
  
  return (
    <Container>
      <Capsula>
        <ComponentButton texto={"Adicionar Funcionario"} onPress={() => {navigation.navigate("Adicionar Funcionario")}} />
        <ComponentButton texto={"Atualizar Funcionario"} onPress={() => {navigation.navigate("Atualizar Funcionario")}} />
        <ComponentButton texto={"Remover Funcionario"} onPress={() => {navigation.navigate("Remover Funcionario")}} />
        <ComponentButton texto={"Listar Funcionarios"} onPress={() => {navigation.navigate("Listar Funcionarios")}} />
      </Capsula>
    </Container>
  );
}
