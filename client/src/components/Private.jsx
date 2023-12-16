import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"

export default function Private() {
    const {currentuser}=useSelector(store=>store.user)
    
  return (
    <div>
     {currentuser?<Outlet/>:<Navigate to="/signin"/>}
    </div>
  )
}
