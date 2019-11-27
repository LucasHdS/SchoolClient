import React, { useEffect, useState } from 'react';
import styles from './styles.module.css'
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { IStudent } from '../../models/student';
import {FormComponent} from '../formComponent/formComponent'

interface IProps{
    isOpen:boolean
    student:IStudent
    onClose: () => void
}

export const EditComponent:React.FC<IProps> = (props:IProps) => {
    
    const [open, setOpen] = React.useState(props.isOpen);
    const [student,setStudent] = useState<IStudent>(props.student)    

    useEffect(() => {
        setStudent(props.student)
    },[props.student])
    
    useEffect(() =>{
      setOpen(props.isOpen)
    },[props.isOpen])

    const handleClose = () => {
      props.onClose()  
      setOpen(false)
    };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={styles.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
            <div className={styles.form}>
                <FormComponent onSubmit={handleClose} type='update' student={student}/>
            </div>
        </Fade>
      </Modal
      >
    </div>
  );
}