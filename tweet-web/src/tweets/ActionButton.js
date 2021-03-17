import React,{useState} from 'react'
import tweetAction from './TweetAction'

const getCaps = (str) => str.charAt(0).toUpperCase() + str.slice(1)

export default function ActionButton(props) {
  
  let display = getCaps(props.action)
  const [actionL,setAction] = useState(props.action)
  const [likes,setLikes] = useState(props.tweet.likes)
  const [userLiked,setDidUserLiked] = useState(props.tweet.likes!==0)
  const likeStatus = () =>{
    if(userLiked){
      setLikes(likes - 1)
      setDidUserLiked(false)
      setAction('like')
    }else{
      setLikes(likes + 1)
      setDidUserLiked(true)
      setAction('unlike')
    }
  }
  const handleCallback = ()=>{
    likeStatus()
  }
  const handleAction = (event)=> {
    event.preventDefault()
    console.log(actionL)
    tweetAction(actionL,props.tweet.id,handleCallback)
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
