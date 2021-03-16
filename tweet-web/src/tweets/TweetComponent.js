import React from 'react'
import TweetList from './TweetList'
import createTweet from './CreateTweet'


export default function TweetComponent(props){
    const [newTweet,setNewTweet] = React.useState([])
    const tweetAreaRef = React.createRef()
    const onSubmitClicked = (event)=>{
      event.preventDefault()
      let newTweetList = [...newTweet]
      createTweet(tweetAreaRef.current.value,(response,status)=>{
        newTweetList.unshift(response)
        setNewTweet(newTweetList)
      })
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
    <TweetList newTweet={newTweet}/>
  </div>
  
  )
  }
  