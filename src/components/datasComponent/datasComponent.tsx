import React,{useEffect, useState} from 'react';
import axios from 'axios';
import {useSelector,useDispatch} from 'react-redux';
import styles from './styles.module.css';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { IStudent } from '../../models/student';
import { IState } from '../../models/state'
import {DataComponent} from './dataComponent/dataComponent'
import { ActionCreators } from '../../actions';

interface IProps{
    onClick: (student:IStudent) => void
}

export const DatasComponent:React.FC<IProps> = (props:IProps) => {

  const dispatch = useDispatch()
  
  const reduxStudents:IStudent[] = useSelector((state:IState) =>  state.students)  

  const [students,setStudents] = useState(reduxStudents)

  useEffect(() => {
    let students:IStudent[] = []

    axios.get('https://191.232.197.170:443/ServiceStudent.svc/getStudents')
    .then((res:any) => {
        res.data.GetStudentsResult.map((x:any) => {
    
            const student:IStudent = {
                course:{
                    id:x.Course.id,
                    label:x.Course.label
                },
                gender:{
                    id: x.Gender.id,
                    label: x.Gender.label
                },
                name: x.name,
                id: x.id
            }
            students.push(student)
            return dispatch(ActionCreators.Student.load(students))
        })
    })
    .catch((err:any) =>{
        console.log(err)
        return
    })
  },[dispatch])

  useEffect(() => {
    setStudents(reduxStudents)
  },[reduxStudents])

  return (
    <Paper className={styles.container}>
      <Table className={styles.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Nome</TableCell>
            <TableCell align="left">Curso</TableCell>
            <TableCell align="left">Sexo</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {students.map(student =>
            <DataComponent onClick={props.onClick} student={student} key={student.id} />
          )}
        </TableBody>
      </Table>
    </Paper>
  );
}