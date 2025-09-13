import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import Home from './pages/Home';
import './App.css'

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <Home />
      </Router>
    </Provider>
  );
};

export default App;