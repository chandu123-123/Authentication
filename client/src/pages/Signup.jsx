import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Oauth from "../components/Oauth";
import { signinfailure,signinstart,signinsuccess } from "../redux/user/userslice";
import { useDispatch, useSelector } from "react-redux";

export default function Signup() {
   const dispatch=useDispatch()
  
const {error,loading}=useSelector(state=>state.user)
  const navigate=useNavigate()
  const [form,setform]=useState({})
  const change=(e)=>{
    setform({...form,[e.target.id]:e.target.value}) 
  }
  const handlesubmit= async (e)=>{
    e.preventDefault();
    try{
    dispatch(signinstart())

  
    console.log("hello")
    const res = await fetch("https://back-e54v.onrender.com/api/auth/signup", {
      method: 'POST', // Corrected: 'post' -> 'POST'
      headers:{
        'Content-Type': 'application/json' ,
      },
      body: JSON.stringify(form) // Convert form object to JSON string
    });
    const data= await res.json()
    console.log(data)
    if(data.success==false){
      
      dispatch(signinfailure(true))
    }
    if(data.ok){
      dispatch(signinsuccess(data))
navigate("/signin")}
  }
    catch(err){
     
      dispatch(signinfailure(true))
    }
  }
   
  return (
    <div className="text-center flex flex-col max-w-lg mx-auto p-8">
      
       <h1 className="text-[40px] font-bold pb-6">Sign Up</h1>
       <form onSubmit={handlesubmit} className="flex flex-col text-center gap-5 ">
        <input className="text-center p-3 bg-slate-100" type="text" placeholder="username" id="username" onChange={change}/>
        <input className="text-center p-3 bg-slate-100" type="email" placeholder="Enter your Email" id="email" onChange={change}/>
        <input className="text-center p-3 bg-slate-100" type="password" placeholder="Password" id="password" onChange={change}/>
        <button  className="text-center disabled:opacity-80 text-white p-3 font-thin rounded-lg bg-blue-700" >{loading?<h1>Loading</h1>:<h1>SIGN UP</h1>}</button>
        <Oauth></Oauth>
       </form>
       <div className="p-3 flex gap-3" >
        <h1>Have an account ? </h1>     
          <Link to="/signin" className="text-blue-400">Sign-in</Link>
          </div>
        <p className="text-red-400 ml-3 flex ">{error&& 'something problem'}</p>
    </div>
  )
}
