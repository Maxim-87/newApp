import React, { useCallback, useEffect, useRef, useState } from 'react';
import './Range.css';

type newRangeType = {
	min: number
	max: number
};

export const Range = (props: newRangeType) => {

	const min = props.min;
	const max = props.max;

	const [minVal, setMinVal] = useState(min);
	const [maxVal, setMaxVal] = useState(max);
	const minValRef = useRef(min);
	const maxValRef = useRef(max);
	const range = useRef(null);


	const getPercent = useCallback(
		(value) => Math.round(((value - min) / (max - min)) * 100),
		[min, max],
	);


	useEffect(() => {
		const minPercent = getPercent(minVal);
		const maxPercent = getPercent(maxValRef.current);

		if (range.current) {
			// @ts-ignore
			range.current.style.left = `${minPercent}%`;
			// @ts-ignore
			range.current.style.width = `${maxPercent - minPercent}%`;
		}
	}, [minVal, getPercent]);


	useEffect(() => {
		const minPercent = getPercent(minValRef.current);
		const maxPercent = getPercent(maxVal);

		if (range.current) {
			// @ts-ignore
			range.current.style.width = `${maxPercent - minPercent}%`;
		}
	}, [maxVal, getPercent]);


	return (
		<div>
			<input
				type='range'
				min={min}
				max={max}
				value={minVal}
				onChange={(event) => {
					const value = Math.min(Number(event.target.value), maxVal - 1);
					setMinVal(value);
					minValRef.current = value;
				}}
				className='thumb thumb--left'
				// style={{ zIndex: minVal > max - 100 && "5" }}
			/>
			<input
				type='range'
				min={min}
				max={max}
				value={maxVal}
				onChange={(event) => {
					const value = Math.max(Number(event.target.value), minVal + 1);
					setMaxVal(value);
					maxValRef.current = value;
				}}
				className='thumb thumb--right'
			/>

			<div className='slider'>
				<div className='slider__track' />
				<div ref={range} className='slider__range' />
				<div className='slider__left-value'>{minVal}</div>
				<div className='slider__right-value'>{maxVal}</div>
			</div>
		</div>
	);
};






