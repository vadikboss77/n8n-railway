const API_KEY = import.meta.env.VITE_ANTHROPIC_API_KEY;
const USE_MOCK = import.meta.env.VITE_MOCK_API === 'true';

// ─── Mock данные для тестирования без реального API ───────────────────────────
const MOCK_NICHES = {
  niches: [
    {
      rank: 1,
      title: 'AI-ассистент для юридических документов',
      audience: 'Малый бизнес, ИП, фрилансеры',
      demand: 10,
      mvp_time: '3 недели',
      complexity: 'Средняя',
      stack: 'Next.js, Claude API, PDF.js, Supabase',
      sources: ['Reddit r/legaladvice', 'Product Hunt', 'Indie Hackers'],
    },
    {
      rank: 2,
      title: 'Автоматизация onboarding для SaaS',
      audience: 'Product-менеджеры, стартапы',
      demand: 9,
      mvp_time: '2 недели',
      complexity: 'Средняя',
      stack: 'React, Node.js, OpenAI, Stripe',
      sources: ['Indie Hackers', 'Product Hunt', 'Twitter/X'],
    },
    {
      rank: 3,
      title: 'Трекер привычек с AI-коучингом',
      audience: 'Студенты, молодые специалисты 18–35',
      demand: 9,
      mvp_time: '2 недели',
      complexity: 'Лёгкая',
      stack: 'React Native, Firebase, Claude API',
      sources: ['Reddit r/selfimprovement', 'App Store reviews'],
    },
    {
      rank: 4,
      title: 'Генератор UX-исследований',
      audience: 'UX/Product дизайнеры',
      demand: 8,
      mvp_time: '1 неделя',
      complexity: 'Лёгкая',
      stack: 'Vue.js, Anthropic API, Notion API',
      sources: ['Product Hunt', 'Designer News', 'Reddit r/UXDesign'],
    },
    {
      rank: 5,
      title: 'AI-помощник для code review',
      audience: 'Junior и middle разработчики',
      demand: 8,
      mvp_time: '3 недели',
      complexity: 'Средняя',
      stack: 'TypeScript, GitHub API, Claude API, Vercel',
      sources: ['GitHub Discussions', 'Dev.to', 'Hacker News'],
    },
    {
      rank: 6,
      title: 'Парсер и суммаризатор email-рассылок',
      audience: 'Менеджеры, маркетологи',
      demand: 7,
      mvp_time: '10 дней',
      complexity: 'Лёгкая',
      stack: 'Python, Gmail API, Claude API, React',
      sources: ['Product Hunt', 'Reddit r/productivity'],
    },
    {
      rank: 7,
      title: 'Конструктор опросов с AI-анализом',
      audience: 'HR-менеджеры, исследователи',
      demand: 7,
      mvp_time: '2 недели',
      complexity: 'Средняя',
      stack: 'React, FastAPI, PostgreSQL, Claude API',
      sources: ['Indie Hackers', 'LinkedIn Groups'],
    },
    {
      rank: 8,
      title: 'Автоматический тайм-трекер по задачам',
      audience: 'Фрилансеры, агентства',
      demand: 6,
      mvp_time: '2 недели',
      complexity: 'Средняя',
      stack: 'Electron, SQLite, React, Node.js',
      sources: ['Reddit r/freelance', 'Hacker News', 'Product Hunt'],
    },
    {
      rank: 9,
      title: 'Генератор технических спецификаций',
      audience: 'Tech leads, CTO стартапов',
      demand: 6,
      mvp_time: '1 неделя',
      complexity: 'Лёгкая',
      stack: 'Next.js, Markdown, Claude API, Tailwind',
      sources: ['Hacker News', 'Indie Hackers'],
    },
    {
      rank: 10,
      title: 'Платформа микро-курсов с AI-адаптацией',
      audience: 'EdTech компании, корпоративное обучение',
      demand: 5,
      mvp_time: '6 недель',
      complexity: 'Сложная',
      stack: 'React, Django, PostgreSQL, Claude API, AWS',
      sources: ['Product Hunt', 'Reddit r/elearning', 'LinkedIn'],
    },
  ],
};

async function fetchNichesMock() {
  // Имитируем задержку API (~3 секунды)
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return MOCK_NICHES;
}

// ─── Реальный API запрос ───────────────────────────────────────────────────────
async function fetchNichesReal() {
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': API_KEY,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1500,
      system:
        'Ты аналитик рынка SaaS/приложений. Анализируй боли пользователей на Reddit, Product Hunt, Indie Hackers. Отвечай ТОЛЬКО валидным JSON без Markdown.',
      messages: [
        {
          role: 'user',
          content: `Найди 10 трендовых ниш/болей для SaaS-продуктов прямо сейчас.
Верни JSON объект с массивом "niches". Каждый элемент содержит поля:
- rank (число 1-10)
- title (название ниши/боли, строка)
- audience (целевая аудитория, строка)
- demand (спрос от 1 до 10, число)
- mvp_time (время на MVP, строка, например "2 недели")
- complexity (строго одно из: "Лёгкая" | "Средняя" | "Сложная")
- stack (рекомендуемый стек технологий, строка)
- sources (массив строк — источники: Reddit, Product Hunt, Indie Hackers и т.д.)

Отсортируй по полю demand по убыванию. Отвечай ТОЛЬКО JSON, без пояснений.`,
        },
      ],
    }),
  });

  if (!response.ok) {
    let errMsg = `HTTP ${response.status}`;
    try {
      const errData = await response.json();
      errMsg = errData?.error?.message || errMsg;
    } catch {
      // ignore — используем статус код как сообщение
    }
    throw new Error(errMsg);
  }

  const data = await response.json();

  // Collect all text blocks
  const rawText = (data.content || [])
    .filter((block) => block.type === 'text')
    .map((block) => block.text)
    .join('');

  if (!rawText.trim()) {
    throw new Error('Модель вернула пустой ответ');
  }

  // Strip markdown wrapper if present
  const stripped = rawText.replace(/^```json\s*/i, '').replace(/```\s*$/i, '').trim();

  // Сначала пробуем распарсить весь ответ как JSON (модель могла ответить чисто)
  let parsed = null;
  try {
    parsed = JSON.parse(stripped);
  } catch {
    // Если не вышло — ищем первый {...} через RegExp
    const match = stripped.match(/\{[\s\S]*\}/);
    if (!match) {
      throw new Error('Не удалось найти JSON в ответе модели');
    }
    try {
      parsed = JSON.parse(match[0]);
    } catch {
      throw new Error('Некорректный JSON в ответе модели');
    }
  }

  if (!Array.isArray(parsed.niches)) {
    throw new Error('Поле "niches" не является массивом');
  }

  return parsed;
}

// ─── Экспорт: мок или реальный запрос в зависимости от VITE_MOCK_API ──────────
export function fetchNiches() {
  if (USE_MOCK) {
    console.info('[api] 🟡 MOCK MODE — реальный запрос не выполняется');
    return fetchNichesMock();
  }
  return fetchNichesReal();
}
