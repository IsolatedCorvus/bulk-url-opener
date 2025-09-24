//! client must allow pop-ups and re-directs for multiple links to open

const textArea = document.getElementById("url-input");
const linkList = document.getElementById("link-list");
const urlRegEx = /https?:\/\/[^\s]*/ig;

const btnOptions = document.querySelector(".btn-container");

// Events
const btn = document.getElementById("btn-submit");
btn.addEventListener("click", handleUserInput);

document.getElementById("open-all").addEventListener("click", openAll);
document.getElementById("clear-all").addEventListener("click", clear);


// TODO: button only active when VALID link is available.
// Buttons inactive while text-area is empty
/*
btn.setAttribute("disabled", true);

textArea.addEventListener("input", () => {
    if(textArea.value.length){
        console.log("HERE");
        btn.removeAttribute("disabled");
    }
});
*/


let importedLinks = [];

function handleUserInput() {
    if (!textArea.value) {
        // display popup then hide
        const popUpWarning = document.querySelector(".warning-pop-up");
        popUpWarning.classList.remove("hide");
        setTimeout(() => popUpWarning.classList.add("hide"), 2000);
    }
    // window.open(textArea.value);

    let userInput = textArea.value;

    // clear previous input
    importedLinks = [];
    linkList.innerHTML = "";
    btnOptions.classList.remove("hide");
    btn.setAttribute("disabled", false);

    // for concatenated links with no clear delimitors
    //* .matchAll() returns an iterator, spread operator to place into array []
    const httpRegEx = /https?/ig;
    if([...userInput.matchAll(httpRegEx)].length > 1) {
        userInput = linkSeperator(userInput);
    }

    // .exec() returns null if match fails, else returns array of matches
    let arrMatch;
    while ((arrMatch = urlRegEx.exec(userInput)) !== null) {
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

function linkSeperator(userInput){
    // splits string
    let urlArr = userInput.split("http");
    urlArr.shift(); // removing first empty element, when delimiter is the beginning of string

    // adds protocol back to urls and concatenates array with clear " " delimitor
    return urlArr = urlArr.map((url) => "http" + url).join(" ");
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
    // btn.setAttribute("disabled", true);
}

//TODO: ???
function inputSanitationandValidation(){

}

// https://youtu.be/T1EJZsaqevU
// https://youtu.be/buvWBOZTfdc
// https://www.youtube.com/watch?v=XJC5WB2Bwrc

// https://youtu.be/T1EJZsaqevUhttps://youtu.be/buvWBOZTfdchttps://www.youtube.com/watch?v=XJC5WB2Bwrc