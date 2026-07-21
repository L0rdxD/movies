import React from 'react';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer'; 
import { Main } from './components/Main'; 

function App() {
  return (
    <React.Fragment>
      <Header />
      <Main />
      <Footer />
    </React.Fragment>
  );
}

export default App;