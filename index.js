//! client must allow pop-ups and re-directs for multiple links to open

const textArea = document.getElementById("url-input");
const linkList = document.getElementById("link-list");
const urlRegEx = /https?:\/\/[^\s]*/ig;

const btnOptions = document.querySelector(".btn-container");

// Events
const submitBtn = document.getElementById("btn-submit");
submitBtn.addEventListener("click", handleUserInput);

document.getElementById("open-all").addEventListener("click", openAll);
document.getElementById("clear-all").addEventListener("click", () => clear(1));

// Links Array
let importedLinks = [];

// Event Flag
let enableClickEvent = true;


//TODO: debounce event
// Button is only active when text-area has input
let submitBtnTimer;
submitBtn.setAttribute("disabled", true);
textArea.addEventListener("input", () => {
    clearTimeout(submitBtnTimer);
    submitBtnTimer = setTimeout(() => {
        console.log("HERE");
        textArea.value.length ? submitBtn.removeAttribute("disabled") : submitBtn.setAttribute("disabled", true);
    }, 100);
});

// TODO: able to selectively remove links from link-list
// TODO: able to edit specific link list item

function handleUserInput() {
    const httpRegEx = /https?/ig;
    let userInput = textArea.value;

    // empty input or no urls, then display popup -> hide
    if (!httpRegEx.test(userInput)) {
        displayPopUp("Please input URL(s)");
        return;
    }

    // for concatenated links with no clear delimitors
    //* .matchAll() returns an iterator, spread operator to place into array []
    if ([...userInput.matchAll(httpRegEx)].length > 1) {
        userInput = linkSeperator(userInput);
    }

    // clear previous input
    clear(0);

    // .exec() returns null if match fails, else returns array of matches
    let arrMatch;
    while ((arrMatch = urlRegEx.exec(userInput)) !== null) {
        importedLinks.push(arrMatch[0]);
        console.log(importedLinks);

        linkList.innerHTML +=
            ` <article class="link-list-item">
                <span class="edit-link-item" title="Edit">E</span>
                <input class="list-editable-text display-none" type="text" name="" id="" required>
                <p class="list-text">${arrMatch[0]}</p>
                <span class="remove-link-item" title="Remove">X</span>
            </article>`
    }
    linkUpdator();
}

function linkUpdator() {
    // apply click events to each item, opens links using: window.open(url)
    const links = document.querySelectorAll(".link-list-item");
    links.forEach((link, index) => {
        link.addEventListener("click", () => {
            // opens only if flag is true
            if(enableClickEvent) window.open(importedLinks[index]);
            // console.log(importedLinks[index]);
        });
    });

    // removeable links
    const removeLinkBtns = document.querySelectorAll(".remove-link-item");
    removeLinkBtns.forEach((link, index) => {
        link.addEventListener("click", (e) => {
            link.parentElement.remove();     // remove the parent element (link-list-item)
            importedLinks.splice(index, 1);  // remove from the array
            console.log(importedLinks);
            e.stopPropagation();  // stops from opening the link
        });
    });

    // editable links
    const editLinkBtns = document.querySelectorAll(".edit-link-item");
    editLinkBtns.forEach((link, index) => {
        link.addEventListener("click", e => {
            e.stopPropagation();  // stops from opening the link

            let newURL = link.parentNode.querySelector(".list-editable-text");
            let currentURL = link.parentNode.querySelector(".list-text");

            // toggles between current url or editable text field
            if (newURL.classList.contains("display-none")) {
                newURL.classList.remove("display-none");
                currentURL.classList.add("display-none");
                enableClickEvent = false;  // temporarily disables link opening
            } else {
                newURL.classList.add("display-none");
                currentURL.classList.remove("display-none");
                enableClickEvent = true;  //re-enables

                // updates array of links to new inputs
                importedLinks.splice(index, 1, currentURL.innerHTML);
                console.log("BRUH", importedLinks);
            }

            newURL.addEventListener("input", e => {
                urlRegEx.test(e.target.value)
                    ? currentURL.innerHTML = e.target.value
                    : displayPopUp("Needs to be Valid URL");
            });
        });
    });
}

function linkSeperator(userInput) {
    // splits string
    let urlArr = userInput.split("http");
    urlArr.shift(); // removing first empty element, when delimiter is the beginning of string

    // adds protocol back to urls and concatenates array with clear " " delimitor
    return urlArr = urlArr.map((url) => "http" + url).join(" ");
}

function openAll() {
    for (const link of importedLinks) {
        window.open(link);  // window.open(url)
    }
}

function clear(mode = 0) {   // mode 0 - clear previous, mode 1 - clear all
    importedLinks = [];
    linkList.innerHTML = "";
    const btnOptions = document.querySelector(".btn-container");
    mode
        ? btnOptions.classList.add("hide")
        : btnOptions.classList.remove("hide");
}

// Dynamic Popup
function displayPopUp(msg = ""){
    const popUpWarning = document.querySelector(".warning-pop-up");
    popUpWarning.classList.remove("hide");
    popUpWarning.innerHTML = `<h2>${msg}</h2>`;
    setTimeout(() => popUpWarning.classList.add("hide"), 2000);
}

//TODO: ???
function inputSanitationandValidation() {

}

/*
https://youtu.be/T1EJZsaqevU
https://youtu.be/buvWBOZTfdc
https://www.youtube.com/watch?v=XJC5WB2Bwrc

https://youtu.be/T1EJZsaqevUhttps://youtu.be/buvWBOZTfdchttps://www.youtube.com/watch?v=XJC5WB2Bwrc

https://youtu.be/T1EJZsaqevU https://youtu.be/buvWBOZTfdc https://www.youtube.com/watch?v=XJC5WB2Bwrc
*/