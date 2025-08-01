import { useEffect, useState } from "react";
import {
  Autocomplete,
  Box,
  Button,
  TextField
} from "@mui/material";
import { format, parseISO } from "date-fns";
import { useNavigate } from "react-router-dom";
import { getAxios, putAxios } from "../../hooks/axiosApi";
import { useForm, Controller } from "react-hook-form";

interface StatusItem {
  id: number;
  status_name: string;
}

type Props = {
  id: number;
  job_title: string;
  position: string;
  link: string;
  created_at: string;
  company: string;
  status: string;
  refreshPostulations: () => void;
  handleCloseDialogUpdate: () => void;
};

type FormData = {
  job_title: string;
  position: string;
  link: string;
  company: string;
  status_id: StatusItem | null;
};

const UpdateJob = ({
  id,
  job_title,
  position,
  link,
  created_at,
  company,
  status,
  refreshPostulations,
  handleCloseDialogUpdate
}: Props) => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors }
  } = useForm<FormData>({
    defaultValues: {
      job_title,
      position,
      link,
      company,
      status_id: null
    }
  });

  const [listStatus, setListStatus] = useState<StatusItem[]>([]);

  useEffect(() => {
    getAxios(`/status/`, setListStatus, navigate);
  }, []);

  useEffect(() => {
    if (listStatus.length > 0 && status) {
      const statusId = typeof status === "string" ? parseInt(status) : status;
      const currentStatus = listStatus.find((item) => item.id === statusId);
      setValue("status_id", currentStatus || null);
    }
  }, [listStatus, status, setValue]);

  const onSubmit = (data: FormData) => {
    const obj_data = {
      job_title: data.job_title,
      company: data.company,
      position: data.position,
      link: data.link,
      status_id: data.status_id?.id
    };

    putAxios(`/job/${id}`, obj_data, navigate, refreshPostulations);
    handleCloseDialogUpdate();
  };

  return (
    <Box component="div" key={id}>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} className="form">
        <TextField
          fullWidth
          label="Título"
          variant="standard"
          {...register("job_title", {
            required: "El título es obligatorio",
            pattern: {
              value: /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/,
              message: "Solo letras y espacios"
            }
          })}
          error={!!errors.job_title}
          helperText={errors.job_title?.message}
        />

        <TextField
          fullWidth
          label="Compañía/empresa"
          variant="standard"
          {...register("company", {
            required: "La compañía es obligatoria",
            pattern: {
              value: /^[A-Za-z0-9ÁÉÍÓÚáéíóúñÑ\s]+$/,
              message: "Solo letras, números y espacios"
            }
          })}
          error={!!errors.company}
          helperText={errors.company?.message}
        />

        <TextField
          fullWidth
          label="Puesto profesional"
          variant="standard"
          {...register("position", {
            required: "El puesto es obligatorio",
            pattern: {
              value: /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/,
              message: "Solo letras y espacios"
            }
          })}
          error={!!errors.position}
          helperText={errors.position?.message}
        />

        <TextField
          fullWidth
          label="Link de postulación"
          variant="standard"
          {...register("link", {
            required: "El enlace es obligatorio",
            pattern: {
              value: /^(https?:\/\/)?([\w\-]+\.)+[\w\-]+(\/[\w\-._~:/?#[\]@!$&'()*+,;=]*)?$/,
              message: "URL inválida"
            }
          })}
          error={!!errors.link}
          helperText={errors.link?.message}
        />

        <TextField
          fullWidth
          label="Fecha de postulación"
          variant="filled"
          value={format(parseISO(created_at), "yyyy-MM-dd")}
          InputProps={{ readOnly: true }}
        />

        {/* Integración del Autocomplete con React Hook Form usando Controller. */}
        <Controller
          name="status_id"
          control={control}
          rules={{ required: "Debes seleccionar un estado" }}
          render={({ field }) => (
            <Autocomplete
              {...field}
              options={listStatus}
              getOptionLabel={(option) => option?.status_name || ""}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              onChange={(_, data) => field.onChange(data)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Estatus"
                  variant="outlined"
                  error={!!errors.status_id}
                  helperText={errors.status_id?.message}
                />
              )}
            />
          )}
        />

        <Box sx={{ mt: 1 }}>
          <Button type="submit" variant="contained">
            Guardar
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default UpdateJob;
