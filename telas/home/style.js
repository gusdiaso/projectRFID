import styled from 'styled-components/native'

export const Container = styled.View`
  background-color: white;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
`

export const BotaoExit = styled.TouchableOpacity`
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
