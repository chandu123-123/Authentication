import { useNavigate } from 'react-router-dom';
import { app } from '../firebase';
import {GoogleAuthProvider,signInWithPopup,getAuth} from 'firebase/auth'
import { useDispatch, useSelector } from 'react-redux';
import { signinsuccess } from '../redux/user/userslice';
export default function Oauth() {
const {currentuser}=useSelector((state)=>state.user)
  const dispatch=useDispatch()
  const navigate=useNavigate()
    const submitted=async ()=>{
        try{
        const provider=new GoogleAuthProvider();
        const auth=getAuth(app)
        const result=await signInWithPopup(auth,provider)
       console.log(result)    
       console.log("success")
    const res = await fetch("https://back-e54v.onrender.com/api/auth/google", {
      method: 'POST', // Corrected: 'post' -> 'POST'
      headers:{
        'Content-Type': 'application/json' ,
      },
      body: JSON.stringify({name:result.user.displayName,email:result.user.email,photo:result.user.photoURL}) // Convert form object to JSON string
    });
    console.log("success")
    const data=await res.json();
    console.log("success]]")
    console.log(JSON.stringify(data)+"sfsf")
    console.log("dsdf")
    if(data.success){
      console.log("success")
      console.log(data)
      dispatch(signinsuccess(data))
   console.log(currentuser)
console.log('check it')
      navigate("/")
    }
    }
        catch(error){
    console.log("cancelled signin",error)
        }
    }
  return (
<button type="button" onClick={submitted} className="bg-red-600 text-white p-3 rounded-lg text-[18px]  hover:bg-red-500   uppercase">Continue with Google</button>
  )
}
