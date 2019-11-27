import {IStudentAction,StudentActionCreators,StudentActionTypes} from './student'

export * from './student'

export class ActionTypes {
    public static Student = StudentActionTypes
}

export class ActionCreators{
    public static Student = StudentActionCreators
}

export type IAction = IStudentAction