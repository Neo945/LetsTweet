import React from 'react'
export default function Tweet(props){
    return (
      <div className='col-12 border py-3 mb-4 tweet' id={`t-${props.tweet.id}`}>
          <p>{props.tweet.id}. {props.tweet.content}</p></div>
    )
  }
  