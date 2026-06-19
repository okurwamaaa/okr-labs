if (window.self === window.top) {
    document.body.style.backgroundColor = "#e6ffe6";
    setTimeout(() => {
        document.body.style.backgroundColor = "#f5f5f5";
    }, 30000);
}

window.compareStrings = function(str1, str2) {
    if (str1.length > str2.length) alert(str1);
    else if (str2.length > str1.length) alert(str2);
    else alert("Рядки однакові");
};

function showDeveloperInfo(lastName, firstName, position = "Студент") {
    const footer = document.getElementById("dev-footer");
    if (!footer) return;

    footer.onclick = function() {
        alert("Клік по футеру (через властивість)");
    };

    const navLinks = document.querySelectorAll("nav a");
    for(let i = 0; i < navLinks.length; i++) {
        navLinks[i].style.letterSpacing = "1px";
    }

    const infoP = document.createElement("p");
    infoP.append(document.createTextNode(`Розробник: ${lastName} ${firstName} — ${position}`));

    const gitLink = document.createElement("a");
    gitLink.href = "#";
    gitLink.textContent = "Мій GitHub";
    gitLink.onclick = function(e) {
        e.preventDefault();
        window.location.href = "https://github.com/okurwamaaa/okr-labs";
    };

    const tempSpan = document.createElement("span");
    footer.append(tempSpan);
    const separator = document.createElement("span");
    separator.textContent = " | ";
    tempSpan.replaceWith(gitLink);
    gitLink.after(separator);
    footer.prepend(infoP);
}

function initListHighlight() {
    const lists = document.querySelectorAll("ol, ul");
    lists.forEach(list => {
        list.onclick = function(event) {
            if (event.target.tagName === "LI") {
                event.target.classList.toggle("highlighted");
            }
        };
    });
}

function initMenu() {
    const box = document.getElementById("dialogue-box");
    if (!box) return;

    box.innerHTML = `
        <h3 id="menu-title" style="margin-top:0;">Тренування</h3>
        <button data-action="start">Почати</button>
        <button data-action="pause">Пауза</button>
        <button data-action="reset">Скинути</button>
    `;

    class MenuActions {
        constructor(elem) {
            this.elem = elem;
            elem.onclick = this.onClick.bind(this);
        }
        start() { document.getElementById("menu-title").textContent = "Статус: Почато 🟢"; }
        pause() { document.getElementById("menu-title").textContent = "Статус: Пауза 🟡"; }
        reset() { document.getElementById("menu-title").textContent = "Тренування 🔴"; }
        onClick(event) {
            let action = event.target.dataset.action;
            if (action && typeof this[action] === 'function') {
                this[action]();
            }
        }
    }
    new MenuActions(box);
}

function initAdvancedHandlers() {
    const testBtn = document.createElement("button");
    testBtn.textContent = "Тест обробників (натисни мене)";
    testBtn.style.margin = "10px auto";
    testBtn.style.display = "block";
    testBtn.style.padding = "10px";
    testBtn.style.cursor = "pointer";
    testBtn.style.background = "#ffcc00";
    testBtn.style.border = "2px solid #ff6600";
    testBtn.style.fontWeight = "bold";
    testBtn.style.borderRadius = "5px";
    document.body.prepend(testBtn);

    const objHandler = {
        handleEvent(event) {
            alert("Спрацював об'єкт-обробник! Клік відбувся на тегу: " + event.currentTarget.tagName);
        }
    };

    const funcHandler = function(event) {
        console.log("Спрацювала функція-обробник.");
    };

    testBtn.addEventListener("click", objHandler);
    testBtn.addEventListener("click", funcHandler);

    setTimeout(() => {
        testBtn.removeEventListener("click", objHandler);
        testBtn.textContent = "Об'єкт-обробник видалено!";
        testBtn.style.background = "#dddddd";
        testBtn.style.border = "2px solid #999";
    }, 8000);

    document.addEventListener('click', function(event) {
        if (event.target.closest('[data-behavior="log"]')) {
            console.log("Поведінка [log]: клік по", event.target.tagName);
        }
    });
}

function initLab8() {
    const headings = document.querySelectorAll('h2');
    headings.forEach(h2 => {
        h2.addEventListener('mouseover', (e) => {
            e.target.classList.add('hover-active');
            console.log('Курсор прийшов з:', e.relatedTarget);
        });
        h2.addEventListener('mouseout', (e) => {
            e.target.classList.remove('hover-active');
            console.log('Курсор пішов на:', e.relatedTarget);
        });
    });

    const dragImg = document.querySelector('.draggable');
    const dragZone = document.querySelector('.drag-zone');
    let isDragging = false;
    let offsetX = 0;
    let offsetY = 0;

    if (dragImg && dragZone) {
        dragImg.addEventListener('mousedown', (e) => {
            isDragging = true;
            const rect = dragImg.getBoundingClientRect();
            offsetX = e.clientX - rect.left;
            offsetY = e.clientY - rect.top;
            dragImg.style.cursor = 'grabbing';
        });

        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            const zoneRect = dragZone.getBoundingClientRect();
            let newX = e.clientX - zoneRect.left - offsetX;
            let newY = e.clientY - zoneRect.top - offsetY;

            newX = Math.max(0, Math.min(newX, dragZone.clientWidth - dragImg.clientWidth));
            newY = Math.max(0, Math.min(newY, dragZone.clientHeight - dragImg.clientHeight));

            dragImg.style.left = newX + 'px';
            dragImg.style.top = newY + 'px';
        });

        document.addEventListener('mouseup', () => {
            isDragging = false;
            dragImg.style.cursor = 'grab';
        });

        dragImg.ondragstart = () => false;
    }
}

if (window.self === window.top) {
    showDeveloperInfo("Іщук", "Володимир");
    initMenu();
    initAdvancedHandlers();
}
initListHighlight();
initLab8();