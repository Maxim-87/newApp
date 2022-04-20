import React, { useEffect } from 'react';
import { useState } from 'react';
import s from './Pagination.module.scss';

type PropsType = {
	totalCount: number,
	countPerPage: number,
	currentPage: number,
	onChange: (page: number) => void
	step?: number
};

export const Pagination = React.memo(({ totalCount, countPerPage, currentPage, onChange, step = 10 }: PropsType) => {
	const [prevIsHidden, setPrevIsHidden] = useState(false);
	const [nextIsHidden, setNextIsHidden] = useState(false);

	const pageNumbers: number = Math.ceil(totalCount / countPerPage);
	const pages = [];
	for (let i = 1; i <= pageNumbers; i++) {
		pages.push(i);
	}

	const previousPage = currentPage !== 1 ? currentPage - 1 : 1;
	const nextPage = currentPage !== pageNumbers ? currentPage + 1 : pageNumbers;
	const pageNextStep = (currentPage + step) > pageNumbers ? pageNumbers : currentPage + step;
	const pagePreviousStep = (currentPage - step) < 1 ? 1 : currentPage - step;

	useEffect(() => {
		previousPage === currentPage ? setPrevIsHidden(true) : setPrevIsHidden(false);
		nextPage === currentPage ? setNextIsHidden(true) : setNextIsHidden(false);
	}, [currentPage, nextPage, previousPage]);

	if (isNaN(pageNumbers) || totalCount === 0 || pageNumbers === 1) {
		return <></>;
	}
	return (
		<div className={s.container}>
            <span className={`${prevIsHidden && s.hidden}`}
				  onClick={() => onChange(currentPage - 1)}>Prev</span>

			<span className={`${prevIsHidden && s.hidden}`}
				  onClick={() => onChange(1)}>Start</span>

			<span className={`${prevIsHidden && s.hidden}`}
				  onClick={() => onChange(pagePreviousStep)}>...</span>

			<span className={`${prevIsHidden && s.hidden}`}
				  onClick={() => onChange(previousPage)}>{previousPage !== currentPage && previousPage}</span>

			<span className={s.active}>{currentPage}</span>

			<span className={`${nextIsHidden && s.hidden}`}
				  onClick={() => onChange(nextPage)}>{nextPage !== currentPage && nextPage}</span>

			<span className={`${nextIsHidden && s.hidden}`}
				  onClick={() => onChange(pageNextStep)}>...</span>

			<span className={`${nextIsHidden && s.hidden}`}
				  onClick={() => onChange(pageNumbers)}>End</span>

			<span className={`${nextIsHidden && s.hidden}`}
				  onClick={() => onChange(currentPage + 1)}>Next</span>
		</div>
	);
});

