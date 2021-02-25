function lookup(method, endpoint,callBack,data){
  let jsonData;
  if (data){
    jsonData = JSON.stringify(data)
  }
  const con = new XMLHttpRequest()
  const url = `http://localhost:8000/${endpoint}`
  con.responseType = 'json'
  con.open(method,url)
  con.onload = function () {
    callBack(con.response,con.status)
  }
  con.send(jsonData)
}


export default function Loadtweets(callBack){
  lookup('GET','tweets',callBack)
}