import React from 'react'
import Button from '@material-ui/core/Button';

interface IProps {
    label: string
    width?: string
    state: 'Enable' | 'Disable'
}

export const ButtonComponent:React.FC<IProps> = (props:IProps) => {
    
    return (
        <div style={props.width ? {width: props.width} : {}}>
            <Button type={'submit'} variant="contained" color="primary" disabled={props.state === 'Disable'}>
                {props.label}
            </Button>
        </div>
    );
}