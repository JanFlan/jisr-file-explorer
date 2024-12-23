import React from 'react';
import FileExplorer from './components/FileExplorer/FileExplorer';
import './App.css';

const App: React.FC = () => {
  return (
    <div className='app'>
      <h1>File Explorer</h1>
      <FileExplorer />
    </div>
  );
};

export default App;
