import {Botao, Texto, Container} from './style.js'

export default function ComponentButton({texto, onPress}) {
  return (
      <Botao onPress={onPress}>
        <Texto>{texto}</Texto>
      </Botao>
  );
}