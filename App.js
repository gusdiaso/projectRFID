import React, { useEffect } from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import Login from "./telas/login/login"
import Home from './telas/home/home';
import CadastroFuncionario from './telas/cadastroFuncionarios/cadastrofuncionarios';
import AddFuncionarios from './telas/addFuncionario/addfuncionario';
import UpdateFuncionario from './telas/updateFuncionario/updatefuncionario';
import ApagarFuncionario from './telas/apagarFuncionario/apagarfuncionario';
import BuscaFerramenta from './telas/buscaFerramentas/buscaferramentas';
import ManualFerramenta from './telas/manualFerramentas/manualferramentas';
import CadastroFerramentas from './telas/cadastroFerramentas/cadastroferramentas';
import FerramentaDetalhe from './telas/ferramentaDetalhe/ferramentadetalhes';
import EmprestarFerramenta from './telas/emprestarFerramentas/emprestarferramentas';
import AddFerramentas from './telas/addFerramenta/addferramenta';
import UpadateFerramentas from './telas/updateFerramenta/updateferramenta';
import RemoveFerramentas from './telas/removerFerramenta/removerferramenta';
import ListaFuncionario from './telas/listaFuncionarios/listafuncionarios';


const Stack = createNativeStackNavigator();

export default function App() {

  useEffect(() => {
    const loadData = async () => {
      try {
        // await AsyncStorage.clear();//////////////

        const existingUserData = await AsyncStorage.getItem('users');
        if (!existingUserData) {
          const initialTools = require("./assets/data/users.json"); // Caminho do 
          await AsyncStorage.setItem('users', JSON.stringify(initialTools));
        }
  
        const existingToolsData = await AsyncStorage.getItem('tools');
        if (!existingToolsData) {
          const initialTools = require("./assets/data/ferramentas.json"); // 
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
          name="Home" 
          component={Home} 
          options={{ headerBackVisible: false }}
        />

        <Stack.Screen 
          name="Cadastrar Funcionario" 
          component={CadastroFuncionario} 
          options={{ }}
        />

        <Stack.Screen 
          name="Adicionar Funcionario" 
          component={AddFuncionarios} 
          options={{ }}
        />

        <Stack.Screen 
          name="Atualizar Funcionario" 
          component={UpdateFuncionario} 
          options={{ }}
        />

        <Stack.Screen 
          name="Remover Funcionario" 
          component={ApagarFuncionario} 
          options={{ }}
        />

        <Stack.Screen 
          name="Listar Funcionarios" 
          component={ListaFuncionario} 
          options={{ }}
        />

        <Stack.Screen 
          name="Busca de Ferramentas" 
          component={BuscaFerramenta} 
          options={{ }}
        />

        <Stack.Screen 
          name="Detalhamento da Ferramenta" 
          component={FerramentaDetalhe} 
          options={{ }}
        />

        <Stack.Screen 
          name="Manual da Ferramenta" 
          component={ManualFerramenta} 
          options={{ }}
        />

        <Stack.Screen 
          name="Emprestimo de Ferramenta" 
          component={EmprestarFerramenta} 
          options={{ }}
        />
        
        <Stack.Screen 
          name="Cadastrar Ferramenta" 
          component={CadastroFerramentas} 
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
