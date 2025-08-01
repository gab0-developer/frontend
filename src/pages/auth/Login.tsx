import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { API_URL } from "../../api/application";
import {
  Box,
  Button,
  Container,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography
} from "@mui/material";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useForm, type SubmitHandler } from "react-hook-form";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import { alpha, styled } from '@mui/material/styles';
import { pink } from '@mui/material/colors';
import Switch from '@mui/material/Switch';

import "./style-login.css";
import { showToast } from "../../utils/toast";

import img from '../../assets/img/img'

type FormValues = {
  email: string;
  password: string;
};

const PinkSwitch = styled(Switch)(({ theme }) => ({
  '& .MuiSwitch-switchBase.Mui-checked': {
    color: pink[600],
    '&:hover': {
      backgroundColor: alpha(pink[600], theme.palette.action.hoverOpacity),
    },
  },
  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
    backgroundColor: pink[600],
  },
}));

const label = { inputProps: { 'aria-label': 'Color switch demo' } };

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const location = useLocation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid }
  } = useForm<FormValues>();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const getAxios = async (obj_data: any) => {
    const url = `${API_URL}/auth/login`;

    try {
      setLoading(true);
      const resp = await axios.post(url, obj_data, {
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (resp.status === 200 && resp.data.success) {
        const { data: token } = resp.data;

        localStorage.setItem("authToken", token);
        login(token);
        const from = location.state?.from?.pathname || "/dashboard";
        navigate(from, { replace: true });
      } else {
        console.log("Error inesperado en la respuesta");
      }
    } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response) {
                    if (error.response.data.success === false) {
                        showToast('error',`${error.response.data.message}`)
                    }
                }
            }
        }
        finally {
            setLoading(false); // Reactiva el botón
        }
  };

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const obj_data = {
      ...data,
    };
    getAxios(obj_data);
    // reset();
  };

  return (
    // <Container maxWidth="xl" className="conteiner-login">
      
    // </Container>

    <Box component='div' className="container-login">

      <Box component='div' className="container-form-login">
        
        <Box component='div' className="container-logo-login">
          <Box component='div' className="img-logo-login">
            <img src={img.logo} alt="logo"  />
          </Box>
          <Box component='div' className="bar-login-top"></Box>
          {/* <Box component='div' className="bar-login-bottom"></Box> */}
        </Box>

        <Box component='div' className="bar-login-bottom"></Box>
        
        <Box component='div' className="box-form-login">
          <Box component='div' className="container-title-login">
            <Typography variant="h5" className="title-form-login">
              <strong>Bienvenido de nuevo</strong>
            </Typography>
            <Typography variant="inherit" className="subtitle-form-login">
              Nos alegra tenerte otra vez por aquí.
            </Typography>
          </Box>
          <Box component="form" className="form" onSubmit={handleSubmit(onSubmit)}>
            <TextField
              type="email"
              label="Correo"
              fullWidth
              variant="outlined"
              {...register("email", {
                required: "El correo es obligatorio",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Correo inválido"
                }
              })}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
            <FormControl fullWidth variant="outlined" sx={{ mt: 2 }} error={!!errors.password}>
              <InputLabel htmlFor="password">Contraseña</InputLabel>
              <OutlinedInput
                id="password"
                type={showPassword ? "text" : "password"}
                {...register("password", {
                  required: "La contraseña es obligatoria",
                  pattern: {
                    value: /^[A-Za-z0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]{6,}$/,
                    message: "Mínimo 6 caracteres (letras, números, símbolos)"
                  }
                })}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Contraseña"
              />
              <FormHelperText>{errors.password?.message}</FormHelperText>
            </FormControl>
            <Box component='div' className="container-switch">
                <Typography component="p" sx={{display:'block'}}>
                  Recordar mis datos
                </Typography>
                <Switch {...label} defaultChecked />
            </Box>
            <Box component='div' id="link-login" sx={{ mt: 2 }}>
              <Typography component="p" sx={{display:'block'}}>
                <Link
                  to="/sendemail"
                  style={{
                    color: "#0000FF",
                    textDecoration: "none",
                    fontWeight: "bold"
                  }}
                >
                  ¿Olvidó su contraseña?
                </Link>
              </Typography>
            </Box>

            {/* SUBMIT */}
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ mt: 2 }}
              loading={loading}
              loadingPosition="end"
              // disabled={loading}
              disabled={!isValid || loading}
            >
              {loading ? loading : "Iniciar Sesión"}
            </Button>

          </Box>
        </Box>

      </Box>

      <Box component='div' className="container-img-login">
          <Box component='div' className="img-login">
              <img src={img.login1} alt="login1" />
          </Box>
      </Box>
    </Box>
  );
};

export default Login;
