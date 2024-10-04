const query_str = window.location.search;
const params = new URLSearchParams(query_str);
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
search_text.innerText = "";

if (query !== null) {
    function select_last_char() {
        var range = document.createRange();
        var len = search_text.innerText.length;
        range.setStart(search_text.firstChild, len);
        range.setEnd(search_text.firstChild, len);
        var sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
    }

    function type_letter() {
        search_text.innerText += query.charAt(search_text.innerText.length);
        select_last_char();
    }

    function type_letters() {
        return new Promise((resolve) => setTimeout(() => {
            type_letter();
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
            type_letters().then(resolve);
        }, 3000);
    })).then(() => {
        setTimeout(() => {
            step_text.innerText = "Step 2. click on Google search button";

            search_btn.style.animationName = "scale";
            search_btn.style.animationDuration = "1s";
            search_btn.style.animationIterationCount = "infinite";
        }, 1000);
    });
}
