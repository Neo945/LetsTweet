
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

export default function lookup(method, endpoint,callBack,data){
    let jsonData;
    if (data){
      jsonData = JSON.stringify(data)
    }
    const csrf = getCookie('csrftoken')
    const con = new XMLHttpRequest()
    const url = `http://localhost:8000/${endpoint}`
    con.responseType = 'json'
    con.open(method,url)
    con.setRequestHeader('Content-Type','application/json')
    con.setRequestHeader('Accept','application/json')
    if(csrf){
        con.setRequestHeader("HTTP_X_REQUESTED_WITH", "XMLHttpRequest")
        con.setRequestHeader("X-Requested-With", "XMLHttpRequest")
        con.setRequestHeader("X-CSRFToken", csrf)
    }
    con.onload = function () {
        // console.log(con.response)
        callBack(con.response,con.status)
    }
    con.send(jsonData)
  }
  