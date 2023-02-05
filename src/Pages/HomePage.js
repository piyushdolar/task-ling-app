import React, { useState, useEffect } from 'react'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import InputAdornment from '@mui/material/InputAdornment'
import Button from '@mui/material/Button'
import SearchIcon from '@mui/icons-material/Search'
import TableWithData from '../components/TableWithData'
import RawData from '../api/leaderboard.json'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

const Homepage = () => {
	// Dialog box settings
	const [open, setOpen] = React.useState(false)
	const theme = useTheme()
	const fullScreen = useMediaQuery(theme.breakpoints.down('md'))

	// Form and data settings
	const [searchedUser, setSearchedUser] = useState('')
	const [username, setUsername] = useState('')
	const [dataArray, setDataArray] = useState([])
	const [orgTop10, setOrgTop10] = useState([])
	const [top10Data, setTop10Data] = useState([])

	// Descending order for most bananas and get top 10
	const getTop10Data = () => {
		if (dataArray) {
			const data = dataArray.sort((a, b) => {
				return b.bananas - a.bananas
			})
			setOrgTop10(data.slice(0, 10))
			setTop10Data(data.slice(0, 10))
		}
	}

	// Convert to array for array operations
	useEffect(() => {
		async function getArray() {
			const data = await Object.keys(RawData).map(key => {
				return RawData[key]
			})
			setDataArray(data)
		}
		getArray()
	}, [])

	// Setting up top 10 after data has been converted to array
	useEffect(() => {
		getTop10Data()
		// eslint-disable-next-line
	}, [dataArray])

	// Search user function
	const searchUser = () => {
		let findUser = dataArray.find(object => object.name === username)
		if (findUser) {
			findUser.rank = dataArray.indexOf(findUser)
			setSearchedUser(findUser.uid)
			const findInTop10ExistUsers = orgTop10.find(o => o.uid === findUser.uid)
			// If not found replace the last one
			if (findInTop10ExistUsers === undefined) {
				top10Data[9] = findUser
			} else {
				getTop10Data()
			}
		} else {
			setOpen(true)
		}
	}

	// Close dialog box
	const handleClose = () => {
		setOpen(false)
	}

	return (
		<>
			<Grid container spacing={2}>
				<Grid item xs={12} style={{ display: 'flex', justifyContent: 'center' }}>
					{/* Text field to enter username */}
					<TextField
						label='Search user'
						placeholder='Enter Username'
						value={username}
						onChange={e => setUsername(e.target.value)}
						InputProps={{
							startAdornment: (
								<InputAdornment position='start'>
									<SearchIcon />
								</InputAdornment>
							)
						}}
						variant='outlined'
					/>

					{/* Search button */}
					<Button onClick={searchUser} variant='outlined' endIcon={<SearchIcon />} style={{ marginLeft: '1em' }}>
						Search
					</Button>

					{/* Alert */}
					<Dialog fullScreen={fullScreen} open={open} onClose={handleClose} aria-labelledby='responsive-dialog-title'>
						<DialogTitle id='responsive-dialog-title'>Not found!</DialogTitle>
						<DialogContent>
							<DialogContentText>This user name does not exist! Please specify an existing user name!</DialogContentText>
						</DialogContent>
						<DialogActions>
							<Button onClick={handleClose} autoFocus>
								Confirm
							</Button>
						</DialogActions>
					</Dialog>
				</Grid>
				<Grid item xs={12}>
					{/* Render table */}
					<TableWithData top10Data={top10Data} searchedUser={searchedUser} />
				</Grid>
			</Grid>
		</>
	)
}

export default Homepage
