import React,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { setEmployeeId,setUpdateStatus } from '../store/employeeSlice';
const EmployeeList = () => {
  const[list,setList] = useState([]);
  const[loading,setLoading] = useState(true);
  const[search,setSearch] = useState("")
  const[error,setError] = useState(null)
  
  const navigate = useNavigate()
  const dispatch = useDispatch()
 const token = localStorage.getItem("token")
useEffect(()=>{
      fetchList();
},[])
const fetchList = async()=>{
  try{
  const res = await fetch("http://localhost:8000/api/v1/employee/list",{
    method:"get",
    headers:{
        "content-type":"application/json",
        "authorization":"Bearer "+token
    }
  })
  const data = await res.json();
  console.log(data)
  setList(data.employeeList);
  setLoading(false)
}
catch(err){
  setError("error",err)
}
}
  const handleCreateEmployee = ()=>{
    navigate("/employee")
    dispatch(setUpdateStatus(false))
  }
  const handleDelete = async(id)=>{
    try{
     const resp = await fetch(`http://localhost:8000/api/v1/deleteItem/${id}`,{
      method:"delete",
      headers:{
        "content-type":"application/json",
        "authorization":"Bearer "+token
      }
     })
     const data = await resp.json();
     if(data.acknowledged){
    fetchList();
     }
     
    }
    catch(err){
      setError(err)
    }
  }
  const handleEdit = (id)=>{
    //localStorage.setItem("employeeId",id)
    dispatch(setEmployeeId(id))
    dispatch(setUpdateStatus(true))
    console.log(id)
     navigate("/employee")
  }
  const handleSearchButton = async()=>{
    try{
     const resp = await fetch(`http://localhost:8000/api/v1/employee/search?name=${search}`,{
        method:"get",
        headers:{
          "content-type":"application/json",
        "authorization":"Bearer "+token
        }
     })
     const data = await resp.json();
     console.log(data)
    }
    catch(err){
      console.log("error",err)
    }
  }
  return (
    <div className='mt-20  '>
<header>
    <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
        <div class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
            <h1 className='text-xl ml-2'>Employee List</h1>
            
            <div class="justify-between items-center w-full lg:flex lg:w-auto lg:order-1" id="mobile-menu-2">
                <ul class="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                
                    <li>
                        <p className='mt-4'>Total Count : {list?.length}</p>
                    </li>
                    <li>
                        <button className='btn btn-primary' onClick={handleCreateEmployee}>Create Employee</button>
                    </li>
                    <li>
                    <div className="join">
  <input className="input input-bordered join-item focus:outline-none" placeholder="Search" value={search} onChange={(e)=>setSearch(e.target.value)}/>
  <button className="btn join-item rounded-r-full btn-primary" onClick={handleSearchButton}>Search</button>
</div>
                    </li> 
                </ul>
            </div>
        </div>
    </nav>
</header>
<div className="overflow-x-auto ">
  <table className="table table-xs">
    <thead className='bg-gray-300'>
      <tr className='p-2 text-lg '>
        <th>Unique Id</th>
        <th>Image</th>
        <th>Name</th>
        <th>Eamil</th>
        <th>Mobile No.</th>
        <th>Designation</th>
        <th>Gender</th>
        <th>Course</th>
        <th>Create Date</th>
        <th>Actions</th>
      </tr>
    </thead>
    {loading?<span className="loading loading-spinner loading-sm"></span>:list?.map((data)=><tbody className='text-lg' key={data._id}>
      <tr className='text-lg'>
        <th className='text-sm'>{data._id}</th>
        <td className='text-sm'><img src={"http://localhost:8000/images/"+data.Image} alt='image' className='w-20'/></td>
        <td className='text-sm'>{data.Name}</td>
        <td className='text-sm'>{data.Email}</td>
        <td className='text-sm'>{data.Mobile}</td>
        <td className='text-sm'>{data.Designation}</td>
        <td className='text-sm'>{data.Gender}</td>
        <td className='text-sm'>{data.Course}</td>
        <td className='text-sm'>{data.CreateDate}</td>
        <td className='text-sm'><button className='btn btn-neutral mr-2' onClick={()=>handleEdit(data._id)}>Edit</button><button className='btn btn-neutral' onClick={()=>handleDelete(data._id)}>Delete</button></td>
      </tr>
      </tbody>)}
    
</table>
</div>

      
   </div>
  )
}

export default EmployeeList