import { StatusBar } from 'react-native';
import RootRoutes from './app/RootRoutes';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { store } from './app/redux/store';

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <StatusBar />
        <RootRoutes />
      </NavigationContainer>
    </Provider>

  );
}


