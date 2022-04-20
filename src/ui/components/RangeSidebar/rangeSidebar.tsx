import React, { useState } from 'react';
import './rangeSidebar.css';
import { Range } from './Range/Range';

export const RangeSidebar = () => {
	return (
		<div className='sidebarBlock'>
			<div className='buttonBlock'>
				<div>
					Show packs cards
				</div>
				<div>
					<button className='button'> My</button>
					<button className='button'> All</button>
				</div>
			</div>

			<div className='rangeBlock'></div>
			Number of cards
			<Range
				min={0}
				max={100} />
		</div>


	);
};
