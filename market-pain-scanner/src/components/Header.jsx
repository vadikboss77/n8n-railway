import COLORS from '../constants';

export default function Header({ isLoading }) {
  return (
    <header
      style={{
        backgroundColor: COLORS.bgCard,
        borderBottom: `1px solid ${COLORS.cyan}`,
        padding: '20px 32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <div>
        <h1
          style={{
            margin: 0,
            fontFamily: 'monospace',
            fontSize: '28px',
            fontWeight: 'bold',
            color: COLORS.cyan,
            letterSpacing: '4px',
          }}
        >
          MARKET PAIN SCANNER
        </h1>
        <p
          style={{
            margin: '6px 0 0',
            fontSize: '12px',
            color: COLORS.gray,
            letterSpacing: '1px',
          }}
        >
          Анализ трендовых болей рынка через Reddit · Product Hunt · Indie Hackers
        </p>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span
          className={isLoading ? 'blink' : undefined}
          style={{
            display: 'inline-block',
            width: '10px',
            height: '10px',
            borderRadius: '50%',
            backgroundColor: isLoading ? COLORS.green : COLORS.gray,
          }}
        />
        <span
          style={{
            fontFamily: 'monospace',
            fontSize: '12px',
            color: isLoading ? COLORS.green : COLORS.gray,
            letterSpacing: '2px',
          }}
        >
          {isLoading ? 'LIVE' : 'IDLE'}
        </span>
      </div>
    </header>
  );
}
