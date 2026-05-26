const API_KEY = import.meta.env.VITE_ANTHROPIC_API_KEY;

export async function fetchNiches() {
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
      // ignore
    }
    throw new Error(errMsg);
  }

  const data = await response.json();

  // Collect all text blocks
  const rawText = (data.content || [])
    .filter((block) => block.type === 'text')
    .map((block) => block.text)
    .join('');

  // Strip markdown wrapper if present
  const stripped = rawText.replace(/^```json\s*/i, '').replace(/```\s*$/i, '');

  // Extract first {...} JSON object
  const match = stripped.match(/\{[\s\S]*\}/);
  if (!match) {
    throw new Error('Не удалось найти JSON в ответе модели');
  }

  const parsed = JSON.parse(match[0]);

  if (!Array.isArray(parsed.niches)) {
    throw new Error('Поле "niches" не является массивом');
  }

  return parsed;
}
