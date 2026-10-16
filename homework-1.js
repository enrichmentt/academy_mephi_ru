const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function askQuestion(query) {
    return new Promise((resolve) => rl.question(query, resolve));
}

// --- Задача 1: Билетная касса ---
function ticketPrice(category) {
    switch (category) {
        case 1: return 300;
        case 2: return 500;
        case 3: return 900;
        default: return 0;
    }
}

function maxTickets(budget, price) {
    let count = 0;
    let currentBudget = budget;
    while (currentBudget >= price) {
        currentBudget -= price;
        count++;
    }
    return count;
}

function printTicketResult(category, budget) {
    const price = ticketPrice(category);
    if (price === 0) {
        console.log('неизвестная категория');
        return;
    }
    const count = maxTickets(budget, price);
    console.log(`Категория ${category}, билет ${price} руб., бюджет ${budget} руб.: можно купить ${count} шт.`);
}

// --- Задача 2: Доставка заказа ---
function deliveryPrice(distance, total) {
    if (total >= 3000) {
        return 0;
    }
    if (distance <= 3) {
        return 0;
    } else if (distance <= 10) {
        return 200;
    } else {
        return 200 + 25 * (distance - 10);
    }
}

function printDelivery(distance, total) {
    const price = deliveryPrice(distance, total);
    console.log(`Расстояние ${distance} км, заказ ${total} руб.: доставка ${price} руб.`);
}

// --- Задача 3: Лестница ---
function printSteps(height) {
    let builtCount = 0;
    for (let i = 1; i <= height; i++) {
        if (i === 4) {
            continue;
        }
        if (i > 10) {
            console.log('Дальше лестница не построена');
            break;
        }
        console.log(`Ступень ${i}`);
        builtCount++;
    }
    console.log(`Всего построено: ${builtCount}`);
}


async function main() {
    console.log('Выберите задачу:');
    console.log('1 — билетная касса');
    console.log('2 — доставка заказа');
    console.log('3 — лестница');

    const choice = await askQuestion('Ваш выбор: ');

    if (choice === '1') {
        const categoryStr = await askQuestion('Категория билета: ');
        const budgetStr = await askQuestion('Бюджет: ');
        const category = parseInt(categoryStr, 10);
        const budget = parseInt(budgetStr, 10);
        printTicketResult(category, budget);
    } else if (choice === '2') {
        const distanceStr = await askQuestion('Расстояние: ');
        const totalStr = await askQuestion('Сумма заказа: ');
        const distance = parseInt(distanceStr, 10);
        const total = parseInt(totalStr, 10);
        printDelivery(distance, total);
    } else if (choice === '3') {
        const heightStr = await askQuestion('Высота лестницы: ');
        const height = parseInt(heightStr, 10);
        printSteps(height);
    } else {
        console.log('такой задачи нет');
    }

    rl.close();
}

main();
