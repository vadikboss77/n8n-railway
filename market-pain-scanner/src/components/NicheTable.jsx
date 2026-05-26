import { Fragment, useState } from 'react';
import COLORS from '../constants';
import ExpandedRow from './ExpandedRow';

function getDemandColor(demand) {
  if (demand >= 8) return COLORS.green;
  if (demand >= 6) return COLORS.cyan;
  if (demand >= 4) return COLORS.orange;
  return COLORS.gray;
}

function getComplexityColor(complexity) {
  if (complexity === 'Лёгкая') return COLORS.green;
  if (complexity === 'Средняя') return COLORS.cyan;
  if (complexity === 'Сложная') return COLORS.pink;
  return COLORS.gray;
}

const COLUMNS = ['#', 'Ниша / Боль', 'Аудитория', 'Спрос', 'Время MVP', 'Сложность', 'Стек'];

export default function NicheTable({ niches }) {
  const [expandedRow, setExpandedRow] = useState(null);

  function toggleRow(index) {
    setExpandedRow((prev) => (prev === index ? null : index));
  }

  return (
    <div style={{ margin: '0 32px 48px', overflowX: 'auto' }}>
      <table
        style={{
          width: '100%',
          borderCollapse: 'collapse',
          fontFamily: 'monospace',
          fontSize: '14px',
        }}
      >
        <thead>
          <tr style={{ backgroundColor: COLORS.bgCard }}>
            {COLUMNS.map((col) => (
              <th
                key={col}
                style={{
                  padding: '14px 16px',
                  textAlign: 'left',
                  color: COLORS.cyan,
                  textTransform: 'uppercase',
                  letterSpacing: '2px',
                  fontSize: '11px',
                  borderBottom: `1px solid ${COLORS.cyan}`,
                  whiteSpace: 'nowrap',
                }}
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {niches.map((niche, index) => {
            const isExpanded = expandedRow === index;
            const isEven = index % 2 === 0;
            const rowBg = isExpanded
              ? `${COLORS.cyan}18`
              : isEven
              ? COLORS.bgRow
              : COLORS.bgCard;
            const demandColor = getDemandColor(niche.demand);

            return (
              <Fragment key={niche.rank}>
                <tr
                  onClick={() => toggleRow(index)}
                  style={{
                    backgroundColor: rowBg,
                    cursor: 'pointer',
                    borderLeft: isExpanded ? `3px solid ${COLORS.cyan}` : '3px solid transparent',
                    transition: 'background-color 0.15s',
                  }}
                  onMouseEnter={(e) => {
                    if (!isExpanded) {
                      e.currentTarget.style.backgroundColor = isEven
                        ? '#232335'
                        : '#1e1e2e';
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = rowBg;
                  }}
                >
                  {/* Rank */}
                  <td style={{ padding: '14px 16px', color: COLORS.gray, fontWeight: 'bold' }}>
                    {niche.rank}
                  </td>

                  {/* Title */}
                  <td
                    style={{
                      padding: '14px 16px',
                      color: '#FFFFFF',
                      fontWeight: 'bold',
                      maxWidth: '220px',
                    }}
                  >
                    {niche.title}
                  </td>

                  {/* Audience */}
                  <td style={{ padding: '14px 16px', color: COLORS.gray, maxWidth: '180px' }}>
                    {niche.audience}
                  </td>

                  {/* Demand */}
                  <td style={{ padding: '14px 16px', minWidth: '80px' }}>
                    <span style={{ color: demandColor, fontWeight: 'bold' }}>{niche.demand}</span>
                    <div
                      style={{
                        marginTop: '4px',
                        height: '4px',
                        width: '60px',
                        backgroundColor: COLORS.bgDark,
                        borderRadius: '2px',
                        overflow: 'hidden',
                      }}
                    >
                      <div
                        style={{
                          height: '100%',
                          width: `${(niche.demand / 10) * 100}%`,
                          backgroundColor: demandColor,
                          borderRadius: '2px',
                          transition: 'width 0.4s ease',
                        }}
                      />
                    </div>
                  </td>

                  {/* MVP Time */}
                  <td style={{ padding: '14px 16px', color: COLORS.orange, whiteSpace: 'nowrap' }}>
                    {niche.mvp_time}
                  </td>

                  {/* Complexity */}
                  <td style={{ padding: '14px 16px' }}>
                    <span
                      style={{
                        color: getComplexityColor(niche.complexity),
                        fontWeight: 'bold',
                      }}
                    >
                      {niche.complexity}
                    </span>
                  </td>

                  {/* Stack */}
                  <td style={{ padding: '14px 16px', color: COLORS.gray, maxWidth: '200px' }}>
                    {niche.stack}
                  </td>
                </tr>

                {isExpanded && <ExpandedRow niche={niche} />}
              </Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
