const params = new URLSearchParams(window.location.search);
const query = params.get("q");

const search_text = document.getElementById("searchtext");
const step_text = document.getElementById("step");
const search_btn = document.getElementById("search");

const edit_search_text = (e) => query === null ? null : e.preventDefault();
search_text.contentEditable = true;
search_text.oncut = edit_search_text;
search_text.onpaste = edit_search_text;
search_text.onkeydown = edit_search_text;
search_text.ondragenter = edit_search_text;
search_text.ondragleave = edit_search_text;
search_text.ondragover = edit_search_text;
search_text.ondrop = edit_search_text;

if (query !== null) {
    search_text.innerText = "";

    function select_last_char() {
        window.getSelection().setPosition(search_text.firstChild, search_text.innerText.length);
    }

    function type_letters() {
        return new Promise((resolve) => setTimeout(() => {
            search_text.innerText += query.charAt(search_text.innerText.length);
            select_last_char();

            if (search_text.innerText.length < query.length) {
                type_letters().then(resolve);
            } else {
                resolve();
            }
        }, 100));
    }

    step_text.innerText = "Step 1. type your question";
    (new Promise((resolve) => {
        setTimeout(() => {
            window.getSelection().selectAllChildren(search_text);
            type_letters().then(resolve);
        }, 3000);
    })).then(() => {
        setTimeout(() => {
            step_text.innerText = "Step 2. click on Google search button";

            search_btn.style.animationName = "scale";
            search_btn.style.animationDuration = "1s";
            search_btn.style.animationIterationCount = "infinite";

            search_btn.onclick = () => {
                window.location = "https://www.google.com/search" + window.location.search;
                step_text.innerText = "c'mon do i really need to teach you this?";
            };
        }, 1000);
    });
} else {
    search_btn.innerText = "Get URL";
    search_btn.onclick = () => {
        var p = new URL(window.location);
        p.searchParams.set("q", search_text.innerText);
        step_text.innerText = `Normal search: ${p}\nImage search: ${p}&udm=2`;
    };
}
