import React from 'react'
import ActionButton from './ActionButton'

export default function Tweet(props){
    return (
      <div className='border col-10 col-md-6 tweet max-auto' id={`t-${props.tweet.id}`}>
        <div> 
          <p>{props.tweet.id}. {props.tweet.content}</p>
          {props.tweet.parent && 
          <div className='col-8 mx-auto p-3 '>
            <p className='mb-0 text-muted small'>Retweet</p>
           <Tweet tweet={props.tweet.parent}/>
          </div>
          }
        </div>
          <ActionButton tweet={props.tweet} action='like' />
          <ActionButton tweet={props.tweet} action='unlike' />
          <ActionButton tweet={props.tweet} action='retweet'/>
      </div>
    )
  }
  