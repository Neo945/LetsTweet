export default function Loadtweets(callBack){
    fetch('http://localhost:8000/tweets').then(res => res.json()).then(data => {
      console.log(data)
      callBack(data,200)
    })
  }
