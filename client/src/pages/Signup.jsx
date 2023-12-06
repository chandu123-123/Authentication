import { Link } from "react-router-dom";

export default function Signup() {
  return (
    <div className="text-center flex flex-col max-w-lg mx-auto p-8">
       <h1 className="text-[40px] font-bold pb-6">Sign Up</h1>
       <form className="flex flex-col text-center gap-5 ">
        <input className="text-center p-3 bg-slate-100" type="text" placeholder="username" id="username"/>
        <input className="text-center p-3 bg-slate-100" type="email" placeholder="Enter your Email" id="email"/>
        <input className="text-center p-3 bg-slate-100" type="password" placeholder="Password" id="password"/>
        <button className="text-center text-white p-3 font-thin rounded-lg bg-blue-700" >SIGN UP</button>
       </form>
       <div className="p-3 flex gap-3" >
        <h1>Have an account ? </h1>     
          <Link to="/signin" className="text-blue-400">Sign-in</Link>
          </div>
    </div>
  )
}
