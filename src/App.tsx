import { useEffect } from 'react';
import './App.css';
import { useTelegram } from './hooks/useTelegram';

function App() {
  const { tg, onToggleButton } = useTelegram();

  useEffect(() => {
    tg.ready();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return <button onClick={onToggleButton}>Close</button>;
}

export default App;
