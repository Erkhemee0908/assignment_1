import React, { useState } from 'react';
import './App.css';
import Prompt from './components/prompt/prompt';
import List from './components/list/list';

function App() {

  //Created state to trigger useEffect hook in List component
  const [update, setUpdte] = useState(false)

  return (
    <div className="App">
      <header className="App-header">
        <img src="https://cdn.shopify.com/s/files/1/1061/1924/products/Smiling_Emoji_Icon_-_Blushed_large.png?v=1571606114" className="App-logo" alt="logo" />
        <Prompt toggleUpdate={() => { setUpdte(!update) }} />
      </header>
      <List update />
    </div>
  );
}

export default App;
