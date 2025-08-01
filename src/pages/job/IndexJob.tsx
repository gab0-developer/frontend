import * as React from 'react';

import RegisterJob from "./RegisterJob"

import { useNavigate } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import { regexPrimeraLetra } from "../../utils/regexPatterns";
import { useEffect, useState } from "react";
import Tarjetas from "../../components/Tarjetas";
// SLIDE ALERT DIALOG
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import type { TransitionProps } from '@mui/material/transitions';

import { DeleteAxios, getAxios, getIDAxios } from '../../hooks/axiosApi';
import UpdateJob from './UpdateJob';

// En Listjob.tsx
interface Postulation {
  id: number;
  job_title: string;
  position: string;
  link: string;
  created_at:string
  company: string;
  status_id: string;
}


// type Props = {
//     Postulation:string[]
    
// }
type Props = {};

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const IndexJob = (props: Props) => {
    
    const { user } = useAuth();

    const navigate = useNavigate();
    const [postulations, setPostulations] = useState<Postulation[]>([]);
    const [selectedPostulation, setSelectedPostulation] = useState<Postulation | null>(null);

    const regexmatch = user.name.match(regexPrimeraLetra);
    const primeraLetra = regexmatch?.groups?.inicial || "";

    const [openDialogDelete, setOpenDialogDelete] = React.useState(false);
    const [openDialogUpdate, setOpenDialogUpdate] = React.useState(false);
    const [postulationID, setPostulationID] = useState<number>()

     // Función para refrescar las postulaciones
    const refreshPostulations =  async () => {
        await getAxios(`/job/`,setPostulations,navigate)
    };



    const deletePostulation = () => {
        console.log('postulationID: ',postulationID)
        DeleteAxios(`/job/${postulationID}`,navigate,refreshPostulations)
        setOpenDialogDelete(false);
    };
    
    const handleOpenDialogUpdate = (index:number) => {
        console.log(`Dialog ID: ${index}`)
        getIDAxios<Postulation>(`/job/${index}`,setSelectedPostulation)
        setOpenDialogUpdate(true);
    };
    const handleOpenDialogDelete = (index:number) => {
        console.log(`Dialog ID: ${index}`)
        setPostulationID(index)
        setOpenDialogDelete(true);
    };
    const handleCloseDialogUpdate = () => {
      setOpenDialogUpdate(false);
      setSelectedPostulation(null);
    };
    const handleCloseDialog = () => {
      setOpenDialogDelete(false);
    };
    

    useEffect(() =>{
        getAxios(`/job/`,setPostulations,navigate)
    },[])

  return (
    <>
         <React.Fragment>
                <Dialog
                    open={openDialogDelete}
                    slots={{
                        transition: Transition,
                    }}
                    keepMounted
                    onClose={handleCloseDialog}
                    aria-describedby="alert-dialog-slide-description"
                    >
                    <DialogTitle>{"Estas seguro de eliminación?"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                        Una vez eliminado este registro, no se podra recurpar.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button variant='contained' color='error' onClick={handleCloseDialog}>cancelar</Button>
                        <Button variant='contained' color='success' onClick={() => deletePostulation()}>Eliminar</Button>
                    </DialogActions>
                </Dialog>
                <Dialog
                    open={openDialogUpdate}
                    slots={{
                        transition: Transition,
                    }}
                    keepMounted
                    onClose={handleCloseDialogUpdate}
                    aria-describedby="alert-dialog-slide-description"
                    >
                    <DialogTitle>{"Modificar Postulación"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                             {selectedPostulation ? (
                                // <p key={selectedPostulation.id}>{selectedPostulation.id}</p>
                                <UpdateJob
                                    id={selectedPostulation.id}
                                    job_title={selectedPostulation.job_title}
                                    position={selectedPostulation.position}
                                    link={selectedPostulation.link}
                                    created_at={selectedPostulation.created_at}
                                    company={selectedPostulation.company}
                                    status={selectedPostulation.status_id}
                                    refreshPostulations={refreshPostulations}
                                    handleCloseDialogUpdate={handleCloseDialogUpdate}
                                />
                                ) : (
                                <Typography>Cargando...</Typography>
                                )}
                            
                        </DialogContentText>
                    </DialogContent>
                </Dialog>
            </React.Fragment>

            <RegisterJob
                refreshPostulations={refreshPostulations}
             />

            <Box component='div' sx={{display:'flex',alignItems:'center',justifyContent:'space-around',flexWrap:'wrap',marginY:2}}>
                {postulations.length === 0 ? (
                     <Typography sx={{textAlign: 'center', marginTop: '20px' }}>No hay postulaciones registradas.</Typography>
                ):(
                    postulations.map((postulation) => (
                        <Tarjetas 
                            index={postulation.id}
                            primeraLetra={primeraLetra}
                            job_title={postulation.job_title}
                            created_at={postulation.created_at}
                            company={postulation.company}
                            status={postulation.status_id}
                            handleOpenDialogDelete={handleOpenDialogDelete}
                            handleOpenDialogUpdate={handleOpenDialogUpdate}
                        />
                    ))
                )}
            </Box>
    </>
  )
}

export default IndexJob