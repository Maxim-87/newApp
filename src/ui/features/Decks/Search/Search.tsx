import { useEffect } from 'react';
import { ChangeEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDecks } from '../../../../bll/decks-reducer';
import { RootStateType } from '../../../../bll/store';
import SuperInputText from '../../../components/SuperInputText/SuperInputText';
import { useDebounce } from '../../CustomHooks/useDebounce';
import s from './Search.module.scss';

export const Search = () => {
	const dispatch = useDispatch();
	const totalCount = useSelector<RootStateType, number>(state => state.decks.cardPacksTotalCount);
	const [searchValue, setSearchValue] = useState('');
	const debouncedValue = useDebounce<string>(searchValue, 1000);

	const onSearchHandle = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchValue(e.currentTarget.value);
	};

	useEffect(() => {
		dispatch(fetchDecks({ packName: debouncedValue }));
	}, [debouncedValue, dispatch, totalCount]);

	return (
		<label className={s.searchLabel}>
			Search for decks:
			<SuperInputText type='text'
							placeholder={'I am looking for...'}
							value={searchValue}
							onChange={onSearchHandle} />
			<span>Results: {totalCount} found</span>
		</label>
	);
};
