// import './App.css';
import React,{ useEffect, useState } from 'react'


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
// action="/create-tweet" 
function TweetComponent(props){
  const tweetAreaRef = React.createRef()
  const onSubmitClicked = (event)=>{
    event.preventDefault()
    const val = tweetAreaRef.current.value
    tweetAreaRef.current.value = null
    
  }
  return (
  <div className="row mb-3">
    <div className="col-md-4 mx-auto col-10">
      <form method="POST" onSubmit={onSubmitClicked} className="form" id="tweet-form">
        <input type="hidden" value="/" name="next"/>
          <textarea ref={tweetAreaRef} required={true} className="form-control" name="content" id="clear" placeholder="Your Tweet"></textarea>
        <button className="btn btn-primary" type="submit">Submit</button>
      </form>
  </div>
</div>

)
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
    // console.log(likes,props.tweet.id)
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
    <button 
      className='btn btn-outline-primary btn-sm' 
      onClick={handleAction}
    >
      {display}
    </button>
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
      <TweetComponent />
        {tweet.map(
          (tweet)=>{
            return (<div key={`buttonSet-${tweet.id}`}>
              <Tweet tweet={tweet} />
              <ActionButton tweet={tweet} action='like'/>
              <ActionButton tweet={tweet} action='retweet'/>
            </div>)
        }
          )}
    </div>
  );
}

export default App;
