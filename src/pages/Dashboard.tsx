import './style-dashboard.css'
import { useEffect, useState } from 'react';
import Cards from '../components/Cards';
import { getAxios } from '../hooks/axiosApi';
import { useNavigate } from 'react-router-dom';
import { Box,Container,Typography } from '@mui/material';

import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PaidIcon from '@mui/icons-material/Paid';
import ChartBard from '../utils/ChartBard';

import { format, parseISO } from 'date-fns';

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
  const [postulationPendiente, setPostulationPendiente] = useState<Postulation[]>([]);
  const [postulationAprobada, setPostulationAprobada] = useState<Postulation[]>([]);
  const [postulationRechazada, setPostulationRechazada] = useState<Postulation[]>([]);
  const [postulationEntrevista, setPostulationEntrevista] = useState<Postulation[]>([]);
  const [postulationYear, setPostulationYear] = useState<string[]>([]);
  const [postulationCountYear, setPostulationCountYear] = useState<number[]>([]);
  const [postulationMonth, setPostulationMonth] = useState<string[]>([]);
  const [postulationCountMonth, setPostulationCountMonth] = useState<number[]>([]);
  
  const refreshPostulations =  async () => {
      await getAxios(`/job/`,setPostulations,navigate)
  };
  
  const findPostulactionStatus = () =>{
    setPostulationPendiente(postulations.filter((item) => item.status_id == `1`))
    setPostulationAprobada(postulations.filter((item) => item.status_id == `2`))
    setPostulationRechazada(postulations.filter((item) => item.status_id == `3`))
    setPostulationEntrevista(postulations.filter((item) => item.status_id == `4`))
    setPostulationYear(postulations.map((item) => format(parseISO(item.created_at), 'yyyy')));

    const yearCounts: Record<string, number> = {};
    const monthCounts: Record<string, number> = {};
    const meses = ['Ninguno','Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']

    postulations.forEach((item) => {
      const year = format(parseISO(item.created_at), 'yyyy');
      yearCounts[year] = (yearCounts[year] || 0) + 1;
    });
    postulations.forEach((item) => {
      const month = format(parseISO(item.created_at), 'MM');
      monthCounts[month] = (monthCounts[month] || 0) + 1;
    });

    const PostulationYear = Object.keys(yearCounts).sort();
    const countPostulationYear = PostulationYear.map((year) => yearCounts[year]);

    const PostulationMonth = Object.keys(monthCounts).sort();
    const countPostulationMonth = PostulationMonth.map((month) => monthCounts[month]);

    setPostulationYear(PostulationYear);
    setPostulationCountYear(countPostulationYear);

    setPostulationMonth(PostulationMonth.map((item) => meses[parseInt(item)]))
    setPostulationCountMonth(countPostulationMonth);

  }

  
  useEffect(() =>{
    refreshPostulations()
  },[])
  useEffect(() =>{
    findPostulactionStatus()
  },[postulations])


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
        <Box component='div' className='container-chartjs'>
          <Box component='div' className='chartjs'>
            <ChartBard 
              titiledashboard="Total postulaciones mensuales"
              subtitledata="Cantidad de postulaciones"
              labeldata={postulationMonth}
              datas={postulationCountMonth} 
              indexAxis="x"
            />
          </Box>
          <Box component='div' className='chartjs'>
            <ChartBard 
              titiledashboard="Total postulaciones anuales"
              subtitledata="Cantidad de postulaciones"
              labeldata={postulationYear}
              datas={postulationCountYear} 
              indexAxis="x"
            />
          </Box>
        </Box>
      </Container>
    
      
    </>
  )
}

export default Dashboard