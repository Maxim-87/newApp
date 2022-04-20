import React from 'react';
import { useDispatch } from 'react-redux';
import { setDecksCurrentPage, setDecksPerPage } from '../../../../bll/decks-reducer';
import { Pagination } from '../../../components/Pagination/Pagination';
import SuperSelect from '../../../components/SuperSelect/SuperSelect';
import s from './DecksPagination.module.scss';

type PropsType = {
	totalCount: number
	pageCount: number
	currentPage: number
	countPerPage: number[]
};
export const DecksPagination = React.memo(({ totalCount, pageCount, currentPage, countPerPage }: PropsType) => {
	const dispatch = useDispatch();

	const onPageChangeHandle = (page: number) => dispatch(setDecksCurrentPage(page));
	const onSelectChangeHandle = (option: string) => dispatch(setDecksPerPage(Number(option)));
	return (
		<div className={s.paginationContainer}>
			<Pagination totalCount={totalCount}
						countPerPage={pageCount}
						currentPage={currentPage}
						onChange={onPageChangeHandle} />
			{totalCount>=countPerPage[0]&&<SuperSelect options={countPerPage} onChangeOption={onSelectChangeHandle} label={'Decks per page:'} />}
			</div>
	);
});

