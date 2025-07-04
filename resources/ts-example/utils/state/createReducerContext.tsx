import React, { createContext, useContext as useReactContext, useReducer} from 'react';

export function createReducerContext<StateType extends {}, ActionType extends {}>(
	defaultValue: StateType,
	reducer: (state: StateType, action: ActionType) => StateType,
	providerName: string
){

	const Context = createContext<[StateType, React.Dispatch<ActionType>]>([defaultValue, () => {}])
	Context.displayName = providerName
	
	return {
		Provider: ({children}: {children: React.ReactNode}) => {
		const [state, dispatch] = useReducer(reducer, defaultValue)

			return <Context.Provider value={[state, dispatch]}>
				{children}
			</Context.Provider>
		},
		useContext: () => {
			const context = useReactContext(Context)

			if(!context){
				throw new Error(`useContext must be used within a ${providerName}`)
			}

			return context
		}
	}
}
