import lookup from './Lookup'

export default function Loadtweets(callBack){
  lookup('GET','tweets',callBack)
}