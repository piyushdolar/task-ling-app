import * as React from 'react'

function App() {
	React.useEffect(() => {
		console.log('i fired')
	}, [])
	return <div>OKAY TEST PAGE</div>
}

export default App
