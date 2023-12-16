import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signinstart,signinfailure,signinsuccess } from "../redux/user/userslice";
import { useDispatch, useSelector } from "react-redux";
import Oauth from "../components/Oauth";

export default function Signin() {
   

  const navigate=useNavigate()
  const dispatch=useDispatch()
  const [form,setform]=useState({})
  const {loading,error,currentuser}=useSelector((state)=>state.user)
  useEffect(() => {
    // Check if currentuser has changed and do something
    console.log("Current User changed:", currentuser);

    
  }, [currentuser]);
  const change=(e)=>{
    setform({...form,[e.target.id]:e.target.value}) 
  }
  const handlesubmit= async (e)=>{
 
    e.preventDefault();
    try{
   dispatch(signinstart())
 console.log(error,'jajf')
    

    const res = await fetch("https://back-e54v.onrender.com/api/auth/signin", {
      method: 'POST', // Corrected: 'post' -> 'POST'
      headers:{
        'Content-Type': 'application/json' ,
      },
      body: JSON.stringify(form) // Convert form object to JSON string
    });
    console.log(loading)
    const data= await res.json()
console.log(data)
    if(data.success==false){
    dispatch(signinfailure(data.message))
    }
    if(data.success){
      dispatch(signinsuccess(data))
      console.log(data)
      console.log(currentuser,"sfskdf")
  navigate("/")}
     }
    catch(err){
      dispatch(signinfailure(error))
    }
  }
   
  return (
    <div className="text-center flex flex-col max-w-lg mx-auto p-8">
       <h1 className="text-[40px] font-bold pb-6">Sign In</h1>
       <form onSubmit={handlesubmit} className="flex flex-col text-center gap-5 ">

        <input className="text-center p-3 bg-slate-100" type="email" placeholder="Enter your Email" id="email" onChange={change}/>
        <input className="text-center p-3 bg-slate-100" type="password" placeholder="Password" id="password" onChange={change}/>
        <button  className="text-center text-white p-3 font-thin rounded-lg bg-blue-700" >{loading?<h1>Loading</h1>:<h1>SIGN IN</h1>}</button>
        <Oauth></Oauth>
       </form>
       <div className="p-3 flex gap-3" >
        <h1>{"Don't Have an account ? "}</h1>     
          <Link to="/signup" className="text-blue-400">Sign-up</Link>
          </div>
        <p className="text-red-400 ml-3 flex ">{error ?  error: ''}</p>
    </div>
  )
}
