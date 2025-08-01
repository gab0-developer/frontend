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

import "./style-login.css";
import { showToast } from "../../utils/toast";

type FormValues = {
  password: string;
  password2: string;
};

const ResetPassword = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const location = useLocation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid }
  } = useForm<FormValues>({ mode: "onChange" });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const getAxios = async (obj_data: any) => {
    console.log(obj_data)

    if(obj_data.password === obj_data.password2){

      showToast('success',`Contraseña actualizada correctamente`)
      const from = location.state?.from?.pathname || "/login";
      navigate(from, { replace: true });

    }else{
      showToast('error',`La contraseña no coincide`)
    }
    // const url = `${API_URL}/auth/login`;

    // try {
    //   setLoading(true);
    //   const resp = await axios.post(url, obj_data, {
    //     headers: {
    //       "Content-Type": "application/json"
    //     }
    //   });

    //   if (resp.status === 200 && resp.data.success) {
    //     const { data: token } = resp.data;

    //     localStorage.setItem("authToken", token);
    //     login(token);
    //     const from = location.state?.from?.pathname || "/dashboard";
    //     navigate(from, { replace: true });
    //   } else {
    //     console.log("Error inesperado en la respuesta");
    //   }
    // } catch (error) {
    //     if (axios.isAxiosError(error)) {
    //         if (error.response) {
    //             if (error.response.data.success === false) {
    //                 showToast('error',`${error.response.data.message}`)
    //             }
    //         }
    //     }
    // }
    // finally {
    //     setLoading(false); 
    // }
  };

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const obj_data = {
      ...data,
    };
    getAxios(obj_data);
    // reset();
  };

  return (
    <Container maxWidth="xl" className="conteiner-login">
      <Box className="container-form">
        {/* <Box>
          <Typography variant="h6" className="logo-form">
            <strong>Logo</strong>
          </Typography>
        </Box> */}
        <Box textAlign="center">
          <Typography variant="h5" className="title-form">
            <strong>Crear su contraseña</strong>
          </Typography>
        </Box>

        <Box component="form" className="form" onSubmit={handleSubmit(onSubmit)}>
         
          {/* PASSWORD */}
          <FormControl fullWidth variant="outlined" sx={{ mt: 2 }} error={!!errors.password}>
            <InputLabel htmlFor="password">Nueva contraseña</InputLabel>
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

          <FormControl fullWidth variant="outlined" sx={{ mt: 2 }} error={!!errors.password}>
            <InputLabel htmlFor="password">Repetir contraseña</InputLabel>
            <OutlinedInput
              id="password"
              type={showPassword ? "text" : "password"}
              {...register("password2", {
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
            <FormHelperText>{errors.password2?.message}</FormHelperText>
          </FormControl>


          {/* SUBMIT */}
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 2 }}
            loading={loading}
            loadingPosition="end"
            disabled={!isValid || loading}
          >
            {loading ? loading : "Cambiar contraseña"}
          </Button>

          {/* LINK */}
          <Box textAlign="center" id="link-login" sx={{ mt: 2 }}>
            <Typography component="p" sx={{display:'block'}}>
              <Link
                to="/sendemail"
                style={{
                  color: "#1976d2",
                  textDecoration: "none",
                  fontWeight: "bold"
                }}
              >
                ¿Olvidó su contraseña?
              </Link>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default ResetPassword;
