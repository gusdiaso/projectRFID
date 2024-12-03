import { Container, Capsula, BotaoRemover, BotaoAdd, Textobutao, Texto } from './style.js';
import { useState } from 'react';
import ComponentInput from '../../componentes/input/input.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

export default function AddFerramentas({ navigation }) {
  const [id, setId] = useState('');
  const [nome, setNome] = useState('');
  const [desc, setDesc] = useState('');
  const [cargoperm, setCargoperm] = useState('');
  const [manual, setManual] = useState('');
  const [localizacao, setLocalizacao] = useState('');
  const [periodicidade, setPeriodicidade] = useState('');

  const verificarCampos = (fields) => {
    return fields.some(field => !field.trim()); // Verifica se algum campo está vazio
  };

  const adicionarFerramenta = async () => {
    if (verificarCampos([id, nome, desc, cargoperm, manual, periodicidade])) {
      Alert.alert('Ops!', 'Por favor, preencha todos os campos.');
      return;
    }

    try {
      const novaFerramenta = {
        id: id.trim(),
        nome: nome.trim(),
        descricao: desc.trim(),
        manual: manual.trim(),
        cargos_permissao: cargoperm.split(' '),
        status: "disponível",
        localizacao: localizacao.trim(),
        manutencao: {
          ultima_manutencao: new Date().toLocaleDateString('pt-BR'), // Data atual
          periodicidade: periodicidade.trim(),
        },
      };

      const existingToolsData = await AsyncStorage.getItem('tools');
      const tools = existingToolsData ? JSON.parse(existingToolsData) : [];

      if (tools.some(tool => tool.id === id.trim())) {
        Alert.alert('Opss!', 'Já existe uma ferramenta com esse ID.');
        return;
      }

      const updatedTools = [...tools, novaFerramenta];
      await AsyncStorage.setItem('tools', JSON.stringify(updatedTools));

      Alert.alert('Pronto!', 'Ferramenta adicionada com sucesso!');
      setId('');
      setNome('');
      setDesc('');
      setCargoperm('');
      setManual('');
      setLocalizacao('');
      setPeriodicidade('');
    } catch (error) {
      console.error('Erro ao adicionar ferramenta:', error);
      alert('Ocorreu um erro ao adicionar a ferramenta.');
    }
  };

  return (
    <Container>
      <Capsula>
        <Texto>Preencha para adicionar ferramenta</Texto>
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
          placeholder="Digite a periodicidade da manutenção (Ex: Mensal, Anual)"
          valor={periodicidade}
          setValor={setPeriodicidade}
          secury={false}
        />
        <BotaoAdd onPress={adicionarFerramenta}><Textobutao>Adicionar Ferramenta</Textobutao></BotaoAdd>
      </Capsula>
    </Container>
  );
}
