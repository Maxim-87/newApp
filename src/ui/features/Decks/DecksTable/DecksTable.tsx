import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootStateType } from '../../../../bll/store';
import { IDeck } from '../../../../dal/api/decks-api';
import { EditableSpan } from '../../../components/EditableSpan/EditableSpan';
import { ROUTES } from '../../../../router/routes';
import moment from 'moment';
import s from './DecksTable.module.scss';

type PropsType = {
	decks: IDeck[]
	deleteDeckHandler: (id: string) => void
	updateDeckHandler: (id: string, title: string) => void
};
export const DecksTable = ({ decks, deleteDeckHandler, updateDeckHandler }: PropsType) => {
	const isLoading = useSelector<RootStateType, boolean>(state => state.app.isLoading);
	const userId = useSelector<RootStateType, string>(state => state.profile._id);
	return (
		<div>
			<table className={s.table}>
				<thead>
				<tr>
					<td>Name</td>
					<td>Cards</td>
					<td>Last update</td>
					<td>Created by</td>
					<td>Actions</td>
				</tr>
				</thead>
				<tbody>
				{decks.map(m => {
					return <tr key={m._id}>
						<td>
							<Link to={`${ROUTES.CARDS}/${m._id}`}>
								{m.name}
							</Link>
						</td>
						<td>{m.cardsCount}</td>
						<td>{moment(m.updated).format('LL')}</td>
						<td>{m.user_name}</td>
						<td>
							{userId === m.user_id
								? <>
									<button onClick={() => deleteDeckHandler(m._id)} disabled={isLoading}>Delete
									</button>

									<button disabled={isLoading}>
											Edit
									</button>
									<button disabled={isLoading}>Learn</button>
								</>
								: <button disabled={isLoading}>Learn</button>}
						</td>
					</tr>;
				})}
				</tbody>
			</table>
		</div>
	);
};

