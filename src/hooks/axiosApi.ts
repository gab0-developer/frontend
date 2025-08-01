import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { API_URL } from "../api/application";
import { showToast } from "../utils/toast";

type SetState<T> = React.Dispatch<React.SetStateAction<T>>;

export const getAxios = async <T> (
        endpoint:string,
        setData: (data: T) => void,
        navigate:ReturnType<typeof useNavigate>) =>{

    // const navigate = useNavigate();
    const url = `${API_URL}${endpoint}`

    try {
        const resp = await axios.get(url,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('authToken')}` // Opcional
            }
        });

        if (resp.status === 200 && resp.statusText === "OK") {
            const resp_data = await resp.data
            if (resp_data.success) {
                setData(resp_data.data)
            }
            
        }else{
            showToast('error',`Ha ocurrido un error inesperado`)
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
export const getIDAxios = async <T> (
    endpoint: string,
    setData: (data: T) => void ): Promise<void>  =>{

    const url = `${API_URL}${endpoint}`

    try {
        const resp = await axios.get<{ data: T }>(url,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('authToken')}` // Opcional
            }
        });

        if (resp.status === 200 && resp.statusText === "OK") {
            const resp_data = await resp.data
            if (resp_data) {
                setData(resp_data.data)
                
            }            
        }else{
            showToast('error',`Ha ocurrido un error inesperado`)
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
                
            }
        }
    }
}
export const postAxios = async (
        endpoint:string,
        obj_data:any,
        navigate:ReturnType<typeof useNavigate>,
        refreshPostulations?: () => void) =>{

        const url = `${API_URL}${endpoint}`

        try {
            const resp = await axios.post(url,obj_data, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}` // Opcional
                }
            });

            if (resp.status == 201 && resp.statusText == "Created") {
                const resp_data = await resp.data

                if (resp_data.success) {
                    showToast('success',`${resp_data.message}`)
                    refreshPostulations?.()
                    return 
                }

            }else{
                showToast('error',`Ha ocurrido un error inesperado`)
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
export const putAxios = async (
        endpoint:string,
        obj_data:any,
        navigate:ReturnType<typeof useNavigate>,
        refreshPostulations: () => void) =>{

        const url = `${API_URL}${endpoint}`

        try {
            const resp = await axios.put(url,obj_data, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}` // Opcional
                }
            });
            
            if (resp.status === 200 && resp.statusText === "OK") {
                const resp_data = await resp.data

                if (resp_data.success) {
                    showToast('success',`${resp_data.message}`)
                    refreshPostulations()
                    return 
                }
            }else{
                showToast('error',`Ha ocurrido un error inesperado`)
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

export const DeleteAxios = async (
        endpoint:string,
        navigate:ReturnType<typeof useNavigate>,
        refreshPostulations: () => void) =>{

    const url = `${API_URL}${endpoint}`

    try {
        const resp = await axios.delete(url,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('authToken')}` // Opcional
            }
        });

        if (resp.status === 200 && resp.statusText === "OK") {
            const resp_data = await resp.data

            if (resp_data.success) {
                showToast('success',`${resp_data.message}`)
                refreshPostulations()
                return 
            }
                        
        }else{
            showToast('error',`Ha ocurrido un error inesperado`)
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