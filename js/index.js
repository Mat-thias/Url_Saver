const save_url_el = document.getElementById("save_url_id");
const save_tab_el = document.getElementById("save_tab_id");
const del_el = document.getElementById("del_id");
const input_el = document.getElementById("input_id");
const url_display_el = document.getElementById("url_display_id");


let url_array = [];

// Adding event listeners to the buttons
save_url_el.addEventListener("click",save_url);
save_tab_el.addEventListener("click",save_tab);
del_el.addEventListener("dblclick",del_all_urls);


// getting stored urls from local storage
get_key_from_local_storage("url_array");


function save_url(){
    url = input_el.value;
    if (url != ""){
        save_url_to_list(url);
    }

}

function save_tab(){
    // console.log(window.location.href);

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        url = tabs[0].url;
        save_url_to_list(url);
	})

}

function del_all_urls(){
    url_array = [];
    localStorage.clear();

    render_array_ul(url_array, url_display_el);

}

function save_url_to_list(url){

    url = url.trim();

    if (url_array.includes(url) == false){
        url_array.push(url);
        localStorage.setItem("url_array", JSON.stringify(url_array));
        input_el.value = "";
        render_array_ul(url_array, url_display_el);    
    } 
    else{
        alert(`${url} already saved.`)
    }

}

function render_array_ul(array, element){

    ul_str = "<ul>";

    for(let i = 0; i < array.length; i++){
        ul_str += `<li id="li_${i}"><a target="_blank"  href="${array[i]}">${array[i]}&bnsp;</a><button type="submit">delete</button></li>`;
    }

    ul_str += "</ul>";

    // console.log(ul_str);

    element.innerHTML = ul_str;

}

function get_key_from_local_storage(key){

    if (( key  in localStorage ) == true){
        url_array = JSON.parse(localStorage.getItem(key));
        render_array_ul(url_array, url_display_el);    
        // console.log(url_array);
    }
}
