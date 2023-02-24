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

const generatePDF = () => {

  const report = new JsPDF('landscape','pt','a4');
  report.html(document.querySelector('#testresult')).then(() => {
      report.save('report.pdf');
  });
}


export default function ViewTest() {


  



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

          (cellValues.row.Marks/Test[0].MaxMarks<0.5) ? <p style={{color:'red'}}>Fail</p> : <p style={{color:'green'}}>Pass</p>
      ) },
        width: 150,
      },

  ];
  





 useEffect(()=>{


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



 },[])
   
  return(
    <div className='maincont'>
    <Sidebar></Sidebar>
     <div className='dataview'>
     {Test!=null&&Test.map((e,index) => {
        console.log(e);
               return(

                <div className='studentcontainer'>
                    <Card key={index} className='studentcard' style={{display:'flex'}}>
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
                <Button onClick={()=>{setOpen(true);setRow(e.Students)}}  style={{backgroundColor:'white',color:'black',margin:'1rem',margin:'auto'}} variant="contained">View</Button>

                </CardActions>
              </Card>




              <div>
                <Modal
                                 

                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >

                  <div  id='testresult' style={{background:'white',width:'60%',margin:'auto',padding:'2rem',marginTop:'2rem'}}>


                  <DataGrid
                   style={{backgroundColor:'white',width:'50%',height:'30rem',margin:'auto',marginTop:'1rem'}}
                    rows={Row}
                   
                    columns={columns}
                    getRowId={(row) => row.Name}
                    pageSize={10}
                    rowsPerPageOptions={[5]}
                    disableSelectionOnClick
                    experimentalFeatures={{ newEditingApi: true }}
                />


                  <Button style={{margin:'auto'}} onClick={generatePDF} className='submitbtn' type={'submit'} value='Add Student' variant="contained">Add Student</Button>

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