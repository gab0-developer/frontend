import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';

type Props = {
    title:string,
    count:number,
    icon: React.ReactNode; // <- Aquí permites pasar cualquier ícono como nodo React
}

const Cards = ({title,count,icon}: Props) => {
  return (
    <>
        <Box component='div' className='container-card' sx={{width:'20%',margin:1}}>
            <Card sx={{ maxWidth: '100%' }}>
                <CardContent>
                    <Box component='div' sx={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                        <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
                            {title}
                        </Typography>
                        {icon}
                    </Box>
                    <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>Cantidad:</Typography>
                    <Typography variant="h5">
                        {count}
                    </Typography>
                </CardContent>
            </Card>
        </Box>
    </>
  )
}

export default Cards