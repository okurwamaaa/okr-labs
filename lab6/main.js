document.body.style.backgroundColor = "#e6ffe6";
setTimeout(function() {
    document.body.style.backgroundColor = "#f5f5f5";
}, 30000);

window.compareStrings = function(str1, str2) {
    if (str1.length > str2.length) {
        alert(str1);
    } else if (str2.length > str1.length) {
        alert(str2);
    } else {
        alert("Рядки однакові");
    }
};

function showDeveloperInfo(lastName, firstName, position = "Студент") {
    const footer = document.getElementById("dev-footer");
    if (!footer) return;

    const navLinks = document.querySelectorAll("nav a");
    for(let i = 0; i < navLinks.length; i++) {
        navLinks[i].style.letterSpacing = "1px";
    }

    const infoP = document.createElement("p");
    const textNode = document.createTextNode(`Розробник: ${lastName} ${firstName} — ${position}`);
    infoP.append(textNode);

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

    console.log("outerHTML футера:", footer.outerHTML);
}

function initDialogue() {
    const box = document.getElementById("dialogue-box");
    if (!box) return;

    let options = ["Маса", "Сила", "Рельєф"];
    let html = `<h3 id="d-title">Вибери ціль тренувань:</h3>`;
    
    for (let i = 0; i < options.length; i++) {
        html += `<button class="d-btn">${options[i]}</button>`;
    }
    html += `<button id="d-close">Закрити</button>`;
    
    box.innerHTML = html;

    const title = document.getElementById("d-title");
    console.log("nodeValue заголовка:", title.firstChild.nodeValue);

    const buttons = box.querySelectorAll(".d-btn");
    buttons.forEach(btn => {
        btn.onclick = function() {
            let choice = btn.textContent;
            if (choice === "Маса") {
                box.innerHTML = `<p>Роби базу: 8-10 повторень з вагою.</p><button id="d-close">Ок</button>`;
            } else if (choice === "Сила") {
                box.innerHTML = `<p>Мало повторень, максимальна вага!</p><button id="d-close">Ок</button>`;
            } else {
                box.innerHTML = `<p>Кардіо та багатоповторка на турніках.</p><button id="d-close">Ок</button>`;
            }
            document.getElementById("d-close").onclick = function() {
                box.remove();
            };
        };
    });

    document.getElementById("d-close").onclick = function() {
        box.remove();
    };
}

showDeveloperInfo("Іщук", "Володимир");
initDialogue();