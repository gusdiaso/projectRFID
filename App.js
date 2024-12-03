import Login from './telas/login/login';
import LoginCadastro from './telas/loginCadastro/loginCadastro';
import Home from './telas/home/home';
import React, { useEffect } from 'react';
import Busca from './telas/busca/busca';
import Manual from './telas/manual/manual';
import CadastroFerramentas from './telas/cadastroFerramentas/cadastroFerramentas';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import FerramentaDetalhe from './telas/ferramentaDetalhe/ferramentaDetalhe';
import Emprestar from './telas/emprestar/emprestar';
import AddFerramentas from './telas/addferramenta/addferramenta';
import UpadateFerramentas from './telas/updateferramenta/updateferramenta';
import RemoveFerramentas from './telas/removeferramenta/removeferramenta';

const Stack = createNativeStackNavigator();

export default function App() {

  useEffect(() => {
    // Verifica se já existem dados no AsyncStorage e carrega ou inicializa
    const loadData = async () => {
      try {

        //APAGA TUUUUUUUUUUDOOO
        // await AsyncStorage.clear();


        // Carregar os dados dos usuários
        const existingUserData = await AsyncStorage.getItem('users');
        if (!existingUserData) {
          const initialTools = require("./assets/data/users.json"); // Caminho do seu arquivo JSON
          await AsyncStorage.setItem('users', JSON.stringify(initialTools));
        }
  
        // Carregar o JSON de ferramentas do arquivo local
        const existingToolsData = await AsyncStorage.getItem('tools');
        if (!existingToolsData) {
          const initialTools = require("./assets/data/ferramentas.json"); // Caminho do seu arquivo JSON
          await AsyncStorage.setItem('tools', JSON.stringify(initialTools));
        }
      } catch (error) {
        Alert.alert(
          'Algo deu errado',         
          'Tente novamente mais tarde!',   
          [
            {
              text: 'Cancelar',
              style: 'cancel',   
            },      
            { 
              text: 'OK',
            },
          ]
        );
        console.error('Erro ao carregar ou salvar dados:', error);
      }
    };

    loadData();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Cadastro" 
          component={LoginCadastro} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Ferramentas" 
          component={Home} 
          options={{ headerBackVisible: false }}
        />
        <Stack.Screen 
          name="Busca de Ferramentas" 
          component={Busca} 
          options={{ }}
        />
        <Stack.Screen 
          name="Manual da ferramenta" 
          component={Manual} 
          options={{ }}
        />
        <Stack.Screen 
          name="Cadastrar ferramenta" 
          component={CadastroFerramentas} 
          options={{ }}
        />
        <Stack.Screen 
          name="Detalhamento da Ferramenta" 
          component={FerramentaDetalhe} 
          options={{ }}
        />

        <Stack.Screen 
          name="Emprestimo de Ferramenta" 
          component={Emprestar} 
          options={{ }}
        />

        <Stack.Screen 
          name="Adicionar Ferramenta" 
          component={AddFerramentas} 
          options={{ }}
        />
        
        <Stack.Screen 
          name="Atualizar Ferramenta" 
          component={UpadateFerramentas} 
          options={{ }}
        />

        <Stack.Screen 
          name="Remover Ferramenta" 
          component={RemoveFerramentas} 
          options={{ }}
        />


      </Stack.Navigator>

    </NavigationContainer>
  );
}
