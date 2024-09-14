import React, { useState } from 'react'
import MandelbrotCanvas from './components/Mandelbrot'
import CustomColorSchemeModal from './components/CustomColorMenu'

const App: React.FC = () => {
	const [maxIter, setMaxIter] = useState<number>(100)
	const [colorScheme, setColorScheme] = useState<string>('default')
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
	const [customColors, setCustomColors] = useState<string[]>([])
	const [prevZoomRect, setPrevZoomRect] = useState<{
		xMin: number
		xMax: number
		yMin: number
		yMax: number
	} | null>(null)

	const [zoomRect, setZoomRect] = useState<{
		xMin: number
		xMax: number
		yMin: number
		yMax: number
	}>({
		xMin: -2.5,
		xMax: 1.5,
		yMin: -1.5,
		yMax: 1.5,
	})

	const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setMaxIter(Number(event.target.value))
	}

	const handleColorSchemeChange = (
		event: React.ChangeEvent<HTMLSelectElement>
	) => {
		const value = event.target.value
		if (value === 'custom') {
			setIsModalOpen(true)
		} else {
			setColorScheme(value)
		}
	}

	const handleSaveCustomColors = (colors: string[]) => {
		setCustomColors(colors)
		setColorScheme('custom')
		setIsModalOpen(false)
	}

	const handleRevertZoom = () => {
		if (prevZoomRect) {
			setZoomRect(prevZoomRect)
		}
	}

	const resolvedColorScheme: string =
		colorScheme === 'custom' ? 'custom' : colorScheme

	return (
		<div className='flex h-screen bg-gray-900'>
			<title>Множество Мандельброта</title>
			<div className='flex flex-col items-center justify-between w-1/4 p-6 bg-gray-800 shadow-xl rounded-xl'>
				<h1 className='mb-6 text-4xl font-bold text-center text-yellow-400'>
					Множество Мандельброта
				</h1>
				<div className='flex flex-col items-center w-full mb-6'>
					<label
						htmlFor='iterations'
						className='mb-2 text-xl font-semibold text-white'
					>
						Max Iterations: {maxIter}
					</label>
					<input
						id='iterations'
						type='range'
						min='10'
						max='2000'
						step='10'
						value={maxIter}
						onChange={handleSliderChange}
						className='w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer'
					/>
				</div>
				<div className='flex flex-col items-center w-full mb-6'>
					<label
						htmlFor='colorScheme'
						className='mb-2 text-xl font-semibold text-white'
					>
						Color Scheme
					</label>
					<select
						id='colorScheme'
						value={colorScheme}
						onChange={handleColorSchemeChange}
						className='w-full p-2 text-white bg-gray-700 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-yellow-500'
					>
						<option value='default'>Обычная</option>
						<option value='grayscale'>Серая</option>
						<option value='blueRed'>Фиолетово-Красная</option>
						<option value='rainbow'>Радужная</option>
						<option value='pastel'>Пастельная</option>
						<option value='neon'>Неоновая</option>
						<option value='graphic'>Графика</option>{' '}
						<option value='custom'>Своя</option>
					</select>
				</div>
				<button
					onClick={handleRevertZoom}
					className='p-2 text-white bg-blue-500 rounded'
				>
					Вернуться работает пока только 1 раз
				</button>
				<button
					onClick={() => setMaxIter(10000)}
					className='p-2 text-white bg-green-500 rounded'
				>
					Для Алексея Владимировича
				</button>
				<div className='mt-4 text-gray-300'>
					<h2 className='mb-2 text-lg font-semibold'>
						О множестве Мандельброта
					</h2>
					<p className='text-base leading-relaxed'>
						Множество Мандельброта — это известный фрактал, определяемый простым
						итеративным процессом. Оно названо в честь математика Бенуа Б.
						Мандельброта, который изучал его в 1970-х годах. Множество
						определяется в комплексной плоскости, и каждая точка в множестве
						определяется итерацией функции <i>f(z+1) = z² + c</i>, где <i>z</i>{' '}
						начинается с нуля, а <i>c</i> — это комплексное число. Если итерации
						функции не ускользают к бесконечности, точка является частью
						множества Мандельброта.
					</p>
				</div>
			</div>
			<div className='flex-1 p-0'>
				<MandelbrotCanvas
					maxIter={maxIter}
					colorScheme={resolvedColorScheme}
					customColors={colorScheme === 'custom' ? customColors : undefined}
					setZoomRect={setZoomRect}
					setPrevZoomRect={setPrevZoomRect}
					zoomRect={zoomRect}
					onRevertZoom={handleRevertZoom}
				/>
			</div>
			<CustomColorSchemeModal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				onSave={handleSaveCustomColors}
			/>
		</div>
	)
}

export default App
