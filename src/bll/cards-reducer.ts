import { cardsApi, ICards, IGetCardsQueryParams } from '../dal/api/cards-api';
import { RootStateType, ThunkType } from './store';
import { setAppIsLoading } from './app-reducer';

const initialState: CardsStateType = {
	cards: [],
	cardsTotalCount: 0,
	maxGrade: 5,
	minGrade: 0,
	page: 1,
	pageCount: 10,
	packUserId: '12345',
};

export const cardsReducer = (state: CardsStateType = initialState,
                             action: CardsActionsType): CardsStateType => {
	switch (action.type) {
		case CARDS_ACTIONS.SET_CARDS:
			return { ...state, ...action.payload.data };
		case CARDS_ACTIONS.SET_PAGINATION:
			return { ...state, ...action.payload.data };
		default:
			return state;
	}
};


// Actions
export const setCards = (data: ICards) => {
	return { type: CARDS_ACTIONS.SET_CARDS, payload: { data } } as const;
};
export const setPagination = (data: IGetCardsQueryParams) => {
	return { type: CARDS_ACTIONS.SET_PAGINATION, payload: { data } } as const;
};

// Thunks

export const fetchCards = (id: string | undefined): ThunkType =>
	async (dispatch, getState: () => RootStateType) => {
	const cards = getState().cards;
	dispatch(setAppIsLoading(true));
	try {
		const res = await cardsApi.getCards(id, {
			pageCount: cards.pageCount,
			page: cards.page,
			max: cards.maxGrade,
			min: cards.minGrade,
		});
		dispatch(setCards(res.data));
	} catch (e) {
		console.log((e as Error).message);
	} finally {
		dispatch(setAppIsLoading(false));
	}
};

export const createCard = (cardsPack_id: string | undefined, question: string, answer: string): ThunkType =>
	async dispatch => {
		dispatch(setAppIsLoading(true));
		try {
			await cardsApi.createCard({ cardsPack_id, question, answer });
			dispatch(fetchCards(cardsPack_id));
		} catch (e) {
			console.log((e as Error).message);
		} finally {
			dispatch(setAppIsLoading(false));
		}
	};

export const updateCard = (cardId: string | undefined, deckId: string | undefined, question: string): ThunkType =>
	async dispatch => {
		dispatch(setAppIsLoading(true));
		try {
			await cardsApi.updateCard({ _id: cardId, question });
			dispatch(fetchCards(deckId));
		} catch (e) {
			console.log((e as Error).message);
		} finally {
			dispatch(setAppIsLoading(false));
		}
	};

export const deleteCard = (id: string | undefined, deckId: string | undefined): ThunkType => async dispatch => {
	dispatch(setAppIsLoading(true));
	try {
		await cardsApi.deleteCard(id);
		dispatch(fetchCards(deckId));
	} catch (e) {
		console.log((e as Error).message);
	} finally {
		dispatch(setAppIsLoading(false));
	}
};

// Types
export enum CARDS_ACTIONS {
	SET_CARDS = 'CARDS/SET_CARDS',
	SET_PAGINATION = 'CARDS/SET_PAGINATION',
}

export type CardsActionsType = ReturnType<typeof setCards> | ReturnType<typeof setPagination>;
export type CardsStateType = ICards;
