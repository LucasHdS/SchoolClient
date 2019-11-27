import React,{useState} from 'react'
import style from './styles.module.css'
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { ICourse } from '../../models/course';
import { IGender } from '../../models/gender';

interface IProps {
    label: string
    style?: React.CSSProperties
    values: any[]
    value?: IGender | ICourse
    onChange:(value: any) => void
}

export const SelectComponent:React.FC<IProps> = (props:IProps) => {
    
    const [selectedValue,setselectedValue] = useState<IGender | ICourse>(props.values[0].id)

    const handleChange = (value:any) =>{
        setselectedValue(value)
        props.onChange(value)
    }
    return (
        <div className={style.container}>
            <label>{props.label}</label>
            <Select
                labelId={`${props.label}-label`}
                id={`${props.label}-select`}
                value={selectedValue}
                style={props.style ? props.style : {}}
                onChange={(event) => handleChange(event.target.value)}
                >
                {props.values.map(value => {
                    return <MenuItem key={value.id} value={value.id}>{value.label}</MenuItem>
                })}                
            </Select>
        </div>
    );
}