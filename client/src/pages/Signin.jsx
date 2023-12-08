import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Signin() {
  const [loading,setloading]=useState(false)
  const [error,seterror]=useState(false)
  const navigate=useNavigate()
  const [form,setform]=useState({})
  const change=(e)=>{
    setform({...form,[e.target.id]:e.target.value}) 
  }
  const handlesubmit= async (e)=>{
    e.preventDefault();
    try{
    setloading(true)
    console.log(form)
  
    console.log("hello")
    const res = await fetch("http://localhost:3001/api/auth/signin", {
      method: 'POST', // Corrected: 'post' -> 'POST'
      headers:{
        'Content-Type': 'application/json' ,
      },
      body: JSON.stringify(form) // Convert form object to JSON string
    });
    const data= await res.json()
    console.log(data)
    if(data.success==false){
      
      seterror(true)
      setloading(false)
    }
    if(data.success){
  navigate("/")}
     }
    catch(err){
      seterror(true)
    }
  }
   
  return (
    <div className="text-center flex flex-col max-w-lg mx-auto p-8">
       <h1 className="text-[40px] font-bold pb-6">Sign In</h1>
       <form onSubmit={handlesubmit} className="flex flex-col text-center gap-5 ">

        <input className="text-center p-3 bg-slate-100" type="email" placeholder="Enter your Email" id="email" onChange={change}/>
        <input className="text-center p-3 bg-slate-100" type="password" placeholder="Password" id="password" onChange={change}/>
        <button  className="text-center text-white p-3 font-thin rounded-lg bg-blue-700" >{loading?<h1>Loading</h1>:<h1>SIGN IN</h1>}</button>
       </form>
       <div className="p-3 flex gap-3" >
        <h1>{"Don't Have an account ? "}</h1>     
          <Link to="/signin" className="text-blue-400">Sign-up</Link>
          </div>
        <p className="text-red-400 ml-3 flex ">{error&& 'something problem'}</p>
    </div>
  )
}
