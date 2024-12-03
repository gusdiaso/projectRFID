import styled from 'styled-components/native'

export const Container = styled.View`
  background-color: white;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`

export const Scrollabe = styled.ScrollView`
  width: 100%;
  background-color: white;
`
export const Capsula = styled.View`
  background-color: black;
  width: 90%;
  padding: 15px 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 5px;
`

export const Title = styled.Text`
  font-size: 18px;
  font-weight: 800;
  text-align: left;
  width: 100%;
  color: white;
  margin-bottom: 8px;
`
export const Info = styled.Text`
  font-size: 16px;
  text-align: left;
  color: white;
  width: 100%;
`
export const Textbutton = styled.Text`
  font-size: 18px;
  font-weight: 800;
  color: white;

`

export const Butao = styled.TouchableOpacity`
  color: white;
  background-color: green;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 90%;
  border-radius: 5px;
  padding: 10px 0;
  margin-bottom: 30px;
`
