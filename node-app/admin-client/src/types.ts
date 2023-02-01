export type Indexed<T> = { [key: string]: T }

export type InputErrorState = { error: boolean; classes: string[] }

export type FormErrorState = Indexed<InputErrorState>
