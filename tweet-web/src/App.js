// import './App.css';
import { useEffect, useState } from 'react'


function Loadtweets(callBack) {
  const con = new XMLHttpRequest()
  const responseType = 'json'
  const method = 'GET'
  const url = 'http://localhost:8000/tweets'
  let l = "";
  con.responseType = responseType
  con.open(method,url)
  con.onload = function () {
    callBack(con.response,con.status)
  }
  con.send()
}


function Tweet(props){
  return (
    <div className='col-12 border py-3 mb-4 tweet' id={`tweet-${props.tweet.id}`}>
        <p>{props.tweet.content}</p></div>
  )
}

function ActionButton(props) {
  return (
    <button class='btn btn-outline-primary btn-sm'>{props.tweet.likes} LIKE</button>
  )
}


function App() {
  const [tweet,setTweet] = useState([])


  useEffect(()=>{
    const callBack = (response,status)=>{
      if (status === 200){
        setTweet(response)
      }
    }
    Loadtweets(callBack)
  },[])

  return (
    <div className="root">
        {tweet.map(
          (tweet,index)=>{
            return (<div>
              <Tweet tweet={tweet} key={index}/>
              <ActionButton tweet={tweet} key={index}/>
            </div>)
        }
          )}
    </div>
  );
}

export default App;
