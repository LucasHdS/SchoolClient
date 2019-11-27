import React, { useState } from 'react'
import styles from './styles.module.css'

import {DatasComponent} from '../../components/datasComponent/datasComponent'
import {EditComponent} from '../../components/editComponent/editComponent'
import {FormComponent} from '../../components/formComponent/formComponent'
import { IStudent } from '../../models/student'

export const DefaultPage:React.FC = () =>{

    const [editOpen,setEditOpen] = useState<boolean>(false)

    const [selectedStudent,setSelectedStudent] = useState<IStudent>({
        id:0,
        course:{
            label:'Eng. da Computação',
            id:1
        },
        gender:{
            label:'Masculino',
            id:1
        },
        name:'',
    })

    const handleDataClick = (student:IStudent) => {
        setSelectedStudent(student)
        setEditOpen(true)				
    }

    const onCloseEditModalHandler = () => {
        setEditOpen(false)
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.title}>
                    <h1>Cadastro de Aluno</h1>
                </div>
            </div>
            <div className={styles.body}>
                <div className={styles.form}>
                    <FormComponent type='create' />
                </div>
                <div className={styles.table}>
                    <DatasComponent onClick={(student:IStudent) => {handleDataClick(student)}}></DatasComponent>
                </div>
                <EditComponent onClose={onCloseEditModalHandler} student={selectedStudent} isOpen={editOpen}></EditComponent>
            </div>
        </div>
    );
}