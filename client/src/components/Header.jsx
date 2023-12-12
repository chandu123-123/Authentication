
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";


export default function Header() {

  const {currentuser}=useSelector((state)=>state.user)

   

  return (
    <div className=" bg-slate-200 ">
      <div className="max-w-6xl p-6 mx-auto flex justify-between">
        <Link to="/">
          <div className="font-bold text-[20px]">Auth APP</div>
        </Link>
        <ul className="flex gap-4">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="profile">{currentuser ? <img src={currentuser.photo} className="h-7 w-7 rounded-full" alt="User" /> : 'Sign-up'}</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
