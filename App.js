import Login from './telas/login/login';
import LoginCadastro from './telas/loginCadastro/loginCadastro';
import Home from './telas/home/home';
import Busca from './telas/busca/busca';
import Manual from './telas/Manual/manual';
import CadastroFerramentas from './telas/cadastroFerramentas/cadastroFerramentas';
import Autorizacao from './telas/autorizacao/autorizacao';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

export default function App() {
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
          name="Autorização de uso" 
          component={Autorizacao} 
          options={{ }}
        />
        <Stack.Screen 
          name="Cadastrar ferramenta" 
          component={CadastroFerramentas} 
          options={{ }}
        />
      </Stack.Navigator>

    </NavigationContainer>
  );
}
