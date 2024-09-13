import React, { useRef, useState, useEffect } from 'react'

const WIDTH = 1400
const HEIGHT = 1000

const mandelbrot = (cx: number, cy: number, maxIter: number): number => {
	let x = 0
	let y = 0
	let iter = 0

	while (x * x + y * y <= 4 && iter < maxIter) {
		const xTemp = x * x - y * y + cx
		y = 2 * x * y + cy
		x = xTemp
		iter++
	}

	return iter
}

const drawMandelbrot = (
	ctx: CanvasRenderingContext2D,
	xMin: number,
	xMax: number,
	yMin: number,
	yMax: number,
	maxIter: number,
	colorScheme: string,
	customColors?: string[]
) => {
	const width = ctx.canvas.width
	const height = ctx.canvas.height

	for (let px = 0; px < width; px++) {
		for (let py = 0; py < height; py++) {
			const x = xMin + ((xMax - xMin) * px) / width
			const y = yMin + ((yMax - yMin) * py) / height

			const iter = mandelbrot(x, y, maxIter)
			let color

			if (colorScheme === 'custom' && customColors) {
				color =
					iter === maxIter ? 'black' : customColors[iter % customColors.length]
			} else {
				switch (colorScheme) {
					case 'blueRed':
						color =
							iter === maxIter ? 'black' : `rgb(${iter * 12}, 0, ${iter * 5})`
						break
					case 'rainbow':
						const hue = (iter / maxIter) * 360
						color = iter === maxIter ? 'black' : `hsl(${hue}, 100%, 50%)`
						break
					case 'pastel':
						color =
							iter === maxIter
								? 'black'
								: `rgb(${iter * 8}, ${iter * 4}, ${iter * 6})`
						break
					case 'neon':
						color =
							iter === maxIter
								? 'black'
								: `rgb(${(iter * 20) % 255}, ${(iter * 10) % 255}, ${
										(iter * 15) % 255
								  })`
						break
					case 'grayscale':
					default:
						color =
							iter === maxIter
								? 'black'
								: `rgb(${(iter * 255) / maxIter}, ${(iter * 255) / maxIter}, ${
										(iter * 255) / maxIter
								  })`
						break
				}
			}

			ctx.fillStyle = color
			ctx.fillRect(px, py, 1, 1)
		}
	}
}

interface MandelbrotCanvasProps {
	maxIter: number
	colorScheme: string
	customColors?: string[]
}

const MandelbrotCanvas: React.FC<MandelbrotCanvasProps> = ({
	maxIter,
	colorScheme,
	customColors,
}) => {
	const canvasRef = useRef<HTMLCanvasElement | null>(null)
	const [rect, setRect] = useState<{
		x1: number
		y1: number
		x2: number
		y2: number
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

	useEffect(() => {
		if (canvasRef.current) {
			const ctx = canvasRef.current.getContext('2d')
			if (ctx) {
				drawMandelbrot(
					ctx,
					zoomRect.xMin,
					zoomRect.xMax,
					zoomRect.yMin,
					zoomRect.yMax,
					maxIter,
					colorScheme,
					customColors
				)
			}
		}
	}, [zoomRect, maxIter, colorScheme, customColors])

	const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
		const rectElem = canvasRef.current?.getBoundingClientRect()
		if (rectElem) {
			const x = e.clientX - rectElem.left
			const y = e.clientY - rectElem.top
			setRect({
				x1: x,
				y1: y,
				x2: x,
				y2: y,
			})
		}
	}

	const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
		if (rect) {
			const rectElem = canvasRef.current?.getBoundingClientRect()
			if (rectElem) {
				const x = e.clientX - rectElem.left
				const y = e.clientY - rectElem.top

				const width = x - rect.x1
				const height = y - rect.y1

				const aspectRatio = 4 / 3
				const newWidth = Math.max(height * aspectRatio, width)
				const newHeight = Math.max(width / aspectRatio, height)

				const centerX = rect.x1 + width / 2
				const centerY = rect.y1 + height / 2

				setRect(prevRect => ({
					x1: centerX - newWidth / 2,
					y1: centerY - newHeight / 2,
					x2: centerX + newWidth / 2,
					y2: centerY + newHeight / 2,
				}))
			}
		}
	}

	const handleMouseUp = () => {
		if (rect) {
			const { x1, y1, x2, y2 } = rect
			const xMin =
				zoomRect.xMin +
				((zoomRect.xMax - zoomRect.xMin) * Math.min(x1, x2)) / WIDTH
			const xMax =
				zoomRect.xMin +
				((zoomRect.xMax - zoomRect.xMin) * Math.max(x1, x2)) / WIDTH
			const yMin =
				zoomRect.yMin +
				((zoomRect.yMax - zoomRect.yMin) * Math.min(y1, y2)) / HEIGHT
			const yMax =
				zoomRect.yMin +
				((zoomRect.yMax - zoomRect.yMin) * Math.max(y1, y2)) / HEIGHT

			const padding = 0.1
			const xRange = xMax - xMin
			const yRange = yMax - yMin
			const centerX = (xMin + xMax) / 2
			const centerY = (yMin + yMax) / 2

			setZoomRect({
				xMin: centerX - (xRange / 2) * (1 + padding),
				xMax: centerX + (xRange / 2) * (1 + padding),
				yMin: centerY - (yRange / 2) * (1 + padding),
				yMax: centerY + (yRange / 2) * (1 + padding),
			})
			setRect(null)
		}
	}

	return (
		<div className='relative w-full h-full'>
			<canvas
				ref={canvasRef}
				width={WIDTH}
				height={HEIGHT}
				onMouseDown={handleMouseDown}
				onMouseMove={handleMouseMove}
				onMouseUp={handleMouseUp}
				className='border border-black'
			/>
			{rect && (
				<div
					className='absolute border-2 border-red-600 rounded shadow-md'
					style={{
						left: rect.x1,
						top: rect.y1,
						width: rect.x2 - rect.x1,
						height: rect.y2 - rect.y1,
						pointerEvents: 'none',
						boxSizing: 'border-box',
					}}
				/>
			)}
		</div>
	)
}

export default MandelbrotCanvas
