import React from 'react';
import { useCounterContext, CounterProvider } from './hooks/useCounterProvider';


function Counter(){
	const [state, dispatch] = useCounterContext()

	return <div>
		<p>Count: {state.count}</p>
		<button onClick={() => dispatch({type: 'increment'})}>Increment</button>
		<button onClick={() => dispatch({type: 'decrement'})}>Decrement</button>
		<button onClick={() => dispatch({type: 'reset', count: 0})}>Reset</button>
	</div>
}


export function ContextExamplePage() {

	return (
		<div>
			<CounterProvider>
				<Counter />
			</CounterProvider>
		</div>
	);
}
