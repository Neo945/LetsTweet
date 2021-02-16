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
    <div className='col-12 border py-3 mb-4 tweet' id={`t-${props.tweet.id}`}>
        <p>{props.tweet.id}. {props.tweet.content}</p></div>
  )
}
const getCaps = (str) => str.charAt(0).toUpperCase() + str.slice(1)

function ActionButton(props) {
  let display = getCaps(props.action)
  const [likes,setLikes] = useState(props.tweet.likes)
  const [userLiked,setDidUserLiked] = useState(props.tweet.likes!==0)
  const handleAction = (event)=> {
    // console.log(props.tweet.id)
    if(userLiked){
      setLikes(likes - 1)
      setDidUserLiked(false)  
    }else{
      setLikes(likes + 1)
      setDidUserLiked(true)  
    }
  }
  display = props.action==='like'? (likes===0 ? display :  likes + ' ' + display) : display
  return (
    <button className='btn btn-outline-primary btn-sm' onClick={handleAction}>{display}</button>
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
          (tweet)=>{
            return (<div>
              <Tweet tweet={tweet} key={`tweet-${tweet.id}`}/>
              <ActionButton tweet={tweet} key={`like-${tweet.id}`} action='like'/>
              <ActionButton tweet={tweet} key={`retweet-${tweet.id}`} action='retweet'/>
            </div>)
        }
          )}
    </div>
  );
}

export default App;
