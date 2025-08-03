import './style-dashboard.css'
import { useEffect, useState } from 'react';
import Cards from '../components/Cards';
import { getAxios } from '../hooks/axiosApi';
import { useNavigate } from 'react-router-dom';
import { Box,Button,Container } from '@mui/material';

import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PaidIcon from '@mui/icons-material/Paid';

import ReactTableComponent from '../components/ReactTableComponent';
import ModalComponent from '../components/ModalComponent';
import Table from './job/Table';

interface Postulation {
  id: number;
  job_title: string;
  position: string;
  link: string;
  created_at:string
  company: string;
  status_id: string;
}

type Props = {}

const Dashboard = ({}:Props) => {
  const navigate = useNavigate();

  const [postulations, setPostulations] = useState<Postulation[]>([]);

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  
  const refreshPostulations =  async () => {
      await getAxios(`/job/`,setPostulations,navigate)
  };

  useEffect(() =>{
    refreshPostulations()
  },[])

  return (
    <>
      <Container maxWidth="xl">
        <Box component='div' sx={{display:'flex',alignItems:'center',justifyContent:'space-around',flexWrap:'wrap'

          }}>
          <Cards 
            title='Viajes aprobados'
            count={50}
            icon={<AssignmentTurnedInIcon fontSize="large" color="success" />}
          />
          <Cards 
            title='Viajes pendientes'
            count={120}
            icon={<AccessTimeIcon fontSize="large" color="warning" />}
          />
          <Cards 
            title='Ventas mensuales'
            count={60258}
            icon={<AttachMoneyIcon fontSize="large" color="success" />}
          />
          <Cards 
            title='Ventas anuales'
            count={720000}
            icon={<PaidIcon  fontSize="large" color="success" />}
          />
        </Box>


        {/* PRUEBA DE MODALCOMPONENT */}
        <Button variant="outlined" onClick={handleClickOpen}>
          Registrar
        </Button>
        <ModalComponent 
          openModal={open}
          titleModal='REGISTRAR VIAJES'
          bodyModal='ESTE ES UN BODY PASADO AL COMPONENTE MODAL'
          handleCloseModal={handleClose}
          sizeModal='xl'
        />

        <Table />
        {/* <ReactTableComponent /> */}
      </Container>
    </>
  )
}

export default Dashboard