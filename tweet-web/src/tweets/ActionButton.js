import React,{useState} from 'react'
import tweetAction from './TweetAction'

const getCaps = (str) => str.charAt(0).toUpperCase() + str.slice(1)

export default function ActionButton(props) {
  let display = getCaps(props.action)
  const [likes,setLikes] = useState(props.tweet.likes)
  const handleCallback = (response)=>{
    console.log(response)
    setLikes(response.likes)
  }
  const handleAction = (event)=> {
    event.preventDefault()
    tweetAction(props.action,props.tweet.id,handleCallback)
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
