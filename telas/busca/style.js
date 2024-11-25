import styled from 'styled-components/native'

export const Container = styled.View`
  background-color: white;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px
`

export const Capsula = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  margin-top: 15px;
`

export const Input = styled.TextInput`
  background-color: #ddd;
  width: 80%;
  padding: 10px 15px;
  border-radius: 5px;
  border: 1px solid black;

`
export const Butao = styled.TouchableOpacity`
  background-color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  padding: 6px;
`

