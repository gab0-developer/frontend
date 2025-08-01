import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { API_URL } from "../../api/application";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography
} from "@mui/material";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useForm, type SubmitHandler } from "react-hook-form";

import "./style-login.css";
import { showToast } from "../../utils/toast";

type FormValues = {
  otp: string;
};

const VerifyCode = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const location = useLocation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid  }
  } = useForm<FormValues>({ mode: "onChange" });

  const [loading, setLoading] = useState(false);


  const getAxios = async (obj_data: any) => {
    console.log(obj_data)

    if(obj_data.otp === '123'){

      showToast('success',`Código válido`)
      const from = location.state?.from?.pathname || "/resetpassword";
      navigate(from, { replace: true });

    }else{
      showToast('error',`El código no es correcto. Por favor verifiqué`)
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
    // }finally {
    //   setLoading(false); 
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
            <strong>Ingresar código</strong>
          </Typography>
        </Box>

        <Box component="form" className="form" onSubmit={handleSubmit(onSubmit)}>
          {/* otp */}
          <TextField
            type="number"
            label="Ingresar código"
            fullWidth
            variant="standard"
            {...register("otp", {
              required: "El código es obligatorio",
              pattern: {
                value: /\d+/,
                message: "Digitos válidos"
              }
            })}
            error={!!errors.otp}
            helperText={errors.otp?.message}
          />

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
            {loading ? loading : "Confirmar"}
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
                ¿No se envio el código?
              </Link>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default VerifyCode;
