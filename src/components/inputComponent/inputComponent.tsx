import React, { useState, useEffect } from 'react'
import {useSelector} from 'react-redux'
import style from './styles.module.css'
import TextField from '@material-ui/core/TextField';
import { IState } from '../../models/state';

interface IProps {
    label: string
    width?: string
    onChange:(value: any) => void
    value?:any
    type?:string
}

export const InputComponent:React.FC<IProps> = (props:IProps) => {

    const [value,setValue] = useState(props.value ? props.value : '')
    const students = useSelector((state:IState) =>  state.students)  

    useEffect(() => {
        setValue('')
    },[students])

    useEffect(() => {
        setValue(props.value ? props.value : '')
    },[props.value])

    return (
        <div style={props.width ? {width: props.width} : {}}>
            <TextField
            type={props.type ? props.type : ''}
            value={value}
            id="standard-basic"
            className={style.input}
            label={props.label}
            margin="normal"
            style={props.width ? {width: props.width,margin:0} : {margin: 0}}
            onChange={(e) => { setValue(e.target.value); props.onChange(e.target.value)}}
            />
        </div>
    );
}