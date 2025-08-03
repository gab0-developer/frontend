import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog, { type DialogProps } from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Fragment } from 'react';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

type Props = {
    openModal: boolean;
    titleModal: string;
    bodyModal: any;
    sizeModal?: DialogProps['maxWidth']; // xs | sm | md | lg | xl | false
    handleCloseModal: () => void;
}

const ModalComponent = ({openModal,titleModal,bodyModal,sizeModal='md',handleCloseModal}: Props) => {
    

  return (
    <>

        <Fragment>
            
            <BootstrapDialog
                onClose={handleCloseModal}
                aria-labelledby="customized-dialog-title"
                open={openModal}
                maxWidth={sizeModal}
                fullWidth
            >
                <DialogTitle sx={{display:'flex', alignContent:'center',justifyContent:'center',m: 0, p: 2 }} id="customized-dialog-title">
                    {titleModal}
                </DialogTitle>
                <IconButton
                aria-label="close"
                onClick={handleCloseModal}
                sx={(theme) => ({
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: theme.palette.grey[500],
                })}
                >
                <CloseIcon />
                </IconButton>
                <DialogContent dividers>
                    {bodyModal}
                </DialogContent>
                <DialogActions>
                <Button autoFocus variant='contained' color='error' onClick={handleCloseModal}>
                    cerrar
                </Button>
                </DialogActions>
            </BootstrapDialog>
            </Fragment>

    </>
  )
}

export default ModalComponent