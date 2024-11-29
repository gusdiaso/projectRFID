import {Capsula, Texto} from './style.js'

export default function ComponentCardFerramenta({nome, onPress}) {
  return (
      <Capsula onPress={onPress}>
        <Texto>{nome}</Texto>
      </Capsula>
  );
}