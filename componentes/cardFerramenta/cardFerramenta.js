import {Capsula, Texto} from './style.js'

export default function ComponentCardFerramenta({nome}) {
  return (
      <Capsula>
        <Texto>{nome}</Texto>
      </Capsula>
  );
}