import * as React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Homepage from './Pages/HomePage'
import Testpage from './Pages/Testpage'

function App() {
	return (
		<BrowserRouter>
			<CssBaseline />
			<Container maxWidth='lg'>
				<Box sx={{ bgcolor: '#fbfbfb', height: '100vh', padding: '1em' }}>
					<Routes>
						<Route path='/' element={<Homepage />} index />
						<Route path='/test' element={<Testpage />} />
					</Routes>
				</Box>
			</Container>
		</BrowserRouter>
	)
}

export default App
