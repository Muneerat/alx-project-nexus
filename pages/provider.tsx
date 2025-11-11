import { store } from '@/services/store';
import * as React from 'react';
import { Provider } from 'react-redux';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>

        {children}
    </Provider>
  )
}
