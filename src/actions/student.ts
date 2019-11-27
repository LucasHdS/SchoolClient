import {IStudent} from '../models/student'

export enum StudentActionTypes {
    Create = 'Student.Create',
    Update = 'Student.Update',
    Delete = 'Student.Delete',
    Load = 'Student.Load'
}

export interface IStudentCreateAction{
    type:StudentActionTypes.Create,
    student:IStudent
}

export interface IStudentUpdateAction{
    type:StudentActionTypes.Update,
    student:IStudent
}

export interface IStudentDeleteAction{
    type:StudentActionTypes.Delete,
    student:IStudent
}
export interface IStudentLoadAction{
    type:StudentActionTypes.Load,
    students:IStudent[]
}

export class StudentActionCreators{
    
    public static create = (student:IStudent):IStudentCreateAction =>({
        type:StudentActionTypes.Create,
        student
    })

    public static update = (student:IStudent):IStudentUpdateAction => ({
        type:StudentActionTypes.Update,
        student
    })

    public static delete = (student:IStudent):IStudentDeleteAction => ({
        type:StudentActionTypes.Delete,
        student
    })

    public static load = (students:IStudent[]):IStudentLoadAction => ({
        type:StudentActionTypes.Load,
        students
    })

}

export type IStudentAction = IStudentCreateAction | IStudentUpdateAction | IStudentDeleteAction | IStudentLoadAction
