import React from 'react';
import { Container, Title, Butao, Info, Capsula, Textbutton, Scrollabe} from './style.js';
import { Alert } from 'react-native';
import * as Linking from 'expo-linking'; // Use esta importação ao trabalhar com Expo

export default function FerramentaDetalhe({ route }) {
  const { ferramenta } = route.params;

  const openLink = async (url) => {
    try {
      // Verifica se o link é suportado
      const supported = await Linking.canOpenURL(url);

      if (supported) {
        await Linking.openURL(url); // Abre o link no navegador
      } else {
        Alert.alert('Erro', `Não foi possível abrir o link: ${url}`);
      }
    } catch (error) {
      console.error('Erro ao abrir o link:', error);
      Alert.alert('Erro', 'Ocorreu um problema ao tentar abrir o link.');
    }
  };

  return (
    <Scrollabe>
      <Container>

        <Capsula style={{ marginTop: 20 }}>
          <Title>Ferramenta:</Title>
          <Info>{ferramenta.nome}</Info>
        </Capsula>
        <Capsula>
          <Title>Descrição:</Title>
          <Info>{ferramenta.descricao}</Info>
        </Capsula>

        <Capsula>
          <Title>ID:</Title>
          <Info>{ferramenta.id}</Info>
        </Capsula>

        <Capsula>
        <Title>Cargos Permitidos:</Title>
        {ferramenta.cargos_permissao.map((cargo, index) => (
          <Info key={index}>-  {cargo}</Info>
        ))}
        </Capsula>

        <Capsula>
          <Title>Status:</Title>
          <Info>{ferramenta.status}</Info>
        </Capsula>

        <Capsula>
          <Title>Localização:</Title>
          <Info>{ferramenta.localizacao}</Info>
        </Capsula>

        <Capsula>
        <Title>Manutenção:</Title>
        <Info>Ultima manutenção: {ferramenta.manutencao.ultima_manutencao}</Info>
        <Info>Periodicidade de manutenção: {ferramenta.manutencao.periodicidade}</Info>
        </Capsula>

        <Butao onPress={() => openLink(ferramenta.manual)}>
          <Textbutton>Abrir Manual</Textbutton>
        </Butao>


      </Container>
    </Scrollabe>
  );
}
