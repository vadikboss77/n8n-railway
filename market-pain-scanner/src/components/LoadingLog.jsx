import COLORS from '../constants';

export default function LoadingLog({ logs, isLoading }) {
  if (!isLoading) return null;

  return (
    <div
      style={{
        margin: '0 32px 32px',
        backgroundColor: COLORS.bgCard,
        border: `1px solid ${COLORS.green}`,
        padding: '20px 24px',
        fontFamily: 'monospace',
        fontSize: '14px',
        color: COLORS.green,
        minHeight: '120px',
      }}
    >
      {logs.map((line, i) => (
        <div key={i} style={{ marginBottom: '4px' }}>
          {'> '}
          {line}
        </div>
      ))}
      {logs.length > 0 && (
        <div>
          {'> '}
          <span className="blink">▋</span>
        </div>
      )}
    </div>
  );
}
