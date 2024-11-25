import styled from 'styled-components/native'

export const Container = styled.View`
  background-color: white;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px
`

export const Imagem = styled.Image`
  width: 140px;
  height: 70px;
  object-fit: cover;
  margin-bottom: 20px;
`

export const Aviso = styled.Text`
  color: #000;
  font-size: 14px;
`

export const Cadastro = styled.Text`
  color: #000;
  font-size: 14px;
  font-weight: bold;
  text-decoration: underline;
`

export const Capsula = styled.View`
  display: flex;
  flex-direction: row;
`
