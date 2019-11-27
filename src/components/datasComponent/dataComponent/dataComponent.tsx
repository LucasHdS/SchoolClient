import React, { useState, useEffect } from 'react'
import axios from 'axios'
import styles from './styles.module.css'
import { IStudent } from '../../../models/student';
import { TableRow, TableCell } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { ActionCreators } from '../../../actions';
import { useDispatch, useSelector } from 'react-redux';
import { IState } from '../../../models/state';

interface IProps{
    student:IStudent
    onClick: (student:IStudent) => void
}

export const DataComponent:React.FC<IProps> = (props:IProps) => {
    const dispatch = useDispatch()
    
    const [localStudent,setLocalStudent] = useState<IStudent>(props.student)

    const student = useSelector((state:IState) =>  {
        const index = state.students.findIndex(student => 
            student.id === props.student.id
        )

        return state.students[index]
    })  

    useEffect(() =>{
        setLocalStudent(student)
    },[student])

    const handleDeleteClick = (student:IStudent) => {
        axios.defaults.headers.post['Content-Type'] ='application/json;charset=utf-8';
        axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
        axios.delete(`https://191.232.197.170:443/ServiceStudent.svc/deleteStudent/${student.id}`)
        .then(() => {
            dispatch(ActionCreators.Student.delete(student))				
        })
        .catch(() =>{
            console.log('Erro')
        })
    }

    return (
        <>
            <TableRow onClick={() => props.onClick(props.student)} className={styles.row} key={localStudent.id}>
              <TableCell align="left">{localStudent.name}</TableCell>
              <TableCell align="left">{localStudent.course.label}</TableCell>
              <TableCell align="left">{localStudent.gender.label}</TableCell>
              <TableCell><DeleteIcon onClick={() => handleDeleteClick(localStudent)} className={styles.icon} color='primary'/></TableCell>
            </TableRow>
        </>
    );
}