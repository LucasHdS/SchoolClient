  
export enum ToastActionTypes {
	Error = 'Toast.Error',
	Success = 'Toast.Success',
	Info = 'Toast.Info',
	Warn = 'Toast.Warn',
}
    
export interface IToastErrorAction {
	type: ToastActionTypes.Error
	message: string
}

export interface IToastSuccessAction {
	type: ToastActionTypes.Success
	message: string
}

export interface IToastInfoAction {
	type: ToastActionTypes.Info
	message: string
}

export interface IToastWarnAction {
	type: ToastActionTypes.Warn
	message: string
}

export class ToastActionCreators {
	public static error = (message: string): IToastErrorAction => ({
		type: ToastActionTypes.Error,
		message
	})

	public static success = (message: string): IToastSuccessAction => ({
		type: ToastActionTypes.Success,
		message
	})

	public static info = (message: string): IToastInfoAction => ({
		type: ToastActionTypes.Info,
		message
	})

	public static warn = (message: string): IToastWarnAction => ({
		type: ToastActionTypes.Warn,
		message
	})
}

export type IToastAction = IToastErrorAction | IToastSuccessAction | IToastInfoAction | IToastWarnAction