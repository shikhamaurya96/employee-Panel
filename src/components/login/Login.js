import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'
const Login = () => {
  const[username,setUsername]  = useState("") 
const [password,setPassword] = useState("")
const[error,setError] = useState("")
const navigate = useNavigate();

const handleLogin = async(e)=>{
    e.preventDefault();
    
    if(username!=="" && password!==""){
        
    const res = await fetch("http://localhost:8000/api/v1/user",{
        method:"post",
    body:JSON.stringify({username,password}),
    headers:{
        "content-type":"application/json"
    }
    })
    console.log("myData 1")
    const data = await res.json();
    console.log(data)
    if(data.auth){
        localStorage.setItem("token",data.auth)
       localStorage.setItem("username",username)
       navigate("/")
    }
    else{
        setError(data.result)
    }
    }else{
        setError("please enter all the fields")
    }
    
}
  return (
    
    <section className="bg-gray-50 dark:bg-gray-900">
  <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Login to your account
              </h1>
              <form className="space-y-4 md:space-y-6">
                  
                  <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                      <input type="text"  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="username"  value={username} onChange={(e)=>setUsername(e.target.value)}/>
                  </div>
                  <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                      <input type="password"  id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  value={password} onChange={(e)=>setPassword(e.target.value)}/>
                  </div>
                  {
                    error!==""?<p className='text-red-500'>{error}</p>:""
                  }
                  <button className="btn btn-primary w-full" onClick={handleLogin}>Login</button>
                  
              </form>
          </div>
      </div>
  </div>
</section>
  )
}

export default Login