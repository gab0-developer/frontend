import axios from "axios";
import { Link } from 'react-router-dom'; 
import { API_URL } from "../../api/application"
import { useState } from "react";
import TextField from '@mui/material/TextField'
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

import './style-login.css'
import Container from '@mui/material/Container'
import Typography from "@mui/material/Typography";

import { useNavigate } from "react-router-dom";
import { showToast } from "../../utils/toast";

type Props = {}

const Register = ({}: Props) => {
    const navigate = useNavigate();

  const [name,setName] = useState<string>('')
  const [email,setEmail] = useState<string>('')
  const [password,setPassword] = useState<string>('')


  const getAxios = async () =>{
    const url = `${API_URL}/auth/register`
    const obj_data = {
      name,
      email,
      password
    }

    try {
        const resp = await axios.post(url,obj_data, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (resp.status == 201 && resp.statusText == "Created") {
            const resp_data = await resp.data
            console.log(resp_data.message)
            
            navigate('/login');
            console.log('registro exitoso')
        }else{
            console.log(`Ha ocurrido un error inesperado`)
            return 
        }
     
      
    } catch (error) {
        if (axios.isAxiosError(error)) {
        // Manejo específico de errores de Axios
            if (error.response) {
                const dataError = error.response
                if (dataError.data.success === false) {
                    showToast('error',`${dataError.data.message}`)
                }
                if (dataError.data.status === 401) {
                    // Manejo de token expirado
                    navigate('/login');
                }
            }
        }
    }
  }

  const handleRegister = (e:any) =>{
    e.preventDefault()
    getAxios()
  }


  return (
    <>
        <Container maxWidth="xl" className="conteiner-login">
            <Box component="div" className="container-form">
                <Box component='div'>
                    <Typography variant="h6" component="h6" className="logo-form">
                        💼<strong>JobTrack</strong>
                    </Typography>

                </Box>
                <Box component='center'>
                    <Typography variant="h5" component="h5" className="title-form">
                        <strong>Registrarse</strong>
                    </Typography>
                </Box>
                <Box component='div' >
                    <form action="" method="post" className="form" onSubmit={handleRegister}>
                        <TextField
                            type="text"
                            id="input"
                            label="Nombre"
                            value={name}    
                            onChange={(e) => {setName(e.target.value)}}
                            variant="standard"
                        
                        />
                        <TextField
                            type="email"
                            id="input"
                            label="Correo"
                            value={email}    
                            onChange={(e) => {setEmail(e.target.value)}}
                            variant="standard"
                        
                        />
                        <TextField
                            type="password"
                            id="input"
                            label="Contraseña"
                            value={password}    
                            onChange={(e) => {setPassword(e.target.value)}}
                            variant="standard"
                        
                        />
                        
                        <Button type="submit" id="sumit" variant="contained">Registrarse</Button>

                        <Box component='center' id="link-login" sx={{display:'flex'}}>
                            <Typography component="p">
                                ¿Ya tienes una cuenta?{' '}
                                <Link 
                                to="/login" 
                                style={{ 
                                    color: '#1976d2', 
                                    textDecoration: 'none',
                                    fontWeight: 'bold' 
                                }}
                                >
                                Iniciar sesión
                                </Link>
                            </Typography>
                        </Box>
                    </form>
                </Box>
            </Box>
        </Container>
    </>
  )
}


export default Register
