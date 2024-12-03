import styled from 'styled-components/native'


export const Container = styled.View`
  background-color: white;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const Capsula = styled.ScrollView`
  width: 100%;
  margin-bottom: 20px;
`

export const Card = styled.View`
  width: 95%;
  display: flex;
  padding: 10px 20px;
  flex-direction: row;
  border-radius: 5px;
  justify-content: space-between;
  background-color: black;
  margin-inline: auto;
  margin-bottom: 5px;
`

export const Cardexemplo = styled.View`
  width: 95%;
  display: flex;
  padding: 5px 20px;
  flex-direction: row;
  justify-content: space-between;
  margin-inline: auto;
  margin-bottom: 5px;
`
export const Texto = styled.Text`
  color: white;
`

export const Textoexemplo = styled.Text`
  color: black;
`

export const Aviso = styled.Text`
  width: 100%;
  text-align: center;
`



export const Input = styled.TextInput`
  background-color: #ddd;
  width: 95%;
  padding: 10px 15px;
  border-radius: 5px;
  border: 1px solid black;
  margin-block: 10px;
`

