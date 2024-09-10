// App.tsx
// Kindacode.com
import React, { useState } from 'react'
import './App.css'

const App = (): JSX.Element => {
	const [clickedButton, setClickedButton] = useState('')

	const buttonHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault()

		const button: HTMLButtonElement = event.currentTarget
		setClickedButton(button.name)
	}

	return (
		<div className='container'>
			<form>
				<div>
				<button onClick={buttonHandler} className='bg-slate-100' name='button 1'>
					Button 1
				</button>
			</div>
				<button onClick={buttonHandler} className='button' name='button 2'>
					Button 2
				</button>
			<div className='bg-slate-300'>
				<button onClick={buttonHandler} className='button' name='button 3'>
					Button 3
				</button>
			</div>
			<div>
				<button onClick={buttonHandler} className='button' name='button 4'>
					Button 4
				</button>
				</div>
			</form>
			<h1>
				{clickedButton !== ''
					? `You have clicked "${clickedButton}"`
					: 'No button clicked yet'}
			</h1>
		</div>
	)
}

export default App
