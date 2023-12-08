import { BrowserRouter,Routes,Route } from "react-router-dom"
import Home from "./pages/Home"
import About from "./pages/About"
import Profile from "./pages/Profile"
import Signup from "./pages/Signup"
import Signin from "./pages/Signin"
import Header from "./components/Header"
import Error from "./Error"
export default function App() {
  return (
    <BrowserRouter>
     <Header></Header>
    <Routes>
            <Route path="/" element={<Home/>}></Route>
            <Route path="/about" element={<About/>}></Route>

            <Route path="profile" element={<Profile/>}></Route>
            <Route path="/signup" element={<Signup/>}></Route>
            <Route path="/signin" element={<Signin/>}></Route>
            <Route path="*" element={<Error/>}> </Route>
    </Routes>
    </BrowserRouter>  
  )
}
