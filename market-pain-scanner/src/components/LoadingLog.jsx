import COLORS from '../constants';

// Компонент всегда рендерится только если родитель решил его показать (isLoading && ...)
// Поэтому лишняя проверка isLoading внутри не нужна
export default function LoadingLog({ logs }) {
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
      {/* Курсор виден сразу — даже до первого лог-сообщения */}
      <div>
        {'> '}
        <span className="blink">▋</span>
      </div>
    </div>
  );
}
