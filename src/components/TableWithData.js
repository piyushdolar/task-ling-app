import React, { useEffect, useState } from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import LinearProgress from '@mui/material/LinearProgress'

export default function BasicTable(props) {
	const [loading, setLoading] = useState(true)
	const top10Data = props.top10Data
	useEffect(() => {
		// Just showcase of loading, in IRL when we fetch data from AXIOS.
		setTimeout(() => {
			setLoading(false)
		}, 1000)
	}, [])

	return (
		<>
			<TableContainer component={Paper} sx={{ maxHeight: '85vh' }}>
				{loading ? (
					<LinearProgress />
				) : (
					<Table stickyHeader aria-label='simple table'>
						<TableHead>
							<TableRow>
								<TableCell>Name</TableCell>
								<TableCell align='right'>Rank</TableCell>
								<TableCell align='right'>Number of bananas</TableCell>
								<TableCell align='right'>isSearchedUser?</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{top10Data.map((row, index) => (
								<TableRow key={row.uid} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
									<TableCell component='th' scope='row' sx={{ color: props.searchedUser === row.uid ? 'red' : '' }}>
										{row.name}
									</TableCell>
									<TableCell align='right'>{index + 1}</TableCell>
									<TableCell align='right'>{row.bananas}</TableCell>
									<TableCell align='right'>{props.searchedUser === row.uid ? 'yes' : 'no'}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				)}
			</TableContainer>
		</>
	)
}
