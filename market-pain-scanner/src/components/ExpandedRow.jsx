import COLORS from '../constants';

export default function ExpandedRow({ niche }) {
  return (
    <tr>
      <td
        colSpan={7}
        style={{
          backgroundColor: COLORS.bgDark,
          padding: '16px 24px',
          borderBottom: `1px solid ${COLORS.cyan}`,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '24px',
            flexWrap: 'wrap',
          }}
        >
          {/* Sources */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <span
              style={{
                fontFamily: 'monospace',
                fontSize: '11px',
                color: COLORS.gray,
                letterSpacing: '2px',
                textTransform: 'uppercase',
              }}
            >
              ИСТОЧНИКИ
            </span>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {(niche.sources || []).map((src, i) => (
                <span
                  key={i}
                  style={{
                    backgroundColor: COLORS.bgRow,
                    color: COLORS.cyan,
                    fontSize: '11px',
                    fontFamily: 'monospace',
                    padding: '4px 10px',
                    borderRadius: '12px',
                    border: `1px solid ${COLORS.gray}`,
                  }}
                >
                  {src}
                </span>
              ))}
            </div>
          </div>

          {/* Architecture button */}
          <button
            onClick={() =>
              alert(`Строим архитектуру: ${niche.title} — напиши мне это!`)
            }
            style={{
              fontFamily: 'monospace',
              fontSize: '13px',
              fontWeight: 'bold',
              letterSpacing: '1px',
              padding: '10px 20px',
              backgroundColor: 'transparent',
              color: COLORS.pink,
              border: `1px solid ${COLORS.pink}`,
              cursor: 'pointer',
              transition: 'background-color 0.2s',
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = COLORS.pink;
              e.currentTarget.style.color = COLORS.bgDark;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = COLORS.pink;
            }}
          >
            🏗️ СТРОИМ АРХИТЕКТУРУ →
          </button>
        </div>
      </td>
    </tr>
  );
}
