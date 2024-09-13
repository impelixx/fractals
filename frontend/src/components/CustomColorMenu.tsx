import React, { useState } from 'react'

interface CustomColorSchemeModalProps {
	isOpen: boolean
	onClose: () => void
	onSave: (colors: string[], name?: string) => void
}

const predefinedColorSchemes: Record<string, string[]> = {
	default: ['#000000', '#FFFFFF', '#FF0000', '#00FF00', '#0000FF'],
	grayscale: ['#000000', '#333333', '#666666', '#999999', '#CCCCCC'],
	blueRed: ['#0000FF', '#FF0000', '#00FFFF', '#FF00FF', '#FFFF00'],
	rainbow: [
		'#FF0000',
		'#FF7F00',
		'#FFFF00',
		'#7FFF00',
		'#00FF00',
		'#00FF7F',
		'#00FFFF',
		'#007FFF',
		'#0000FF',
		'#7F00FF',
		'#FF00FF',
	],
	pastel: ['#FFB3BA', '#FFDFBA', '#FFFFBA', '#BAFFC9', '#BAE1FF'],
	neon: ['#39FF14', '#FF073A', '#FF6F00', '#F5F5F5', '#6F00FF'],
}

const CustomColorSchemeModal: React.FC<CustomColorSchemeModalProps> = ({
	isOpen,
	onClose,
	onSave,
}) => {
	const [colors, setColors] = useState<string[]>(predefinedColorSchemes.default)
	const [selectedScheme, setSelectedScheme] = useState<string>('default')
	const [newSchemeName, setNewSchemeName] = useState<string>('')

	const handleColorChange = (index: number, color: string) => {
		if (selectedScheme === 'custom') {
			const newColors = [...colors]
			newColors[index] = color
			setColors(newColors)
		}
	}

	const handleAddColor = () => {
		if (selectedScheme === 'custom') {
			setColors([...colors, '#FFFFFF'])
		}
	}

	const handleSchemeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const scheme = event.target.value
		setSelectedScheme(scheme)
		setColors(predefinedColorSchemes[scheme] || [])
	}

  const handleSave = () => {
    if (selectedScheme === 'custom') {
      onSave(colors)
    }
  }

	return (
		<div
			className={`fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center transition-opacity ${
				isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
			}`}
		>
			<div className='p-6 bg-gray-900 rounded-lg shadow-lg'>
				<h2 className='mb-4 text-xl font-semibold text-white'>
					Customize Color Scheme
				</h2>
				<div className='mb-4'>
					<label htmlFor='colorSchemes' className='block mb-2 text-white'>
						Predefined Schemes
					</label>
					<select
						id='colorSchemes'
						value={selectedScheme}
						onChange={handleSchemeChange}
						className='w-full p-2 text-white bg-gray-700 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-yellow-500'
					>
						{Object.keys(predefinedColorSchemes).map(scheme => (
							<option key={scheme} value={scheme}>
								{scheme.charAt(0).toUpperCase() + scheme.slice(1)}
							</option>
						))}
						<option value='custom'>Custom</option>
					</select>
				</div>
				{selectedScheme === 'custom' && (
					<div className='mb-4'>
					</div>
				)}
				<div className='flex flex-wrap mb-4'>
					{colors.map((color, index) => (
						<input
							key={index}
							type='color'
							value={color}
							onChange={e => handleColorChange(index, e.target.value)}
							className='w-10 h-10 mb-2 mr-2 border-none'
							disabled={selectedScheme !== 'custom'}
						/>
					))}
					{selectedScheme === 'custom' && (
						<button
							onClick={handleAddColor}
							className='px-4 py-2 text-white bg-green-500 rounded-lg'
						>
							Add Color
						</button>
					)}
				</div>
				<div className='flex justify-end'>
					<button
						onClick={onClose}
						className='px-4 py-2 mr-2 text-white bg-gray-600 rounded-lg'
					>
						Cancel
					</button>
					<button
						onClick={handleSave}
						className='px-4 py-2 text-white bg-blue-500 rounded-lg'
					>
						Save
					</button>
				</div>
			</div>
		</div>
	)
}

export default CustomColorSchemeModal
