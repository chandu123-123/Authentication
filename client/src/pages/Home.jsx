import { useNavigate } from "react-router-dom"

export default function Home() {
  const navigate=useNavigate()
  return (
    <div>
      <button onClick={()=>{navigate(-1)}}>ffs</button>
    </div>
  )
}
