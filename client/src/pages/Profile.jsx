import { useSelector } from "react-redux"


export default function Profile() {
  const {currentuser}= useSelector(state=>state.user)
  console.log("heool")
  return (
    <div className="max-w-lg mx-auto">
      <h1 className="font-bold text-[3.5rem] text-center my-3 max-w-lg mx-auto">Profile</h1>
      <form className="flex flex-col justify-center gap-5 max-w-lg mx-auto" >
       <img src={currentuser.photo} alt="" className="h-24 w-24 self-center cursor-pointer
        rounded-full object-cover "/>
        <input type="text" defaultValue={currentuser.username} placeholder="Username" className="bg-slate-100 p-4 text-center" />
        <input type="text" defaultValue={currentuser.email} placeholder="Email" className="bg-slate-100 p-4 text-center" />

        <input type="text" placeholder="Password"  className="bg-slate-100 p-4 text-center" />        
      </form>
      <div className="flex justify-between mt-4 text-red-600">
        <span className="cursor-pointer">Delete Account</span>
        <span className="cursor-pointer">Sign out</span>

      </div>
    </div>
  )
}
