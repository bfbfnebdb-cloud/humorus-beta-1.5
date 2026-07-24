const en = document.querySelector('.en');
const ru = document.querySelector('.ru');

let currentLang = 'ru';

// Хранилище для значений из форм
const userData = {
    name2: { ru: '', en: '' },
    name3: { ru: '', en: '' },
    old2: { ru: '', en: '' },
    look2: { ru: '', en: '' },
    sleepTime2: { ru: '', en: '' },
    item2: { ru: '', en: '' },
    item3: { ru: '', en: '' },
    partOfBody2: { ru: '', en: '' },
    betray2: { ru: '', en: '' },
    betray3: { ru: '', en: '' },
    Profession2: { ru: '', en: '' },
    curse2: { ru: '', en: '' },
    broke2: { ru: '', en: '' },
    fly2: { ru: '', en: '' },
    game2: { ru: '', en: '' },
    call2: { ru: '', en: '' },
    person2: { ru: '', en: '' },
    party2: { ru: '', en: '' },
    party3: { ru: '', en: '' },
    red2: { ru: '', en: '' },
    wanting2: { ru: '', en: '' },
    miss2: { ru: '', en: '' },
    dogFall2: { ru: '', en: '' },
    fell2: { ru: '', en: '' },
    socks2: { ru: '', en: '' },
    zebra2: { ru: '', en: '' },
    duck2: { ru: '', en: '' },
    sofa2: { ru: '', en: '' },
    cups2: { ru: '', en: '' },
    hug2: { ru: '', en: '' },
    trafficJam2: { ru: '', en: '' },
    fridge2: { ru: '', en: '' },
    reread2: { ru: '', en: '' },
    button2: { ru: '', en: '' },
    laugh2: { ru: '', en: '' },
    realise2: { ru: '', en: '' }
};

