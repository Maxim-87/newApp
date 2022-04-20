import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootStateType } from '../../../bll/store';
import { DecksStateType, deleteDeck, fetchDecks, setPrivateDecks, updateDeck, setDecks } from '../../../bll/decks-reducer';
import { Navigate } from 'react-router-dom';
import { DecksTable } from './DecksTable/DecksTable';
import { Search } from './Search/Search';
import { DecksPagination } from './DecksPagination/DecksPagination';
import { TabComponent } from '../../components/TabComponent/TabComponent';
import SuperButton from '../../components/SuperButton/SuperButton';
import s from './Decks.module.scss';
import { AddDeckForm } from './AddDeckForm/AddDeckForm';
import { BtnBlock } from './BtnBlock/BtnBlock';

type PropsType = {};

export const Decks = React.memo(({}: PropsType) => {
	const {
		cardPacks,
		cardPacksTotalCount,
		page,
		pageCount,
		privatePacks,
		sortBy,
		currentCardsCount,
		countPerPage,
	} = useSelector<RootStateType, DecksStateType>(state => state.decks);

	const userId = useSelector<RootStateType, string>(state => state.profile._id);
	const isLoading = useSelector<RootStateType, boolean>(state => state.app.isLoading);

	const dispatch = useDispatch();

	const deleteDeckHandler = useCallback((id: string) => {
		dispatch(deleteDeck({ id }));
	}, [dispatch, userId]);

	const updateDeckHandler = useCallback((id: string, title: string) => {
		dispatch(updateDeck({ cardsPack: { _id: id, name: title } }));
	}, [dispatch, userId]);

	useEffect(() => {
		dispatch(fetchDecks());
	}, [dispatch, page, pageCount, currentCardsCount, privatePacks, sortBy]);

	useEffect(() => {
		return function() {
			dispatch(setDecks({
				cardPacks: [],
				page: 1,
				minCardsCount: 0,
				maxCardsCount: 0,
				cardPacksTotalCount: 0,
				pageCount: 10,
			}));
		};
	}, [dispatch]);
	const isLoggedIn = useSelector<RootStateType, boolean>(state => state.auth.isLoggedIn);

	if (!isLoggedIn) {
		return <Navigate to={'/login'} />;
	}

	const [tab, setTab] = useState<boolean>(false);
	const tabToggle = useCallback(() => {
		setTab(!tab);
	}, [tab]);

	const showPrivate = useCallback((value: boolean) => {
		dispatch(setPrivateDecks(value));
	}, [dispatch]);

	return <div>
		{tab && <TabComponent title={'Create deck'} tabToggle={tabToggle}
		                      element={<AddDeckForm tabToggle={tabToggle} />} />}
		<div className={s.search}>
			<Search />
			<SuperButton onClick={tabToggle}>Create deck</SuperButton>
		</div>
		<BtnBlock showPrivate={showPrivate} active={privatePacks}/>
		{isLoading ? <div>Загрузочка красивая тут должна быть</div> : null}
		<DecksTable decks={cardPacks}
		            deleteDeckHandler={deleteDeckHandler}
		            updateDeckHandler={updateDeckHandler} />
		<DecksPagination totalCount={cardPacksTotalCount}
		                 pageCount={pageCount}
		                 currentPage={page}
		                 countPerPage={countPerPage} />
	</div>;
});



