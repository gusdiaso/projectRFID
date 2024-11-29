import styled from 'styled-components/native'

export const Container = styled.View`
  background-color: white;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

`

export const Capsula = styled.View`
  width: 100%;
  height: max-content;
  margin-top: 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`

export const BotaoAdd = styled.TouchableOpacity`
background-color: green;
width: 80%;
border-radius: 5px;
padding: 10px;
`

export const BotaoRemover = styled.TouchableOpacity`
background-color: red;
width: 80%;
border-radius: 5px;
padding: 10px;
`
export const Textobutao = styled.Text`
  font-size: 15px;
  text-align: center;
  color: white;
  font-weight: 500;
`

export const Texto = styled.Text`
  font-size: 18px;
  text-align: center;
  color: black;
  width: 80%;
  text-align: center;
  font-weight: 500;
`