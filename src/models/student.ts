import {IGender} from './gender'
import {ICourse} from './course'

export interface IStudent {
    id:number
    name:string,
    gender: IGender,
    course:ICourse
}

export interface IStudentList{
    students:IStudent[]
}
