import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className=" bg-slate-200 ">
      <div className="max-w-6xl p-6 mx-auto flex justify-between">
        <Link to="/">
          <div className="font-bold text-[20px]">Auth APP</div>
        </Link>
        <ul className="flex gap-4">
          <li>
            {" "}
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="about">About</Link>
          </li>
          <li>
            <Link to="signup">Sign-up</Link>
          </li>
        </ul>
      
      </div>
     
    </div>
  );
}
