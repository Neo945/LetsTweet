import React from 'react'
export default function TweetComponent(props){
    const tweetAreaRef = React.createRef()
    const onSubmitClicked = (event)=>{
      event.preventDefault()
    //   const val = tweetAreaRef.current.value
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
  