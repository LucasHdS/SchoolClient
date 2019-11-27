import {ActionTypes,IStudentAction} from '../actions/'
import {IStudent} from '../models/student'

export const students = (state:IStudent[] = [], action: IStudentAction):IStudent[] =>{
    switch (action.type){
        case ActionTypes.Student.Create:

            return [
                ...state,
                action.student
            ]

        case ActionTypes.Student.Update:
            
            const index = state.findIndex(student => 
                student.id === action.student.id
            )

            state[index] = action.student

            return state
        
        case ActionTypes.Student.Delete:
            
            return state.filter(
                student => student.id !== action.student.id
            )
        
        case ActionTypes.Student.Load:
            return action.students
        default:
            return state
    }
}