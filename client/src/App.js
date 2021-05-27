import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './context/auth/AuthContext';
import { RegistrationProvider } from './context/register/RegistrationContext';
import { UserProvider } from './context/user/userContext';
import { ProblemProvider } from './context/problem/problemContext';
import BaseRoute from './routes';

function App() {
  return (
    <Router>
      <UserProvider>
        <ProblemProvider>
          <AuthProvider>
            <RegistrationProvider>
              <BaseRoute />
            </RegistrationProvider>
          </AuthProvider>
        </ProblemProvider>
      </UserProvider>
    </Router>
  );
}

export default App;
