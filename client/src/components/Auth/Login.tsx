import { useState } from "react"
import { AiOutlineMail } from "react-icons/ai"
import { RiLockPasswordLine } from "react-icons/ri"
import { useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../hooks"
import { postLogin } from "../../redux/thunk/authThunk"

interface UserDetails {
  email: string,
  password: string
}

const Login = () => {
  const [userDetails, setUserDetails] = useState<UserDetails>({ email: "samad.abdus3535@gmail.com", password: "123456" })
  const dispatch = useAppDispatch()
  const authButtonStatus = useAppSelector((state) => state.authReducer.authButtonState)
  const navigate = useNavigate()

  return (
    <section className='flex items-center justify-center bg-gradient-to-t from-blue-500 to-cyan-500 w-screen h-screen '>

      <div className='bg-white w-1/3 min-h-fit p-6 rounded-md'>
        <h1 className='text-4xl text-blue-800 font-extrabold text-center mb-8'>Social Bowl</h1>



        <div className="flex items-center gap-2 justify-start p-2 rounded-lg bg-gray-200 mb-6">
          <AiOutlineMail className="text-gray-400 text-xl" />
          <input value={userDetails.email} onChange={(e) => { setUserDetails({ ...userDetails, email: e.target.value }) }} className="outline-none w-full bg-inherit" type="email" placeholder="Email" />
        </div>

        <div className="flex items-center gap-2 justify-start p-2 rounded-lg bg-gray-200 mb-6">
          <RiLockPasswordLine className="text-gray-400 text-xl" />
          <input value={userDetails.password} onChange={(e) => { setUserDetails({ ...userDetails, password: e.target.value }) }} className="outline-none w-full bg-inherit" type="password" placeholder="Password" />
        </div>

        <button onClick={() => { dispatch(postLogin(userDetails)) }} className={`mx-auto flex bg-gradient-to-l from-blue-500 to-cyan-500 text-white text-xl px-8 py-2 mt-6 mb-4 rounded-full ${authButtonStatus === "loading" ? "opacity-60 pointer-events-none" : ""} `} >Login </button>
        <p className="text-center" > Don't have an account? <span onClick={() => { navigate("/signup") }} className="font-bold cursor-pointer"> Sign up </span ></p>
      </div>


    </section>
  )
}

export default Login