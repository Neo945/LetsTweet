import lookup from "./Lookup"

export default function tweetAction(action,tweetID,callback){
    lookup('POST','tweets_action',callback,{id:tweetID,action:action})
}