import React,{useState,useEffect} from 'react'
import ActionButton from './ActionButton'
import Tweet from './Tweet'
import Loadtweets from './LoadAllTweets'
  
  
export default function TweetList(props) {
    const [tweetinit,setTweetinit] = useState([])
    const [tweets,setTweets] = useState([])
    const [tweetsDidSet,setTweetsDidSet] = useState(false) 
    useEffect(()=>{
        if([...props.newTweet].concat(tweetinit).length !== tweets.length){
            setTweets([...props.newTweet].concat(tweetinit))
        }
    },[props.newTweet,tweets,tweetinit])

    useEffect(()=>{
      if (tweetsDidSet === false){
        const callBack = (response,status)=>{
            setTweetinit(response)
            setTweetsDidSet(true)
        }
        Loadtweets(callBack)  
      }
    },[setTweetinit,tweetsDidSet])
  
    return (
      <div className="root">
          {tweets.map(
            (tweet)=>{
              return (<div key={`buttonSet-${tweet.id}`}>
                <Tweet tweet={tweet} />
                <ActionButton tweet={tweet} action='like' />
                <ActionButton tweet={tweet} action='retweet'/>
              </div>)
          }
            )}
      </div>
    );
  }