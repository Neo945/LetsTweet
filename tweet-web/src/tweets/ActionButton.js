import React,{useState} from 'react'
const getCaps = (str) => str.charAt(0).toUpperCase() + str.slice(1)

export default function ActionButton(props) {
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
