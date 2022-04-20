import { useDispatch, useSelector } from 'react-redux';
import { RootStateType } from '../../../../bll/store';
import { EditableSpan } from '../../../components/EditableSpan/EditableSpan';
import moment from 'moment';
import { CardsStateType, deleteCard, updateCard } from '../../../../bll/cards-reducer';
import { useCallback } from 'react';
import s from '../../Decks/DecksTable/DecksTable.module.scss';

type PropsType = {
	packId: string | undefined;
};
export const CardsTable = ({ packId }: PropsType) => {
	const isLoading = useSelector<RootStateType, boolean>(state => state.app.isLoading);
	const cards = useSelector<RootStateType, CardsStateType>(state => state.cards);
	const userId = useSelector<RootStateType, string>(state => state.profile._id);
	const dispatch = useDispatch();
	const removeHandler = useCallback((id: string) => {
		dispatch(deleteCard(id, packId));
	}, [dispatch]);
	if (cards.cards.length === 0) {
		return <div>Еще нет ни одной карточки в колоде</div>;
	}
	return (
		<div>
			<table className={s.table}>
				<thead>
				<tr>
					<td>Question</td>
					<td>Answer</td>
					<td>Last update</td>
					<td>Grade</td>
					<td>Actions</td>
				</tr>
				</thead>
				<tbody>
				{cards.cards.map(m => {
					return <tr key={m._id}>
						<td>
							{m.question}
						</td>
						<td>
							<span>{m.answer}</span>
						</td>
						<td>{moment(m.updated).format('LL')}</td>
						<td>{m.grade}</td>
						<td>
							{m.user_id === userId
								? <button onClick={() => removeHandler(m._id)} disabled={isLoading}>Delete</button>
								: <div>-</div>}
						</td>
					</tr>;
				})}
				</tbody>
			</table>
		</div>
	);
};


