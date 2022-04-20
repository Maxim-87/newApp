import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootStateType } from '../../../bll/store';
import { Navigate, useParams } from 'react-router-dom';
import { CardsStateType, fetchCards, setCards, setPagination } from '../../../bll/cards-reducer';
import { AddCardForm } from './AddCardForm/AddCardForm';
import { TabComponent } from '../../components/TabComponent/TabComponent';
import { Search } from '../Decks/Search/Search';
import SuperButton from '../../components/SuperButton/SuperButton';
import { CardsTable } from './CardsTable/CardsTable';
import { Pagination } from '../../components/Pagination/Pagination';

type PropsType = {};

export const Cards = React.memo(({}: PropsType) => {
	const dispatch = useDispatch();
	const isLoading = useSelector<RootStateType, boolean>(state => state.app.isLoading);
	const isLoggedIn = useSelector<RootStateType, boolean>(state => state.auth.isLoggedIn);
	const {
		cardsTotalCount,
		pageCount,
		page,
		maxGrade,
		minGrade,
		packUserId,
	} = useSelector<RootStateType, CardsStateType>(state => state.cards);
	const { cardsPackId } = useParams();

	useEffect(() => {
		dispatch(fetchCards(cardsPackId));
	}, [dispatch, cardsPackId, page]);

	useEffect(() => {
		return function() {
			dispatch(setCards({
				cards: [],
				page: 1,
				pageCount: 10,
				cardsTotalCount: 0,
				packUserId,
				minGrade: 0,
				maxGrade: 5,
			}));
		};
	}, [dispatch]);

	if (!isLoggedIn) {
		return <Navigate to={'/login'} />;
	}
	const [tab, setTab] = useState<boolean>(false);
	const tabToggle = useCallback(() => {
		setTab(!tab);
	}, [tab]);
	const pageChanger = useCallback((value: number) => dispatch(setPagination({ page: value })), []);
	return (
		<div>
			{tab && <TabComponent title={'Create card'} tabToggle={tabToggle}
			                      element={<AddCardForm tabToggle={tabToggle} packId={cardsPackId} />} />}
			<div>
				<Search />
				<SuperButton onClick={tabToggle}>Create card</SuperButton>
			</div>
			{isLoading ? <div>Загрузочка красивая тут должна быть</div> : null}
			<CardsTable packId={cardsPackId} />
			<Pagination totalCount={cardsTotalCount}
			            countPerPage={pageCount}
			            currentPage={page}
			            onChange={pageChanger} />
		</div>
	);
});


