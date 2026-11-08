// Готовая защитная механика. Не изменяйте эту функцию.
function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')
}

function selectAttempts(filter) {
  const attempts = window.reportData.attempts

  if (filter === 'passed') {
    return attempts.filter((attempt) => attempt.passed)
  }

  if (filter === 'failed') {
    return attempts.filter((attempt) => !attempt.passed)
  }

  return attempts
}

function renderAttempts(attempts) {
  let markup = ''

  attempts.forEach((attempt) => {
    markup += `<li class="result-item"><span class="result-name">${escapeHtml(attempt.name)}</span> — ${attempt.score} из ${attempt.questionCount} (${attempt.percentage}%)</li>`
  })

  document.querySelector('#result-list').innerHTML = markup
}

function startFilter() {
  const form = document.querySelector('#filter-form')
  const select = form.querySelector('#filter')
  const counter = document.querySelector('#result-count')

  form.addEventListener('submit', (event) => {
    event.preventDefault()

    const filter = select.value
    const allAttempts = window.reportData.attempts
    const attempts = selectAttempts(filter)

    counter.textContent = `Показано: ${attempts.length} из ${allAttempts.length}`
    renderAttempts(attempts)
  })
}

startFilter()
