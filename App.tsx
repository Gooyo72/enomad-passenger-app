import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@api';
import RootNavigator from '@navigation/RootNavigator';

function App() {
  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <StatusBar barStyle="dark-content" />
        <RootNavigator />
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}

export default App;
