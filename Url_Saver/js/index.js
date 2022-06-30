// creating variables for the various elements
const save_url_el = document.getElementById("save_url_id");
const save_tab_el = document.getElementById("save_tab_id");
const del_el = document.getElementById("del_id");
const input_el = document.getElementById("input_id");
const url_display_el = document.getElementById("url_display_id");

// to hold all the saved urls
let url_array = [];

// Adding event listeners to the buttons
save_url_el.addEventListener("click",save_url);
save_tab_el.addEventListener("click",save_tab);
del_el.addEventListener("dblclick",del_all_urls);


// getting stored urls from local storage
get_key_from_local_storage("url_array");

// saves the url or text saved in the input element
function save_url(){
    url = input_el.value;
    input_el.value = "";
    if (url != ""){
        save_url_to_list(url);
    }
}


// saves the currently opened tab
function save_tab(){
    // console.log(window.location.href);
    // getting the url of the currently opened tab ob the browser
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        url = tabs[0].url;
        save_url_to_list(url);
	})
}


// clears all saved url in local storage
function del_all_urls(){
    url_array = [];
    localStorage.clear();

    render_array_ul_test(url_array, url_display_el);
}


// save a url to the array if not already present
function save_url_to_list(url){

    url = url.trim();

    if (url_array.includes(url) == false){
        url_array.push(url);
        localStorage.setItem("url_array", JSON.stringify(url_array));
        render_array_ul_test(url_array, url_display_el);
    } 
    else{
        alert(`${url} already saved.`)
    }
}


// get the saved urls from local storage and displays them
// saves the urls to an array for the script
function get_key_from_local_storage(key){

    if (( key  in localStorage ) == true){
        url_array = JSON.parse(localStorage.getItem(key));
        render_array_ul_test(url_array, url_display_el);
        // console.log(url_array);
    }
    // else render nothing
}


// renders a array as an unordered list of links
function render_array_ul_test(array, element){

    element.innerHTML = "";

    for(let i = 0; i < array.length; i++){

        // creating a link tag for each url
        let a_el = document.createElement("a");
        a_el.target = "_blank";
        a_el.href = array[i];
        a_el.innerText = array[i];

        // creating a button tag for deleting each url
        let btn_el = document.createElement("button");
        btn_el.classList.add("btn", "btn-danger", "btn-sm", "position-absolute", "end-0", "top-50", "translate-middle-y");
        btn_el.innerText = "delete";
        btn_el.id = i;  // setting the button id to the index of the url in the url_array to get if it is to be deleted
        btn_el.type = "button";

        // creating li tags for each url
        let li_el = document.createElement("li");
        li_el.classList.add("list-group-item", "position-relative");
        li_el.appendChild(a_el);
        li_el.appendChild(btn_el);

        element.appendChild(li_el);

        // Adding an event handler delete a particular url
        btn_el.addEventListener("dblclick", () => {
            url_array.splice(Number(btn_el.id), 1);
            localStorage.setItem("url_array", JSON.stringify(url_array));
            render_array_ul_test(url_array, url_display_el);
        });
    }
}