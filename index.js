const textArea = document.getElementById("url-input");
const linkList = document.getElementById("link-list");
const httpRegEX = /https?:\/\/.*/ig;

const btnOptions = document.querySelector(".btn-container");

// Events
const btn = document.getElementById("btn-submit");
btn.addEventListener("click", handleUserInput);

document.getElementById("open-all").addEventListener("click", openAll);
document.getElementById("clear-all").addEventListener("click", clear);


// TODO: button only active when VALID link is available.
// btn.setAttribute("disabled", true);

//TODO: use RegEx to validate urls

let importedLinks = [];

function handleUserInput(e) {
    if (!textArea.value) {
        // display popup then hide
        const popUpWarning = document.querySelector(".warning-pop-up");
        popUpWarning.classList.remove("hide");
        setTimeout(() => popUpWarning.classList.add("hide"), 2000);
    }
    // window.open(textArea.value);

    // clear previous input
    importedLinks = [];
    linkList.innerHTML = "<h2>URLs:</h2>";
    btnOptions.classList.remove("hide");


    //TODO: fix concatenated line of urls, try to seperate
    // .exec() returns null if match fails, else returns array of matches
    let arrMatch;
    while ((arrMatch = httpRegEX.exec(textArea.value)) !== null) {
        // console.log(arrMatch[0]);

        importedLinks.push(arrMatch[0]);
        console.log(importedLinks);

        linkList.innerHTML += `
            <article class="link-list-item">
                <p>${arrMatch[0]}</p>
            </article>
        `;
    }
    linkUpdator();
}

function linkUpdator() {
    // apply click events to each item, opens links using: window.open(url)
    const links = document.querySelectorAll(".link-list-item");
    links.forEach((link, index) => {
        link.addEventListener("click", () => {
            // console.log(importedLinks[index]);
            window.open(importedLinks[index]);
        });
    });
}

function openAll() {
    for (const link of importedLinks) {
        window.open(link);
    }
}

function clear() {
    importedLinks = [];
    linkList.innerHTML = "<h2>URLs:</h2>";
    const btnOptions = document.querySelector(".btn-container");
    btnOptions.classList.add("hide");
}


function inputSanitationandValidation(){

}


//! client must allow pop-ups and re-directs for multiple links to open


// https://youtu.be/T1EJZsaqevU
// https://youtu.be/buvWBOZTfdc
// https://www.youtube.com/watch?v=XJC5WB2Bwrc

// https://youtu.be/T1EJZsaqevUhttps://youtu.be/buvWBOZTfdchttps://www.youtube.com/watch?v=XJC5WB2Bwrc