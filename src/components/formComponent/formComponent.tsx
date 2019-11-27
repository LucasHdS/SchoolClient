import React, { useState } from 'react'
import axios from 'axios'
import styles from './styles.module.css'
import { IGender } from '../../models/gender'
import { ICourse } from '../../models/course'
import { IStudent } from '../../models/student'
import { ActionCreators } from '../../actions'
import { useDispatch } from 'react-redux'
import { InputComponent } from '../inputComponent/inputComponent'
import { SelectComponent } from '../selectComponent/selectComponent'
import { ButtonComponent } from '../buttonComponent/buttonComponent'

const genders:IGender[] = [
    {
        label:'Masculino',
        id: 1
    },
    {
        label:'Feminino',
        id:2
    }
]

const courses:ICourse[] = [
    {
        label:'Eng. da Computação',
        id: 1
    },
    {
        label: 'Eng. Cívil',
        id: 2
    },
    {
        label: 'Fisioterapia',
        id: 3
    }
]

interface IProps{
    student?:IStudent
    type:'update' | 'create'
    onSubmit?: () => void
}

export const FormComponent:React.FC<IProps> = (props:IProps) => {
    
    const dispatch = useDispatch()
    
    let gender:IGender = genders[0]
    let course:ICourse = courses[0]

    const [student] = useState<IStudent>(props.student ? props.student : {
        id:0,
        course,
        gender,
        name:''
    })

    let name:string = student.name
   
    const setName = (value: string) => {
        name = value
    }

    const setGender = (value:number) => {
        const selectedGender = (genders.find(gender => gender.id === value))
        if(selectedGender){
            gender = selectedGender
        }
    }
    const setCourse = (value:number) => {
        const selectedCourse = (courses.find(course => course.id === value))
        if(selectedCourse){
            course = selectedCourse
        }
    }
    
    const handleSubmit = (event?: React.FormEvent) => {
        if(event){
            event.preventDefault()    
        }
        if(course && gender && name.length > 0)
        {
            const student:IStudent = {
                id:0,
                name,
                course,
                gender
            }
            if(props.type === 'create')
            {
                axios.defaults.headers.post['Content-Type'] ='application/json;charset=utf-8';
                axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
                axios.post('http://191.232.197.170/ServiceStudent.svc/createStudent',{
                    name:student.name,
                    courseID:student.course.id,
                    genderID:student.gender.id
                })
                .then(() => {
                    dispatch(ActionCreators.Student.create(student))                				
                })
                .catch(() =>{
                    console.log('Erro')
                })

            }
            else{
                    axios.defaults.headers.post['Content-Type'] ='application/json;charset=utf-8';
                    axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
                    axios.put('http://191.232.197.170/ServiceStudent.svc/updateStudent',{
                        id:student.id,
                        name:student.name,
                        courseID:student.course.id,
                        genderID:student.gender.id
                    })
                    .then(() => {
                        dispatch(ActionCreators.Student.update(student))                				
                    })
                    .catch(() =>{
                        console.log('Erro')
                    })
            }

            if(props.onSubmit){
                props.onSubmit()
            }
        }       
    }

    return (
        <div className={styles.container}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <InputComponent type={'text'} value={student.name.length > 0 ? student.name : null}  onChange={setName} width='100%' label='Nome'></InputComponent>
                <SelectComponent value={student.gender} onChange={setGender} values={genders} label='Sexo'></SelectComponent>
                <SelectComponent value={student.course} onChange={setCourse} values={courses} label='Curso' style={{width:'100%',textAlign:'left'}}></SelectComponent>
                <ButtonComponent label={props.type === 'update' ? 'Atualizar' : 'Cadastrar'} state='Enable'>Cadastrar</ButtonComponent>
            </form>
        </div>
    );
}