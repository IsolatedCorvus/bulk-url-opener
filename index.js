const textArea = document.getElementById("url-input");
const btn = document.getElementById("btn-submit");

const linkList = document.getElementById("link-list");

const httpRegEX = /https?:\/\//i;

btn.addEventListener("click", handleLinks);

// TODO: button only active when VALID link is available.
// btn.setAttribute("disabled", true);

//TODO: window.open(url)

//TODO: use RegEx to validate urls

function handleLinks(e){
    if(!textArea.value){
        console.log("Empty Text Field");
    }

    // window.open(textArea.value);

    if(httpRegEX.exec(textArea.value)){
        linkList.innerHTML += `
            <article class="link-list-item">
                <p>${textArea.value}</p>
            </article>
        `;
    }
}