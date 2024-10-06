import React,{useState,useEffect} from 'react'
import { useNavigate} from 'react-router-dom'
const EmployeeForm = () => {
  const[name,setName] = useState("")
  const[email,setemail] = useState("")
  const[mobile,setMobile] = useState("")
  const[designation,setDesignation] = useState("")
  const[gender,setGender] = useState("");
  const[course,setCourse] = useState([]);
  const[image,setImage] = useState(null)
  const[error,setError] = useState(null)
  const[submit,setSubmit] = useState(true)
  const navigate = useNavigate();
  const id = localStorage.getItem("employeeId")
  
  //console.log(state)
  const token = localStorage.getItem("token")
   
useEffect(()=>{
  
  const fetchEmployeeData = async()=>{
    try{
    const res = await fetch(`http://localhost:8000/api/v1/employee/${id}`,{
      method:"get",
      headers:{
        "content-type":"application/json",
        "authorization":"Bearer "+token
      }
    })
    const data = await res.json();
    console.log(data)
    setName(data.Name);
    setemail(data.Email);
    setMobile(data.Mobile);
    setDesignation(data.Designation);
    setGender(data.Gender);
    setCourse(data.Course);
    setImage(data.Image)
    setSubmit(false)
   }
    catch(err){
      setError(err)
    }
  }
  fetchEmployeeData();
},[])



  const handleMobile = (e)=>{
const val = e.target.value;
if (/^\d{0,10}$/.test(val)) {
  setMobile(val); // Update state
}
  }
  const handleGenderChange = (e)=>{
    setGender(e.target.value)
  }
  const handleCourseChange = (event)=>{
    const selectedCourse = event.target.value;

    // If the course is already selected, remove it; otherwise, add it to the selectedCourses array
    if (course.includes(selectedCourse)) {
      setCourse(course.filter((selectedCourse) => selectedCourse !== selectedCourse));
    } else {
      setCourse([...course, selectedCourse]);
    }
  }
  const handleImage = (e)=>{
    if(e.target.files && e.target.files[0])
    {
      setImage(e.target.files[0])
    }
    
  }
const handleSubmit = async(e)=>{

  e.preventDefault();
  console.log(course)
  console.log(designation)
  if(image){
    if(mobile.length===10){
    const formData = new FormData();
    const date = new Date().toUTCString();
    formData.append("image",image)
    formData.append("name",name)
    formData.append("email",email)
    formData.append("mobile",mobile)
    formData.append("designation",designation)
    formData.append("gender",gender)
    formData.append("course",course.toString())
    formData.append("createDate",date)
    if(submit===true){
  const res1 = await fetch("http://localhost:8000/api/v1/employee",{
    method:"post",
     body: formData,
     headers:{
      "authorization":"Bearer "+token
    }
  })
  const data1 = await res1.json();
  console.log(data1)
  setCourse("")
setName("");
setDesignation("")
setGender("");
setImage("");
setMobile("");
setemail("")
navigate("/list")
}
else{
  
  const res2  = await fetch(`http://localhost:8000/api/v1/updateEmployee/${id}`,{
    method:"put",
    body:formData,
    headers:{
      "authorization":"Bearer "+token
    }
  })
  const data2 = await res2.json();
  console.log(data2)
  setCourse("")
setName("");
setDesignation("")
setGender("");
setImage("");
setMobile("");
setemail("")
navigate("/list")
}
}
else{
  setError("Please enter a valid 10-digit mobile number ")
}}
else{
setError("please choose an image")
}

} 

  return (
   
    <section className="bg-gray-50 dark:bg-gray-900">
      
  <div className="flex flex-col items-center justify-center   items-center px-6 py-8 mx-auto  lg:py-4  ">
  
      <div className="w-full xl:p-0 border border-black bg-white rounded-lg shadow dark:border md:mt-24 sm:max-w-md dark:bg-gray-800 dark:border-gray-700">
        
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8 ">
          
              <form className="space-y-4 md:space-y-6 ">
                  <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                      <input type="text" value={name} onChange={(e)=>setName(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Name" required=""/>
                  </div>
                  <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                      <input type="text" value={email} onChange={(e)=>setemail(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="email" required=""/>
                  </div>
                  <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mobile Number</label>
                      <input type='tel' pattern="[0-9]{10}" maxLength="10" minLength="10" value={mobile} onChange={handleMobile} className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Monile No"/>
                  </div>
                  
                  <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Designation</label>
                      <select placeholder="Designation" value={designation} onChange={(e)=>setDesignation(e.target.value)} className=" bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option disabled selected className=''>Designation</option>
                    <option>HR</option>
                     <option>Manager</option>
                     <option>Sales</option>
                     </select>  
                  </div>
                  <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Gender</label>
                      <div className='flex justify-between bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'>
                      <div className="form-control">
  <label className="label cursor-pointer">
    <span className="label-text mr-2">Female</span>
    <input type="radio" name="radio-10" className="radio checked:bg-black" value="female" checked={gender=="female"} onChange={handleGenderChange}/>
  </label>
</div>
<div className="form-control">
  <label className="label cursor-pointer">
    <span className="label-text mr-2">Male</span>
    <input type="radio" name="radio-10" className="radio checked:bg-black" value="male" checked={gender=="male"} onChange={handleGenderChange} />
  </label>
</div>
                 </div>
                      

                  </div>
                  <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Course</label>
                      <div className='flex justify-between bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ' >
                      <div className="form-control">
  <label className="label cursor-pointer">
    <span className="label-text mr-2">MCA</span>
    <input type="checkbox" value="MCA" checked={course.includes("MCA")} onChange={handleCourseChange} className="checkbox" />
  </label>
</div>
<div className="form-control">
  <label className="label cursor-pointer">
    <span className="label-text mr-2">BCA</span>
    <input type="checkbox" value="BCA" checked={course.includes("BCA")} onChange={handleCourseChange} className="checkbox" />
  </label>
</div>
<div className="form-control">
  <label className="label cursor-pointer">
    <span className="label-text mr-2">BSc</span>
    <input type="checkbox" value="BSc" checked={course.includes("BSc")} onChange={handleCourseChange} className="checkbox" />
  </label>
</div>
</div>
                  </div>

                   <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Image Upload</label>
                      <input type="file" accept="image/*"  onChange={handleImage} className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""/>
                  </div>
                  {error&&<p>{error}</p>}
                  <button type="submit" className="btn btn-primary w-full" onClick={handleSubmit}>{submit?"Submit":"Update"}</button>
                  
              </form>
          </div>
      </div>
  </div>
  </section>
  )
}
export default EmployeeForm