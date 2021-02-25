import lookup  from "./Lookup";
export default function createTweet(newTweet,callBack){
    lookup('POST','create-tweet',callBack,{content:newTweet})
  }
  