import { useState } from 'react';
import COLORS from '../constants';

export default function ScanButton({ onClick, isLoading }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '48px 32px' }}>
      <button
        onClick={onClick}
        disabled={isLoading}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          fontFamily: 'monospace',
          fontSize: '18px',
          fontWeight: 'bold',
          letterSpacing: '3px',
          padding: '18px 48px',
          backgroundColor: hovered && !isLoading ? COLORS.cyan : COLORS.bgCard,
          color: hovered && !isLoading ? COLORS.bgDark : COLORS.cyan,
          border: `2px solid ${COLORS.cyan}`,
          cursor: isLoading ? 'not-allowed' : 'pointer',
          opacity: isLoading ? 0.6 : 1,
          transition: 'background-color 0.2s, color 0.2s',
          outline: 'none',
        }}
      >
        {isLoading ? '⏳ АНАЛИЗИРУЮ...' : '⚡ СКАНИРОВАТЬ РЫНОК'}
      </button>
    </div>
  );
}
