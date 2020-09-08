function check_as_done(item_id) {
    if(document.getElementById(item_id).checked){
        sendRequest('/todo/check/'+item_id)
    }
    else{
        sendRequest('/todo/uncheck/'+item_id)
    }
    console.log(item_id, document.getElementById(item_id).checked)
}

function sendRequest(url) {
    return new Promise((resolve, reject)=>{
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.onreadystatechange=function () {
            if(xhr.readyState === XMLHttpRequest.DONE){
                if(xhr.status != 200){
                    reject();
                }

                resolve(JSON.parse(xhr.responseText));
            }
        }
        xhr.send();
    });
}

function edit_todo(id) {
    const li_el = document.getElementById(id).parentElement

    const editTitle = document.getElementById('edittitle')
    const editText = document.getElementById('edittext')
    const editId = document.getElementById('editid')


    editTitle.value = li_el.querySelector('.item_title').textContent
    editText.value = li_el.querySelector('.item_text').textContent
    editId.value = id

}