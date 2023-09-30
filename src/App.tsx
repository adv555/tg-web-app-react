import { useEffect } from 'react';
import './App.css';

console.log(
  '🚀 ~ file: App.tsx:4 ~ window.Telegram.WebApp;:',
  window.Telegram.WebApp,
);

const tg = window.Telegram.WebApp;

function App() {
  useEffect(() => {
    tg.ready();
  }, []);

  const onClose = () => {
    tg.close();
  };

  return <button onClick={onClose}>Close</button>;
}

export default App;
