import {Input} from './style.js'

export default function ComponentInput({placeholder, valor, setValor, secury}) {
  return (
    <Input placeholder={placeholder} value={valor} onChangeText={e => setValor(e)} secureTextEntry={secury}/>
  );
}