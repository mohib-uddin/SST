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
import TextField from '@mui/material/TextField';
import { DataGrid } from '@mui/x-data-grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import JsPDF from 'jspdf';
import { useSession } from 'next-auth/react';
import autoTable from 'jspdf-autotable';
import  Router  from 'next/router';
import { CircularProgress } from '@mui/material';


export default function ViewTest() {

  const {status,data}=useSession();
  



  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);




 let [Test,setTest]=useState([]);
 let [Row,setRow]=useState([]);

 const columns = [
    {
      field: 'Name',
      headerName: 'Name',
      width: 150,
      editable: true,
      flex:1,
    },
    {
      field: 'RollNo',
      headerName: 'RollNo',
      width: 150,
      editable: true,
      flex:1,
    },
    
    {
        flex:1,
        field: 'Marks',
        headerName: 'Marks',
        width: 150,
      },
      {
        flex:1,
        field: 'Status',
        headerName: 'Status',
        renderCell:(cellValues)=>{return(

          (cellValues.row.Marks/Row.MaxMarks<0.5) ? <p style={{color:'red'}}>Fail</p> : <p style={{color:'green'}}>Pass</p>
      ) },
        width: 150,
      },

  ];
  
  function generatePDF() {
    const doc = new JsPDF();
 
    // Define the columns and rows to be used in the PDF
    const headers = columns.map((column) => column.headerName);
    const data = Row.Students.map((row) => columns.map((column) => {

      if (column.field === "Status") {
        
        if(row.Marks/Row.MaxMarks<0.5)
        {
          return "Fail";
        }
        else
        {
          return "Pass";
        }
    }
    return row[column.field];
    
    
    }));
  
    // Generate the table in the PDF
    doc.autoTable({
      head: [headers],
      body: data,
    });
  
    // Save the PDF
    doc.save("datagrid.pdf");
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
    
          fetch("/api/AddTests", Options).then(res => {
            if (!res.ok) {
              throw Error('Failed To Fetch');
            }
            return res.json();
          }).then(data => {
           setTest(data.tests)
          }).catch(err => {
           console.log(err.message);
          });
  
          console.log(Test);
      }

    



 },[status])
   

 if(status=='authenticated')
 {
  return(
    <div className='maincont'>
    <Sidebar></Sidebar>
     <div className='dataview'>
     {Test!=null&&Test.map((e,index) => {
        console.log(e);
               return(

                <div key={index} className='studentcontainer'>
                    <Card  className='studentcard' style={{display:'flex'}}>
                <CardContent>
                  <Typography sx={{ fontSize: 20 }} variant='h2' gutterBottom>
                    {e.Title}
                  </Typography>
                  <Typography sx={{ fontSize: 15}} variant='h2' gutterBottom>
                    Max Marks: {e.MaxMarks}
                  </Typography>
                 
                  <Typography sx={{ fontSize: 15}} variant='h2' gutterBottom>
                    Subject: {e.Subject}
                  </Typography>

                  <Typography sx={{ fontSize: 15}} variant='h2' gutterBottom>
                    Instructor: {e.Instructor}
                  </Typography>
                 
                </CardContent>
                <CardActions style={{margin:'auto'}} >
                <Button onClick={()=>{setOpen(true);setRow(e)}}  style={{backgroundColor:'white',color:'black',margin:'1rem',margin:'auto'}} variant="contained">View</Button>

                </CardActions>
              </Card>




              <div>
                <Modal
                                 

                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >

                  <div  id='testresult' className='ResultContainer'>


                  <DataGrid
                   className='resultgrid'
                    rows={Row.Students}
                    style={{height:'32rem'}}
                    columns={columns}
                    getRowId={(row) => row.Name}
                    pageSize={10}
                    rowsPerPageOptions={[10]}
                    disableSelectionOnClick
                    experimentalFeatures={{ newEditingApi: true }}
                />

                  <div style={{margin:'auto',width:'20%'}}>
                  <Button  onClick={generatePDF} className='submitbtn' type={'submit'} value='Download Test Pdf' variant="contained">Add Student</Button>

                  </div>

                  </div>
                   



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