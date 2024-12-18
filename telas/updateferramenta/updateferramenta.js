import { Container, Capsula, Texto } from './style.js';
import { useState } from 'react';
import ComponentInput from '../../componentes/input/input.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import ComponentButton from '../../componentes/botao/botao.js';

export default function UpdateFerramentas({ navigation }) {
  const [id, setId] = useState('');
  const [nome, setNome] = useState('');
  const [desc, setDesc] = useState('');
  const [cargoperm, setCargoperm] = useState('');
  const [manual, setManual] = useState('');
  const [localizacao, setLocalizacao] = useState('');
  const [status, setStatus] = useState('');
  const [ultimaManutencao, setUltimaManutencao] = useState('');
  const [periodicidade, setPeriodicidade] = useState('');

  const atualizarFerramenta = async () => {
    if (!id.trim()) {
      Alert.alert('Ops!', 'Por favor, preencha o ID da ferramenta para atualizá-la.');
      return;
    }

    try {
      const existingToolsData = await AsyncStorage.getItem('tools');
      const tools = existingToolsData ? JSON.parse(existingToolsData) : [];

      // Verifica se a ferramenta com o ID informado existe
      const toolIndex = tools.findIndex(tool => tool.id === id.trim());
      if (toolIndex === -1) {
        Alert.alert('Ops!', 'Não foi encontrada nenhuma ferramenta com esse ID.');
        return;
      }

      // Verifica se ao menos um campo além do ID foi preenchido
      if (
        [nome, desc, cargoperm, manual, localizacao, status, ultimaManutencao, periodicidade].every(field => !field.trim())
      ) {
        Alert.alert('Ops!', 'Preencha ao menos um campo para atualizar.');
        return;
      }

      // Atualiza apenas os campos preenchidos
      const updatedTool = {
        ...tools[toolIndex], // Mantém os valores antigos
        nome: nome.trim() || tools[toolIndex].nome,
        descricao: desc.trim() || tools[toolIndex].descricao,
        cargos_permissao: cargoperm.trim()
          ? cargoperm.split(' ')
          : tools[toolIndex].cargos_permissao,
        manual: manual.trim() || tools[toolIndex].manual,
        localizacao: localizacao.trim() || tools[toolIndex].localizacao,
        status: status.trim() || tools[toolIndex].status,
        manutencao: {
          ultima_manutencao: ultimaManutencao.trim() || tools[toolIndex].manutencao?.ultima_manutencao,
          periodicidade: periodicidade.trim() || tools[toolIndex].manutencao?.periodicidade,
        },
      };

      tools[toolIndex] = updatedTool;

      // Atualiza o AsyncStorage
      await AsyncStorage.setItem('tools', JSON.stringify(tools));

      Alert.alert('Pronto!', 'Ferramenta atualizada com sucesso!');
      setId('');
      setNome('');
      setDesc('');
      setCargoperm('');
      setManual('');
      setLocalizacao('');
      setStatus('');
      setUltimaManutencao('');
      setPeriodicidade('');
    } catch (error) {
      console.error('Erro ao atualizar ferramenta:', error);
      Alert.alert('Erro!', 'Ocorreu um erro ao atualizar a ferramenta.');
    }
    navigation.navigate("Home");

  };

  return (
    <Container>
      <Capsula>
        <Texto>Digite o ID da ferramenta e preencha o campo que deseja alterar. O campo que não for preenchido não sofrerá alteração.</Texto>
        <ComponentInput
          placeholder="Digite a Tag da ferramenta"
          valor={id}
          setValor={setId}
          secury={false}
        />
        <ComponentInput
          placeholder="Digite o nome da ferramenta"
          valor={nome}
          setValor={setNome}
          secury={false}
        />
        <ComponentInput
          placeholder="Digite a descrição da ferramenta"
          valor={desc}
          setValor={setDesc}
          secury={false}
        />
        <ComponentInput
          placeholder="Digite separado por espaço os cargos permitidos"
          valor={cargoperm}
          setValor={setCargoperm}
          secury={false}
        />
        <ComponentInput
          placeholder="Digite a localização da ferramenta"
          valor={localizacao}
          setValor={setLocalizacao}
          secury={false}
        />
        <ComponentInput
          placeholder="Digite o link do manual da ferramenta"
          valor={manual}
          setValor={setManual}
          secury={false}
        />
        <ComponentInput
          placeholder="Digite o status da ferramenta (disponível ou o username de quem a possui)"
          valor={status}
          setValor={setStatus}
          secury={false}
        />
        <ComponentInput
          placeholder="Digite a data da última manutenção (dd/mm/aaaa)"
          valor={ultimaManutencao}
          setValor={setUltimaManutencao}
          secury={false}
        />
        <ComponentInput
          placeholder="Digite a periodicidade de manutenção (e.g., Mensal, Anual)"
          valor={periodicidade}
          setValor={setPeriodicidade}
          secury={false}
        />

        <ComponentButton texto={"Atualizar Ferramenta"} onPress={atualizarFerramenta}  />
      </Capsula>
    </Container>
  );
}
