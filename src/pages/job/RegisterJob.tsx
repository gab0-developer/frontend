import { useState } from "react";
import { Box, Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { postAxios } from "../../hooks/axiosApi";

import { useForm, type SubmitHandler } from "react-hook-form";


type Props = {
  refreshPostulations: () => void;
};

type FormValues = {
  job_title: string;
  company: string;
  position: string;
  link: string;
};


const RegisterJob = ({refreshPostulations}: Props) => {
  
  const navigate = useNavigate();
  const [open, setOpen] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<FormValues>();


  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const obj_data = {
      ...data,
      status_id: 1,
      // token: localStorage.getItem("authToken"),
    };

    postAxios(`/job/`, obj_data, navigate, refreshPostulations);
    reset();
    setOpen(false);
  };

  return (
    <>
    
      <Button variant="contained" color="info" onClick={() => setOpen(true)}>
        Registrar postulación
      </Button>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Registrar postulación profesional</DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
            <TextField
              label="Título"
              variant="standard"
              {...register("job_title", { 
                required: "Ingresar el titulo",
                pattern: {
                  value: /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/,
                  message: "Solo se permiten letras y espacios"
                }
              })}
              error={!!errors.job_title}
              helperText={errors.job_title?.message}
            />
            <TextField
              label="Compañía/empresa"
              variant="standard"
              {...register("company", { 
                required: "Ingresar la empresa",
                pattern: {
                  value: /^[A-Za-z0-9ÁÉÍÓÚáéíóúñÑ\s]+$/,
                  message: "Solo letras, números y espacios"
                }
              })}
              error={!!errors.company}
              helperText={errors.company?.message}
            />
            <TextField
              label="Puesto profesional"
              variant="standard"
              {...register("position", { 
                required: "Cargo profesional postulado",
                pattern: {
                  value: /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/,
                  message: "Solo se permiten letras y espacios"
                }
              })}
              error={!!errors.position}
              helperText={errors.position?.message}
            />
            <TextField
              label="Link de postulación"
              variant="standard"
              {...register("link", {
                required: "Ingresar link donde postulaste",
                pattern: {
                  value: /^(https?:\/\/)?([\w\-]+\.)+[\w\-]+(\/[\w\-._~:/?#[\]@!$&'()*+,;=]*)?$/,
                  message: "URL inválida"
                }
              })}
              error={!!errors.link}
              helperText={errors.link?.message}
            />
            <DialogActions>
              <Button onClick={() => setOpen(false)} color="error">Cancelar</Button>
              <Button type="submit" color="success">Guardar</Button>
            </DialogActions>
          </Box>
        </DialogContent>
      </Dialog>

    </>
  )
}

export default RegisterJob