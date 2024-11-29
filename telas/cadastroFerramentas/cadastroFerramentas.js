import { Container, Capsula, BotaoRemover, BotaoAdd, Textobutao, Texto } from './style.js';
import { useState } from 'react';
import ComponentInput from '../../componentes/input/input.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

export default function CadastroFerramentas({ navigation }) {
  const [id, setId] = useState('');
  const [nome, setNome] = useState('');
  const [desc, setDesc] = useState('');
  const [cargoperm, setCargoperm] = useState('');
  const [manual, setManual] = useState('');
  const [localizacao, setLocalizacao] = useState('');
  const [idToRemove, setIdToRemove] = useState('');

  const verificarCampos = (fields) => {
    return fields.some(field => !field.trim());  // Verifica se algum campo está vazio
  };

  const adicionarFerramenta = async () => {
    if (verificarCampos([id, nome, desc, cargoperm, manual])) {
      Alert.alert('Ops!','Por favor, preencha todos os campos.');
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

      };

      const existingToolsData = await AsyncStorage.getItem('tools');
      const tools = existingToolsData ? JSON.parse(existingToolsData) : [];

      if (tools.some(tool => tool.id === id.trim())) {
        Alert.alert('Opss!','Já existe uma ferramenta com esse ID.');
        return;
      }

      const updatedTools = [...tools, novaFerramenta];
      await AsyncStorage.setItem('tools', JSON.stringify(updatedTools));

      Alert.alert('Pronto!','Ferramenta adicionada com sucesso!');
      setId('');
      setNome('');
      setDesc('');
      setCargoperm('');
      setManual('');
      setLocalizacao('');
    } catch (error) {
      console.error('Erro ao adicionar ferramenta:', error);
      alert('Ocorreu um erro ao adicionar a ferramenta.');
    }
  };

  const removerFerramenta = async () => {
    if (!idToRemove.trim()) {
      Alert.alert('Ops!','Por favor, insira o ID da ferramenta que deseja remover.');
      return;
    }
  
    // Mostrar uma caixa de diálogo para confirmação
    Alert.alert(
      'Confirmar remoção', // Título
      'Tem certeza de que deseja remover essa ferramenta?', // Mensagem
      [
        {
          text: 'Cancelar', // Botão de cancelamento
          onPress: () => console.log('Remoção cancelada'), // Apenas loga que a remoção foi cancelada
          style: 'cancel',
        },
        {
          text: 'Remover', // Botão para confirmar remoção
          onPress: async () => {
            try {
              const existingToolsData = await AsyncStorage.getItem('tools');
              const tools = existingToolsData ? JSON.parse(existingToolsData) : [];
  
              const updatedTools = tools.filter(tool => tool.id !== idToRemove.trim());
  
              if (tools.length === updatedTools.length) {
                alert('Vishh!','Nenhuma ferramenta encontrada com esse ID.');
                return;
              }
  
              await AsyncStorage.setItem('tools', JSON.stringify(updatedTools));
  
              Alert.alert('Pronto!','Ferramenta removida com sucesso!');
              setIdToRemove(''); // Limpa o campo após remoção
            } catch (error) {
              console.error('Erro ao remover ferramenta:', error);
              alert('Ocorreu um erro ao remover a ferramenta.');
            }
          },
        },
      ],
      { cancelable: false } // Impede o fechamento da janela de alerta ao tocar fora dela
    );
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
        <BotaoAdd onPress={adicionarFerramenta}><Textobutao>Adicionar Ferramenta</Textobutao></BotaoAdd>
      </Capsula>
      <Capsula>
        <Texto>Preencha para remover ferramenta</Texto>
        <ComponentInput
          placeholder="Digite o ID da ferramenta para remover"
          valor={idToRemove}
          setValor={setIdToRemove}
          secury={false}
        />
        <BotaoRemover onPress={removerFerramenta}><Textobutao>Remover Ferramenta</Textobutao></BotaoRemover>
      </Capsula>
    </Container>
  );
}
