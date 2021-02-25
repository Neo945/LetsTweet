import React,{useState,useEffect} from 'react'
import ActionButton from './ActionButton'
import Tweet from './Tweet'
import Loadtweets from './LoadAllTweets'
  
  
export default function TweetList(props) {
    const [tweetinit,setTweetinit] = useState([])
    const [tweets,setTweets] = useState([])
    useEffect(()=>{
        if([...props.newTweet].concat(tweetinit).length !== tweets.length){
            setTweets([...props.newTweet].concat(tweetinit))
        }
    },[props.newTweet,tweets,tweetinit])

    useEffect(()=>{
      const callBack = (response,status)=>{
        if (status === 200){
            setTweetinit(response)
        }
      }
      Loadtweets(callBack)
    },[])
  
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