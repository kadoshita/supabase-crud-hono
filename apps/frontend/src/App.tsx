import { MantineProvider } from '@mantine/core';

import '@mantine/core/styles.css';
import './App.css';
import { Route } from 'wouter';
import Index from './pages/Index';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Logout from './pages/Logout';

function App() {
  return (
    <MantineProvider>
      <Route path="/">
        <Index></Index>
      </Route>
      <Route path="/login">
        <Login></Login>
      </Route>
      <Route path="/signup">
        <Signup></Signup>
      </Route>
      <Route path="/logout">
        <Logout></Logout>
      </Route>
    </MantineProvider>
  );
}

export default App;
