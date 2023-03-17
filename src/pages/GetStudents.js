import React from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useEffect,useState } from 'react';
import Sidebar from './Components/Sidebar';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Link from "next/link";
import { TextField} from '@mui/material'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useSession } from 'next-auth/react';
import Router  from 'next/router';
import { CircularProgress } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Swal from 'sweetalert2';



export default function GetStudents() {

  const {status,data}=useSession();
  

  const [CurrentID,setCurrentID]=useState('');

  let Data={
    Name:'',
    Fee:3000,
    Contact:'',
    Batch:'',
    FatherContact:'',
  }
  const NameChangeHandler=(e)=>{
    Data.Name=e.target.value;
  }
  const FeeChangeHandler=(e)=>{
    Data.Fee=e.target.value;

  }
  const ContactChangeHandler=(e)=>{
    Data.Contact=e.target.value;
  }
  const FatherContactChangeHandler=(e)=>{
    Data.FatherContact=e.target.value;
  }
  const BatchChangeHandler=(e)=>{
    Data.Batch=e.target.value;
  }




  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);




 let [Students,setStudents]=useState([]);

 const DeleteHandler=(e)=>{

  
    Swal.fire({
      icon: 'success',
      title: 'Student Deleted Successfully',
      showConfirmButton: false,
      timer: 1500
    })



    Swal.fire({
      title: 'Delete Student?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Save',
      denyButtonText: `Don't save`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        console.log(e)
  let Options = {
    method:"DELETE",
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body:JSON.stringify(e)
  }
  console.log(Options.body)

    fetch("/api/AddStudents", Options).then(res => {
      if (!res.ok) {
        throw Error('Failed To Fetch');
      }
      return res.json();
    }).then(data => {
     console.log(data);
    }).catch(err => {
     console.log(err.message);
    });

    Swal.fire({
      icon: 'success',
      title: 'Student Deleted Successfully',
      showConfirmButton: false,
      timer: 1500
    })
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })







 }




 const UpdateHandler=()=>{




  let Options = {
    method:"PUT",
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body:JSON.stringify({id:CurrentID,items:Data})
  }
  console.log(Options.body)

    fetch("/api/AddStudents", Options).then(res => {
      if (!res.ok) {
        throw Error('Failed To Fetch');
      }
      return res.json();
    }).then(data => {
     console.log(data);
    }).catch(err => {
     console.log(err.message);
    });

 }




 useEffect(()=>{

  if(status=='unauthenticated')
    {
      Router.replace("/auth/signin");
    }
    else
    {

      let Options = {
        method:"GET",
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
      }
  
        fetch("/api/AddStudents", Options).then(res => {
          if (!res.ok) {
            throw Error('Failed To Fetch');
          }
          return res.json();
        }).then(data => {
         setStudents(data.students)
        }).catch(err => {
         console.log(err.message);
        });

        console.log(Students);

    }



 },[])


 const handleChange=(e)=>{

  setStudents('');
  setBatch(e.target.value);
 
  let Options = {
    method:"POST",
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body:JSON.stringify({Batch:e.target.value})
  }

    fetch("/api/GetStudentsByBatch", Options).then(res => {
      if (!res.ok) {
        throw Error('Failed To Fetch');
      }
      return res.json();
    }).then(data => {
     setStudents(data.students)
    }).catch(err => {
     console.log(err.message);
    });

    console.log(Students);

 }

 const [Batch,setBatch]=useState('IX');

 const Search=(e)=>{
  console.log(e.target.value)
  let Options = {
    method:"POST",
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body:JSON.stringify({name:e.target.value})
  }

    fetch("/api/Regex", Options).then(res => {
      if (!res.ok) {
        throw Error('Failed To Fetch');
      }
      return res.json();
    }).then(data => {
     setStudents(data.students)
    }).catch(err => {
     console.log(err.message);
    });

    console.log(Students);

 }
 





  if(status=='authenticated')
  {

    return(

      
  

      <div className='maincont'>
      <Sidebar></Sidebar>
  
  
      <Box className='FilterContainer'>
      <TextField style={{marginTop:'1rem'}} onChange={Search} id="outlined-basic" label="Search" variant="outlined" />
            <div>
            <InputLabel id="demo-simple-select-label">Batch</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={Batch}
              label="Batch"
              onChange={handleChange}
            >
              <MenuItem value={'IX'}>IX</MenuItem>
              <MenuItem value={'X'}>X</MenuItem>
              <MenuItem value={'XI'}>XI</MenuItem>
              <MenuItem value={'XII'}>XII</MenuItem>
    
            </Select>
            </div>
            
  
        </Box>
  
         
      {Students.length<1&&<div style={{margin:'auto',width:'20%',padding:'5rem'}}>
      <CircularProgress style={{color:'#3D4E81'}} />
      </div>}
  
      <div className='dataview'>
      {Students!=null&&Students&&Students.map((e,index) => {
                 return(
  
                  <div key={index} className='studentcontainer'>
                  <Card  className='studentcard' style={{display:'flex',background: 'hsl(220.5, 100%, 50.6%)',color:'whitesmoke'}}>
                  <CloseIcon style={{cursor:'pointer'} } onClick={()=>DeleteHandler(e)}></CloseIcon>
                  <CardContent className='cardcontent'>
                    <Typography sx={{ fontSize: 20 }} variant='h2' gutterBottom>
                      <Link
                        style={{textDecoration:'none',color:'white'}}
                        href={{
                          pathname: "/StudentProgress",
                          query:{StudentContact:e.Contact,} , // the data
                        }}
                      >
                      {e.Name}
                      </Link>
                    </Typography>
                    <Typography sx={{ fontSize: 15}} variant='h2' gutterBottom>
                      Roll No: {e.RollNo}
                    </Typography>

                   
                    <Typography sx={{ fontSize: 15}} variant='h2' gutterBottom>
                      Balance: {e.Balance}
                    </Typography>
  
                    <Typography sx={{ fontSize: 15}} variant='h2' gutterBottom>
                      Contact: {e.Contact}
                    </Typography>
                   
                  </CardContent>
                  <CardActions style={{margin:'auto'}} >
                  <Button className='cardbtn' onClick={()=>{setOpen(true);setCurrentID(e)}}  style={{backgroundColor:'white',color:'black',margin:'1rem',margin:'auto'}} variant="contained">Edit</Button>
  
                  </CardActions>
                </Card>
  
  
  
  
                <div>
                  <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
      <form  onSubmit={()=>{UpdateHandler()}} className='StudentEdit' >
         <TextField style={{marginTop:'1rem'}} onChange={NameChangeHandler} id="outlined-basic" label="Name" variant="outlined" />
         <TextField style={{marginTop:'1rem'}} type='number' onChange={FeeChangeHandler} id="outlined-basic" label="Fee" variant="outlined" />
         <TextField style={{marginTop:'1rem'}} onChange={ContactChangeHandler} id="outlined-basic" label="Contact" variant="outlined" />
         <TextField style={{marginTop:'1rem'}} onChange={FatherContactChangeHandler} id="outlined-basic" label="FatherContact" variant="outlined" />
         <TextField style={{marginTop:'1rem'}} onChange={BatchChangeHandler} id="outlined-basic" label="Batch" variant="outlined" />
  
         <Button className='submitbtn' type={'submit'} value='Add Student' variant="contained">Add Student</Button>
  
         </form>
                  </Modal>
                  </div>
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
                  </div>
  
  
  
  
  
  
  
  
  
                  
                 );
             })}
      </div>
  
       
      </div>
    )
  

  }

  return       <CircularProgress style={{color:'#3D4E81',margin:'auto',marginTop:'2rem'}} />
  

}