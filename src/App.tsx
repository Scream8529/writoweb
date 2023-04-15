import React from 'react';
import { MainContainer } from './containers';
import { MainLayout } from './layouts';

function App() {
  return (
    <div className="App">
      <MainLayout>
        <MainContainer />
      </MainLayout>
    </div>
  );
}

export default App;
