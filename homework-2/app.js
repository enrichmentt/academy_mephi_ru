const sourceJson = `{
  "event": {
    "title": "Ночь в музее",
    "date": "15 ноября, 18:30",
    "place": "Музей космонавтики, проспект Мира, 111",
    "description": "Вечерняя программа с выставкой и экскурсиями",
    "meeting": "Сбор: 18:30. Начало: 19:00."
  },
  "services": [
    { "id": "guide", "title": "  Экскурсия с гидом  ", "price": 500 },
    { "id": "audio", "title": "Аудиогид", "price": 350 },
    { "id": "catalog", "title": "Каталог выставки", "price": 250 }
  ]}`;

function buildReport(services, guideChecked, audioChecked, catalogChecked) {
    const checks = [guideChecked, audioChecked, catalogChecked];
    const selected = services.filter((service, index) => checks[index]);
    const items = selected.map(({ title, price }) => ({ title: title.trim(), price }));
    const total = items.reduce((sum, item) => sum + item.price, 0);
    return {
        count: items.length,
        total: total,
        items: items
    };
}

let data;
try {
    data = JSON.parse(sourceJson);
} catch (err) {
    document.querySelector('#data-error').hidden = false;
}

if (data) {
    document.querySelector('#service-form').hidden = false;

    document.querySelector('#show-program').addEventListener('click', () => {
        const program = document.querySelector('#program');
        program.hidden = false;
        program.innerHTML = data.event.meeting;
    });

    document.querySelector('#service-form').addEventListener('submit', (event) => {
        event.preventDefault();
        const guideChecked = document.querySelector('#guide').checked;
        const audioChecked = document.querySelector('#audio').checked;
        const catalogChecked = document.querySelector('#catalog').checked;
        const report = buildReport(data.services, guideChecked, audioChecked, catalogChecked);

        const choiceError = document.querySelector('#choice-error');
        const result = document.querySelector('#result');
        const reportJson = document.querySelector('#report-json');

        if (report.count === 0) {
            choiceError.hidden = false;
            result.hidden = true;
            reportJson.hidden = true;
        } else {
            choiceError.hidden = true;
            result.hidden = false;
            reportJson.hidden = false;

            const titlesHtml = report.items.map(item => item.title).join('<br>');
            result.innerHTML = 'Выбрано услуг: ' + report.count + '<br>Итого: ' + report.total + ' руб.<br>' + titlesHtml;

            const jsonStr = JSON.stringify(report);
            JSON.parse(jsonStr);
            reportJson.textContent = jsonStr;
        }
    });
}
