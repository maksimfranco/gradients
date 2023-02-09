import { createElTextClass } from './helpers.js'
const DATA = {
    default: {
        direction: 90,
        index: 11
    },
    gradient: [
        ['#f1f2b5', '#135058'],
        ['#114357', '#f29492'],
        ['#bdc3c7', '#2c3e50'],
        ['#0f2027', '#203a43', '#2c5364'],
        ['#aa4b6b', '#6b6b83', '#2c5364'],
        ['#1f4037', '#99f2c8'],
        ['#dd3e54', '#6be585'],
        ['#544a7d', '#ffd452'],
        ['#59c173', '#a17fe0', '#5d26c1'],
        ['#005aa7', '#fffde4'],
        ['#355c7d', '#6c5b7b', '#c06c84'],
        ['#3e5151', '#decba4'],
        ['#108dc7', '#ef8e38'],
        ['#23074d', '#cc5333'],
        ['#00f260', '#0575e6'],
        ['#e1eec3', '#f05053'],
        ['#22c1c3', '#fdbb2d'],
        ['#1c92d2', '#f2fcfe'],
        ['#3a1c71', '#d76d77', '#ffaf7b'],
        ['#283c86', '#45a247'],
        ['#30e8bf', '#ff8235'],
        ['#34e89e', '#0f3443'],
        ['#43c6ac', '#191654'],
        ['#f0f2f0', '#000c40'],
        ['#f3904f', '#3b4371'],
        ['#3a6186', '#89253e'],
        ['#ffd89b', '#19547b'],
        ['#2196f3', '#f44336'],
        ['#ff5f6d', '#ffc371'],
        ['#ffc371', '#ffc371'],
        ['#ba5370', '#f4e2d8'],
        ['#4b79a1', '#283e51'],
        ['#4da0b0', '#d39d38'],
        ['#114357', '#f29492'],
        ['#304352', '#d7d2cc'],
        ['#f1f2b5', '#135058'],
        ['#00bf8f', '#001510'],
        ['#70e1f5', '#ffd194'],
        ['#649173', '#dbd5a4'],
        ['#283048', '#859398'],
        ['#3d7eaa', '#ffe47a'],
        ['#003973', '#e5e5be'],
        ['#cc95c0', '#dbd4b4', '#7aa1d2'],
        ['#77a1d3', '#79cbca', '#7aa1d2'],
        ['#00467f', '#a5cc82'],
        ['#2a0f1e', '#c89f64'],
        ['#ff94fa', '#ffff47'],
        ['#808ac8', '#ff819d', '#eac23a'],
        ['#ebf2bd', '#438cbb'],
        ['#72db70', '#dbd870', '#db7070'],
        ['#fdb68b', '#cb8b9f', '#79738d'],
        ['#150c66', '#bf495d', '#f0cd84'],
        ['#ff8349', '#e567b3', '#3b84db'],
        ['#6b7bc6', '#b16fc0', '#e6629e', '#ff666b', '#f68231'],
        ['#90dbf4', '#cfbaf0', '#fde4cf'],
        ['#ea628b', '#f4b1f5', '#b3b2f5'],
        ['#d7cde9', '#e9cde2', '#e9e7cd'],
        ['#757575', '#c38f7b', '#be905c']
    ],
    help: [
        'Привет! Я подготовил для вас более пятидесяти градиентов.',
        'Вы можете менять их, используя стрелки, поворачивать, сохранять код градиента и самих цветов.',
        'Спасибо за внимание. Хороших вам градиентов!'
    ]
}
export function createGradientPack() {
    // контейнер
    const container = document.querySelector('main')
    container.dataset.index = DATA.default.index
    container.dataset.direction = DATA.default.direction
    container.addEventListener('click', checkClick)
    // дополнительно
    updateGradient()
    createHelp(DATA.help)
}
function addNavigation() {
    // контейнер
    const container = document.querySelector('main')
    // содержимое
    const navigation = createElTextClass('ul', null, 'gradient_navigation', 'close')
    const rotate = createElTextClass('li', 'Повернуть')
    rotate.dataset.role = 'rotate'
    const code = createElTextClass('li', 'Скопировать')
    code.dataset.role = 'code'
    navigation.append(rotate, code)
    // появление
    container.append(navigation)
    // раскрытие
    setTimeout(() => {
        navigation.classList.remove('close')
    }, 500)
    // дополнительно
    addColorButtons()
}
function addColorButtons() {
    let buttons = document.querySelectorAll('[data-color]')
    if (buttons) {
        for (let button of buttons) {
            button.remove()
        }
    }
    const container = document.querySelector('[data-role="rotate"]')
    let index = document.querySelector('[data-index]').dataset.index
    for (let color of DATA.gradient[index]) {
        let listitem = document.createElement('li')
        listitem.dataset.role = 'color'
        listitem.dataset.color = color
        listitem.style.backgroundColor = color
        listitem.style.width = `calc(100% / ${DATA.gradient[index].length}`
        container.before(listitem)
    }
}
function addArrows() {
    // контейнер
    const container = document.querySelector('main')
    // содержимое
    const previous = createElTextClass('button', null, 'arrow', 'close')
    previous.dataset.role = 'prev'
    const next = createElTextClass('button', null, 'arrow', 'close')
    next.dataset.role = 'next'
    // появление
    container.append(previous, next)
    // раскрытие
    setTimeout(() => {
        previous.classList.remove('close')
        next.classList.remove('close')
    }, 500)
}
function checkClick(event) {
    switch (event.target.dataset.role) {
        case 'prev':
            changeGradientIndex('prev')
            break
        case 'next':
            changeGradientIndex('next')
            break
        case 'rotate':
            changeGradientDirection()
            break
        case 'code':
            saveGradientCode()
            break
        case 'color':
            saveColorCode(event.target.dataset.color)
            break
    }
}
function changeGradientIndex(prevornext) {
    let index = document.querySelector('[data-index]').dataset.index
    // проверяем клик (назад/вперёд)
    switch (prevornext) {
        case 'prev':
            if (index === '0') {
                index = DATA.gradient.length - 1
            } else {
                index--
            }
            break
        case 'next':
            if (index == DATA.gradient.length - 1) {
                index = 0
            } else {
                index++
            }
            break
    }
    // обновляем фон и текущий индекс
    document.querySelector('[data-index]').dataset.index = index
    console.log(`Новый индекс: ${index}`)
    addColorButtons()
    updateGradient()
}
function changeGradientDirection() {
    let direction = document.querySelector('[data-direction]').dataset.direction
    if (direction === '0') {
        direction = 315
    } else {
        direction = +direction - 45
    }
    document.querySelector('[data-direction]').dataset.direction = direction
    console.log(`Новое направление: ${direction}`)
    updateGradient()
}
function constructGradient() {
    const direction = document.querySelector('[data-direction]').dataset.direction
    const index = document.querySelector('[data-index]').dataset.index
    return `linear-gradient(${direction}deg, ${DATA.gradient[index].join(', ')})`
}
function updateGradient() {
    document.querySelector('main').style.background = constructGradient()
}
function saveGradientCode() {
    navigator.clipboard.writeText(constructGradient())
    console.log(`Скопированный код: ${constructGradient()}`)
}
function saveColorCode(color) {
    navigator.clipboard.writeText(color)
    console.log(`Скопированный цвет: ${color}`)
}
function createHelp(help) {
    // контейнер
    const container = document.querySelector('main')
    // содержимое
    const helpContainer = createElTextClass('div', null, 'help')
    helpContainer.addEventListener('click', checkHelpClick)
    // кнопки закрыть и следующая подсказка
    const helpNavigation = createElTextClass('div', null, 'help_navigation')
    const close = createElTextClass('button', 'Закрыть')
    close.dataset.role = 'help_close'
    const next = createElTextClass('button', 'Продолжить')
    next.dataset.role = 'help_next'
    next.dataset.curhelp = 0
    helpNavigation.append(close, next)
    // содержимое подсказки
    const helpContent = createElTextClass('div', null, 'help_content')
    const text = createElTextClass('p', help[0])
    helpContent.append(text)
    // добавление содержимого
    helpContainer.append(helpContent, helpNavigation)
    // появление
    container.append(helpContainer)
    // раскрытие
    setTimeout(() => {
        helpContainer.classList.add('open')
    }, 500)
    // дополнительно
    function checkHelpClick(event) {
        switch (event.target.dataset.role) {
            case 'help_close':
                helpContainer.classList.remove('open')
                setTimeout(() => {
                    helpContainer.remove()
                    addNavigation()
                    addArrows()
                }, 500)
                break
            case 'help_next':
                helpContainer.classList.replace('open', 'tighten')
                setTimeout(() => {
                    let current = Number(event.target.dataset.curhelp) + 1
                    text.textContent = help[Number(current)]
                    if (Number(current) !== help.length - 1) {
                        next.dataset.curhelp = current
                    } else {
                        next.remove()
                    }
                    helpContainer.classList.replace('tighten', 'open')
                }, 500)
                break
        }
    }
}
