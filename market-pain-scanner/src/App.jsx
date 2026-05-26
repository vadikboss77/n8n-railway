import { useState } from 'react';
import COLORS from './constants';
import { fetchNiches } from './api';
import Header from './components/Header';
import ScanButton from './components/ScanButton';
import LoadingLog from './components/LoadingLog';
import NicheTable from './components/NicheTable';

const LOG_MESSAGES = [
  'Подключение к источникам...',
  'Сканирую Reddit...',
  'Сканирую Product Hunt...',
  'Анализирую паттерны...',
  'Генерирую отчёт...',
];

export default function App() {
  const [niches, setNiches] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [logs, setLogs] = useState([]);
  const [error, setError] = useState(null);

  async function handleScan() {
    setError(null);
    setLogs([]);
    setIsLoading(true);

    let logIndex = 0;
    const interval = setInterval(() => {
      if (logIndex < LOG_MESSAGES.length) {
        setLogs((prev) => [...prev, LOG_MESSAGES[logIndex]]);
        logIndex++;
      }
    }, 600);

    try {
      const data = await fetchNiches();
      clearInterval(interval);
      setNiches(data.niches);
    } catch (err) {
      clearInterval(interval);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: COLORS.bgDark,
        color: '#FFFFFF',
      }}
    >
      <Header isLoading={isLoading} />

      <ScanButton onClick={handleScan} isLoading={isLoading} />

      {isLoading && <LoadingLog logs={logs} isLoading={isLoading} />}

      {error && (
        <div
          style={{
            margin: '0 32px 32px',
            padding: '16px 24px',
            backgroundColor: '#2A0A0A',
            border: '1px solid #FF4444',
            color: '#FF4444',
            fontFamily: 'monospace',
            fontSize: '14px',
          }}
        >
          ⚠️ Ошибка: {error}
        </div>
      )}

      {niches.length > 0 && <NicheTable niches={niches} />}
    </div>
  );
}
