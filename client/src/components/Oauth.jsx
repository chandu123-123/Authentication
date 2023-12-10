import { app } from '../firebase';
import {GoogleAuthProvider,signInWithPopup,getAuth} from 'firebase/auth'
export default function Oauth() {
    const submitted=async ()=>{
        try{
        const provider=new GoogleAuthProvider();
        const auth=getAuth(app)
        const result=await signInWithPopup(auth,provider)
       console.log(result)    
    }
        catch(error){
    console.log("cancelled signin",error)
        }
    }
  return (
<button type="button" onClick={submitted} className="bg-red-600 text-white p-3 rounded-lg text-[18px]  hover:bg-red-500   uppercase">Continue with Google</button>
  )
}
