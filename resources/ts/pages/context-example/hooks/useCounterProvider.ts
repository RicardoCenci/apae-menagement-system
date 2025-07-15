import { createReducerContext } from "../../../utils/state/createReducerContext"

type StateType = {
	count: number
}

const defaultState: StateType = {
	count: 0,
}

type ActionType = {
	type: 'increment' | 'decrement'
} | {
	type: 'reset'
	count: number
}


function reducer(state: StateType, action: ActionType): StateType {
	switch(action.type){
		case 'increment':
			return {
				...state,
				count: state.count + 1,
			}
		case 'decrement':
			return {
				...state,
				count: state.count - 1,
			}
		case 'reset':
			return {
				...state,
				count: action.count,
			}
		default:
			return state
	}
}


export const {
	useContext: useCounterContext,
	Provider: CounterProvider,
} = createReducerContext(
	defaultState, 
	reducer, 
	'CounterProvider'
)