// Функция перевода через Google Translate API
async function translateText(text, fromLang, toLang) {
    if (!text || text.trim() === '') return text;
    if (fromLang === toLang) return text;
    
    try {
        const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${fromLang}&tl=${toLang}&dt=t&q=${encodeURIComponent(text)}`;
        const response = await fetch(url);
        
        if (response.ok) {
            const data = await response.json();
            if (data && data[0]) {
                let translated = '';
                for (let i = 0; i < data[0].length; i++) {
                    translated += data[0][i][0];
                }
                return translated;
            }
        }
        return text;
    } catch (error) {
        console.error('Ошибка перевода:', error);
        return text;
    }
}

// Функция для получения полного текста на определенном языке
function getFullText(templateKey, lang) {
    let template = langConfig[lang][templateKey];
    
    const placeholders = {
        '{name2}': userData.name2[lang] || '',
        '{name3}': userData.name3[lang] || '',
        '{old2}': userData.old2[lang] || '',
        '{look2}': userData.look2[lang] || '',
        '{sleepTime2}': userData.sleepTime2[lang] || '',
        '{item2}': userData.item2[lang] || '',
        '{item3}': userData.item3[lang] || '',
        '{partOfBody2}': userData.partOfBody2[lang] || '',
        '{betray2}': userData.betray2[lang] || '',
        '{betray3}': userData.betray3[lang] || '',
        '{Profession2}': userData.Profession2[lang] || '',
        '{curse2}': userData.curse2[lang] || '',
        '{broke2}': userData.broke2[lang] || '',
        '{fly2}': userData.fly2[lang] || '',
        '{game2}': userData.game2[lang] || '',
        '{call2}': userData.call2[lang] || '',
        '{person2}': userData.person2[lang] || '',
        '{party2}': userData.party2[lang] || '',
        '{party3}': userData.party3[lang] || '',
        '{red2}': userData.red2[lang] || '',
        '{wanting2}': userData.wanting2[lang] || '',
        '{miss2}': userData.miss2[lang] || '',
        '{dogFall2}': userData.dogFall2[lang] || '',
        '{fell2}': userData.fell2[lang] || '',
        '{socks2}': userData.socks2[lang] || '',
        '{zebra2}': userData.zebra2[lang] || '',
        '{duck2}': userData.duck2[lang] || '',
        '{sofa2}': userData.sofa2[lang] || '',
        '{cups2}': userData.cups2[lang] || '',
        '{hug2}': userData.hug2[lang] || '',
        '{trafficJam2}': userData.trafficJam2[lang] || '',
        '{fridge2}': userData.fridge2[lang] || '',
        '{reread2}': userData.reread2[lang] || '',
        '{button2}': userData.button2[lang] || '',
        '{laugh2}': userData.laugh2[lang] || '',
        '{realise2}': userData.realise2[lang] || ''
    };
    
    for (let [key, value] of Object.entries(placeholders)) {
        template = template.replace(new RegExp(key, 'g'), value);
    }
    
    return template;
}

// ============================================================
// АНИМАЦИЯ ПЕЧАТИ ТЕКСТА (исправленная)
// ============================================================

function startTypingAnimation(text) {
    const hElement = document.getElementById('h');
    if (!hElement) return;
    
    // Сброс
    hElement.textContent = '';
    hElement.style.width = '0';
    hElement.style.display = 'block';
    hElement.classList.remove('typing', 'typing-done');
    
    // Сохраняем текст
    hElement.setAttribute('data-full-text', text);
    
    // Запускаем анимацию через небольшую задержку
    setTimeout(() => {
        hElement.textContent = text;
        hElement.classList.add('typing');
    }, 300);
    
    // Вычисляем длительность анимации в зависимости от длины текста
    // (но не более 4 секунд, чтобы не слишком долго)
    const duration = Math.min(text.length * 80, 4000);
    setTimeout(() => {
        hElement.classList.remove('typing');
        hElement.classList.add('typing-done');
        hElement.style.width = '100%';
        // border-right убирается через CSS класс .typing-done
    }, duration + 500);
}

// Переключение на английский
en.onclick = function(){
    en.style.display = 'none';
    ru.style.display = 'block';
    currentLang = 'en';
    updateAllTexts();
}

// Переключение на русский
ru.onclick = function(){
    ru.style.display = 'none';
    en.style.display = 'block';
    currentLang = 'ru';
    updateAllTexts();
}

function updateAllTexts() {
    // Обновляем все тексты с data-lang
    document.querySelectorAll('[data-lang]').forEach(el => {
        const key = el.getAttribute('data-lang');
        if (langConfig[currentLang] && langConfig[currentLang][key]) {
            if (el.tagName === 'INPUT' && el.type === 'button') {
                el.value = langConfig[currentLang][key];
            } else {
                el.innerHTML = langConfig[currentLang][key];
            }
        }
    });
    
    // Обновляем h с анимацией
    const hElement = document.getElementById('h');
    if (hElement) {
        const key = hElement.getAttribute('data-lang');
        if (langConfig[currentLang] && langConfig[currentLang][key]) {
            const newText = langConfig[currentLang][key];
            const currentText = hElement.getAttribute('data-full-text');
            
            if (currentText !== newText) {
                startTypingAnimation(newText);
            } else {
                // Если текст тот же, просто показываем без анимации
                hElement.textContent = newText;
                hElement.classList.add('typing-done');
                hElement.style.width = '100%';
                // border-right убирается через CSS
            }
        }
    }
    
    updateSantaText();
    updatePhilosopherText();
}

function updateSantaText() {
    const santaTextEl = document.querySelector('#SantaText p');
    if (!santaTextEl) return;
    
    const fullText = getFullText('santaText', currentLang);
    santaTextEl.innerHTML = fullText;
}

function updatePhilosopherText() {
    const philosopherTextEl = document.querySelector('#philosopherText p');
    if (!philosopherTextEl) return;
    
    const fullText = getFullText('philosopherText', currentLang);
    philosopherTextEl.innerHTML = fullText;
}

function Santa(){
    document.getElementById('form1').style.display = 'block';
    document.getElementById('h').style.display = 'none';
    document.getElementById('SantaText').style.display = 'none';
    document.getElementById('form2').style.display = 'none';
    document.getElementById('philosopherText').style.display = 'none';
}

async function submit(){
    // Получаем значения из формы
    const name = document.getElementById('name').value;
    const old = document.getElementById('old').value;
    const broke = document.getElementById('broke').value;
    const sleepTime = document.getElementById('sleepTime').value;
    const fly = document.getElementById('fly').value;
    const betray = document.getElementById('betray').value;
    const curse = document.getElementById('curse').value;
    const partOfBody = document.getElementById('partOfBody').value;
    const red = document.getElementById('red').value;
    const Profession = document.getElementById('Profession').value;
    const game = document.getElementById('game').value;
    const dogFall = document.getElementById('dogFall').value;
    const party = document.getElementById('party').value;
    const miss = document.getElementById('miss').value;
    const item = document.getElementById('item').value;
    const wanting = document.getElementById('wanting').value;
    const look = document.getElementById('look').value;
    const call = document.getElementById('call').value;
    const person = document.getElementById('person').value;

    // Сохраняем значения на русском языке
    const values = {
        name2: name, name3: name, old2: old, broke2: broke,
        sleepTime2: sleepTime, fly2: fly, betray2: betray, betray3: betray,
        curse2: curse, partOfBody2: partOfBody, red2: red,
        Profession2: Profession, game2: game, dogFall2: name,
        party2: party, party3: party, miss2: miss, item2: item,
        item3: item, wanting2: wanting, look2: look, call2: call,
        person2: person
    };

    for (let key in values) {
        userData[key]['ru'] = values[key];
    }

    // 1. Собираем полный текст на русском языке
    const russianFullText = getFullText('santaText', 'ru');
    console.log('Исходный русский текст:', russianFullText);
    
    // 2. Переводим полный текст на английский язык
    const englishFullText = await translateText(russianFullText, 'ru', 'en');
    console.log('Перевод на английский:', englishFullText);
    
    // 3. Если текущий язык сайта - русский, переводим обратно на русский
    let finalText = russianFullText;
    if (currentLang === 'ru') {
        finalText = await translateText(englishFullText, 'en', 'ru');
        console.log('Финальный русский текст (с правильными падежами):', finalText);
    } else {
        finalText = englishFullText;
    }
    
    document.getElementById('form1').style.display = 'none';
    const santaTextEl = document.getElementById('SantaText');
    santaTextEl.style.display = 'block';
    santaTextEl.querySelector('p').innerHTML = finalText;
}

function philosopher(){
    document.getElementById('h').style.display = 'none';
    document.getElementById('SantaText').style.display = 'none';
    document.getElementById('form1').style.display = 'none';
    document.getElementById('form2').style.display = 'block';
    document.getElementById('philosopherText').style.display = 'none';
}

async function submitsec(){
    const fell = document.getElementById('fell').value;
    const socks = document.getElementById('socks').value;
    const zebra = document.getElementById('zebra').value;
    const duck = document.getElementById('duck').value;
    const sofa = document.getElementById('sofa').value;
    const cups = document.getElementById('cups').value;
    const hug = document.getElementById('hug').value;
    const trafficJam = document.getElementById('trafficJam').value;
    const fridge = document.getElementById('fridge').value;
    const reread = document.getElementById('reread').value;
    const button = document.getElementById('button').value;
    const laugh = document.getElementById('laugh').value;
    const realise = document.getElementById('realise').value;

    const values = {
        fell2: fell, socks2: socks, zebra2: zebra, duck2: duck,
        sofa2: sofa, cups2: cups, hug2: hug, trafficJam2: trafficJam,
        fridge2: fridge, reread2: reread, button2: button,
        laugh2: laugh, realise2: realise
    };

    for (let key in values) {
        userData[key]['ru'] = values[key];
    }

    const russianFullText = getFullText('philosopherText', 'ru');
    console.log('Исходный русский текст:', russianFullText);
    
    const englishFullText = await translateText(russianFullText, 'ru', 'en');
    console.log('Перевод на английский:', englishFullText);
    
    let finalText = russianFullText;
    if (currentLang === 'ru') {
        finalText = await translateText(englishFullText, 'en', 'ru');
        console.log('Финальный русский текст (с правильными падежами):', finalText);
    } else {
        finalText = englishFullText;
    }
    
    document.getElementById('form2').style.display = 'none';
    const philosopherTextEl = document.getElementById('philosopherText');
    philosopherTextEl.style.display = 'block';
    philosopherTextEl.querySelector('p').innerHTML = finalText;
}

const langConfig = {
    ru: {
        nav1:"Письмо деду Морозу",
        nav2:"Я философ",
        let2:"1. Как твое имя?",
        let3:"2. Сколько тебе лет?",
        let4:"3. Что чаще всего ломается ?",
        let5:"4. Во сколько ты ложишся спать?",
        let6:"5. Что обычно любят мухи ?",
        let7:"6. Напиши любую фразу",
        let8:"7. Как бы ты назвал человека, который предал тебя ?",
        let9:"8. Какое ты знаешь ругательство? Ругнись!",
        let10:"9. Любимая часть твоего тела ?",
        let11:"10. Что бывает красным ?",
        let12:"11. Профессия?",
        let13:"12. Любимая детская игра?",
        let14:"13. Что будет собаке, если скинуть её с 9-го этажа ?",
        let15:"14. Каково обычно после большой пьянки?",
        let16:"15. Чего не хватает в твоем доме?",
        let17:"16. Бытовой предмет",
        let18:"17. Чего тебе хочется сейчас ?",
        let19:"18. Место где не станут искать",
        let20:"19. Как зовут твою собаку ? Если нет, то как бы ты её назвал ?",
        let21:"20. Нехороший человек - ...",
        let22:"1. Что произошло, когда я решил стать философом?",
        let23:"2. Сколько носков я нашел в стиральной машине?",
        let24:"3. Ходила ли зебра в школу?",
        let25:"4. Что пыталась сделать утка в пруду?",
        let26:"5. Что было внутри моего мягкого дивана?",
        let27:"6. Сколько чашек кофе я выпил утром?",
        let28:"7. Кого я обнимал после кофе?",
        let29:"8. Сколько минут мне потребовалось, чтобы попасть в пробку?",
        let30:"9. Сколько раз я проверял холодильник?",
        let31:"10. Что мне удалось перечитать в маршрутке?",
        let32:"11. Какую кнопку я нажал, не прикасаясь к ней?",
        let33:"12. Как долго я смеялся над этим?",
        let34:"13. Что я понял в конце концов?",
        textHelper:"Здравствуйте, это сайт humoruos",
        qest:"Тестовые вопросы",
        submitBtn: "Подтвердить",
        santaText: 'Здравствуй Дедушка Мороз ! Меня зовут {name2}. Мне {old2} лет ! Не много не мало, но я верю и надеюсь в то, что ты есть и сейчас читаешь моё письмо. Моя мама очень злая тётя. Она не разрешает писать мне письма тебе, и поэтому я сижу в {look2} и пишу это письмо. Мама выпускает меня гулять только до {sleepTime2}. Когда я её не слушаюсь, она бросает в меня {item2} и частенько попадает мне прямо в {partOfBody2} = Однажды я не вытерпел и сказал ей: "{betray2}". Мой папа работает {Profession2} и приходя с работы с плохим настроением, он кричит: "{curse2}" И заставляет меня чинить его {broke2}. Но я не умею ничего ремонтировать, и поэтому у меня получается {fly2}. Он злится ещё сильнее, и запрещает мне играть в {game2} с друзьями. Ещё папа придумал мне кличку, и зовёт меня не {name3}, а {call2} ! Это очень обидно. В общем, дедушка мороз, если ты не {person2}, то ты поймёшь как мне {party2}. Дорогой Дедушка мороз - красный {red2} забери меня к себе или вышли мне {item3}. Ещё сделай так, что бы близкие мне люди любили меня и почаще давали мне денег на {wanting2}. Любимый дед мороз, ты мой последний шанс. Я надеюсь на новый год я найду под ёлочкой {miss2}. Дед Мороз, пойми как мне {party3}. Если ты не прочтёшь это письмо или оно не дойдёт до тебя, мне {dogFall2}. Помни что я верю в тебя {betray3} !',
        philosopherText: 'Я вчера решил стать философом. Начал с того, что уронил {fell2} — и понял, что Вселенная просто издевается. Потом заглянул в стиральную машину и нашёл там {socks2} носка, хотя закидывал четыре. В холодильнике темно, только если не открывать дверцу — проверял {fridge2} раза. Увидел в зоопарке зебру и подумал: учиться ей явно {zebra2}. Утка на пруду пыталась {duck2}, хотя никто её не просил — может, у неё кризис среднего возраста. Диван я купил мягкий, но внутри оказались {sofa2}, похожие на камни. Выпил утром {cups2} чашки кофе — и наконец-то обнял {hug2}. В маршрутке ехал так медленно, что успел перечитать {reread2}, а в пробке, когда никуда не спешил, — приехал за {trafficJam2} минут. Включил музыку, а там уже играла моя же песня — нажал {button2}, хотя пальцем не касался. Смеялся над этим {laugh2}. Значит, {realise2}.'
    },
    en: {
        nav1: "Letter to Santa Claus",
        nav2: "I am a philosopher",
        let2: "1. What is your name?",
        let3: "2. How old are you?",
        let4: "3. What time do you go to sleep?",
        let5: "4. What breaks most often?",
        let6: "5. What do flies usually like?",
        let7: "6. Write any phrase",
        let8: "7. What would you call a person who betrayed you?",
        let9: "8. What curse word do you know? Swear!",
        let10: "9. Your favorite part of your body?",
        let11: "10. What is red?",
        let12: "11. Profession?",
        let13: "12. Favorite children's game?",
        let14: "13. What will happen to a dog if you throw it off the 9th floor?",
        let15: "14. How do you feel after a big party?",
        let16: "15. What is missing in your house?",
        let17: "16. Household item",
        let18: "17. What do you want right now?",
        let19: "18. A place where they won't look",
        let20: "19. What is your dog's name? If not, what would you name it?",
        let21: "20. A bad person - ...",
        let22: "1. What happened when I decided to become a philosopher?",
        let23: "2. How many socks did I find in the washing machine?",
        let24: "3. Did the zebra go to school?",
        let25: "4. What was the duck trying to do in the pond?",
        let26: "5. What was inside my soft sofa?",
        let27: "6. How many cups of coffee did I drink in the morning?",
        let28: "7. Who did I hug after coffee?",
        let29: "8. How many minutes did it take me to get into a traffic jam?",
        let30: "9. How many times did I check the refrigerator?",
        let31: "10. What did I manage to re-read on the minibus?",
        let32: "11. What button did I press without touching it?",
        let33: "12. How long did I laugh about it?",
        let34: "13. What did I realize in the end?",
        textHelper: "Hello, this is a humorous website",
        qest: "Test questions",
        submitBtn: "Confirm",
        santaText: 'Hello Santa Claus! My name is {name2}. I am {old2} years old! Not too many, not too few, but I believe and hope that you exist and are reading my letter right now. My mother is a very mean aunt. She does not allow me to write letters to you, so I am sitting in {look2} and writing this letter. Mom lets me go for a walk only until {sleepTime2}. When I disobey her, she throws {item2} at me and often hits me right in the {partOfBody2}. Once I could not stand it and told her: "{betray2}". My dad works as a {Profession2} and when he comes home from work in a bad mood, he yells: "{curse2}" And makes me fix his {broke2}. But I do not know how to fix anything, so I end up with {fly2}. He gets even angrier and forbids me to play {game2} with my friends. Dad also gave me a nickname and calls me not {name3}, but {call2}! It is very offensive. In short, Santa Claus, if you are not {person2}, then you will understand how {party2} I feel. Dear Santa Claus - red {red2} take me to you or send me {item3}. Also make sure that my loved ones love me and give me money more often for {wanting2}. Dear Santa, you are my last chance. I hope that on New Year\'s I will find {miss2} under the Christmas tree. Santa, understand how {party3} I feel. If you do not read this letter or it does not reach you, I will {dogFall2}. Remember that I believe in you {betray3}!',
        philosopherText: 'Yesterday I decided to become a philosopher. I started by dropping {fell2} — and realized that the Universe is just messing with me. Then I looked into the washing machine and found {socks2} sock, even though I put in four. It is dark in the refrigerator, only if you do not open the door — I checked {fridge2} times. I saw a zebra at the zoo and thought: she clearly needs to study {zebra2}. A duck in the pond was trying to {duck2}, even though nobody asked her — maybe she is having a midlife crisis. I bought a soft sofa, but inside there were {sofa2}, like stones. I drank {cups2} cups of coffee in the morning — and finally hugged {hug2}. I was riding the minibus so slowly that I managed to re-read {reread2}, and in a traffic jam, when I was in no hurry, I arrived in {trafficJam2} minutes. I turned on the music, and my own song was already playing — I pressed {button2}, even though I did not touch it. I laughed about it {laugh2}. So, {realise2}.'
    }
};

// Запускаем при загрузке страницы
document.addEventListener("DOMContentLoaded", () =>{
    currentLang = 'ru';
    
    // Обновляем все тексты
    document.querySelectorAll('[data-lang]').forEach(el => {
        const key = el.getAttribute('data-lang');
        if (langConfig[currentLang] && langConfig[currentLang][key]) {
            if (el.tagName === 'INPUT' && el.type === 'button') {
                el.value = langConfig[currentLang][key];
            } else {
                el.innerHTML = langConfig[currentLang][key];
            }
        }
    });
    
    updateSantaText();
    updatePhilosopherText();
    
    // Запускаем анимацию печати для h
    const hElement = document.getElementById('h');
    if (hElement) {
        const text = langConfig['ru']['textHelper'];
        startTypingAnimation(text);
    }
});