import React,{useState,useEffect} from 'react'
import ActionButton from './ActionButton'
import TweetComponent from './TweetCompound'
import Tweet from './Tweet'
function Loadtweets(callBack){
    fetch('http://localhost:8000/tweets').then(res => res.json()).then(data => {
      console.log(data)
      callBack(data,200)
    })
  }
  
  
export function TweetContent() {
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
export default TweetContent