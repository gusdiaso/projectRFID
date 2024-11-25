import {Input} from './style.js'

export default function ComponentInput({placeholder, valor, setValor, secury, editable}) {
  return (
    <Input placeholder={placeholder} value={valor} onChangeText={e => setValor(e)} secureTextEntry={secury}/>
  );
}