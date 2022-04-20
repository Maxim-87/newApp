import { RootStateType, ThunkType } from './store';
import { setAppError, setAppInfo, setAppIsLoading } from './app-reducer';
import {
	decksApi,
	DecksResponse,
	DeleteDeckData,
	GetDecksQueryParams,
	NewDeckData,
	UpdateDeckData,
} from '../dal/api/decks-api';

export const initialState: DecksStateType = {
	cardPacks: [],
	cardPacksTotalCount: 0,
	minCardsCount: 0,
	maxCardsCount: 0,
	page: 1,
	pageCount: 10,
	privatePacks: false,
	sortBy: undefined,
	currentCardsCount: [0, 0],
	countPerPage: [10, 25, 50],
};

export const decksReducer = (state: DecksStateType = initialState,
							 action: DecksActionsType): DecksStateType => {
	switch (action.type) {
		case DECKS_ACTIONS.SET_DECKS:
			return { ...state, ...action.payload };
		case DECKS_ACTIONS.SET_DECKS_CURRENT_PAGE:
			return { ...state, page: action.payload.page };
		case DECKS_ACTIONS.SET_DECKS_PER_PAGE:
			return { ...state, pageCount: action.payload.num };
		case DECKS_ACTIONS.SET_DECKS_TOTAL_COUNT:
			return { ...state, cardPacksTotalCount: action.payload.num };
		case DECKS_ACTIONS.SET_PRIVATE_DECKS:
			return { ...state, privatePacks: action.payload.value };
		case DECKS_ACTIONS.SET_DECKS_MIN_MAX_COUNT:
			return {
				...state, minCardsCount: action.payload.values[0],
				maxCardsCount: action.payload.values[1],
			};
		case DECKS_ACTIONS.SET_DECKS_SORTING_METHOD:
			return { ...state, sortBy: action.payload.method, page: 1 };
		case DECKS_ACTIONS.SET_CURRENT_CARDS_COUNT:
			return { ...state, currentCardsCount: [...action.payload.values] };
		default:
			return state;
	}
};

// Actions
export const setDecks = (payload: DecksResponse) => {
	return { type: DECKS_ACTIONS.SET_DECKS, payload } as const;
};
export const setDecksCurrentPage = (page: number) => {
	return { type: DECKS_ACTIONS.SET_DECKS_CURRENT_PAGE, payload: { page } } as const;
};
export const setDecksPerPage = (num: number) => {
	return { type: DECKS_ACTIONS.SET_DECKS_PER_PAGE, payload: { num } } as const;
};
export const setDecksTotalCount = (num: number) => {
	return { type: DECKS_ACTIONS.SET_DECKS_TOTAL_COUNT, payload: { num } } as const;
};
export const setDecksMinMaxCount = (values: number[]) => {
	return { type: DECKS_ACTIONS.SET_DECKS_MIN_MAX_COUNT, payload: { values } } as const;
};
export const setPrivateDecks = (value: boolean) => {
	return { type: DECKS_ACTIONS.SET_PRIVATE_DECKS, payload: { value } } as const;
};
export const setDecksSortingMethod = (method: string) => {
	return { type: DECKS_ACTIONS.SET_DECKS_SORTING_METHOD, payload: { method } } as const;
};
export const setCurrentCardsCount = (values: number[]) => {
	return { type: DECKS_ACTIONS.SET_CURRENT_CARDS_COUNT, payload: { values } } as const;
};

// Thunk
export const fetchDecks = (payload?: GetDecksQueryParams): ThunkType =>
	async (dispatch, getState: () => RootStateType) => {
		const decks = getState().decks;
		const userId = decks.privatePacks && getState().profile._id;
		dispatch(setAppIsLoading(true));
		try {
			const res = await decksApi.getDecks({
				page: decks.page,
				pageCount: decks.pageCount,
				min: decks.currentCardsCount[0],
				max: decks.currentCardsCount[1],
				packName: payload?.packName || undefined,
				user_id: userId || undefined,
				sortPacks: decks.sortBy,
			});
			dispatch(setDecks(res.data));
			dispatch(setAppInfo('Cards are ready to study!'));
		} catch (e: any) {
			console.log((e as Error).message);
			// dispatch(setAppError(true));
			// dispatch(setAppInfo(e.response ? e.response.data.error : e));
		} finally {
			dispatch(setAppIsLoading(false));
		}
	};

export const postDeck = (payload: NewDeckData): ThunkType => async dispatch => {
	dispatch(setAppIsLoading(true));
	try {
		await decksApi.createDeck(payload);
		dispatch(fetchDecks());
		dispatch(setAppInfo('Deck was created!'));
	} catch (e: any) {
		console.log((e as Error).message);
		dispatch(setAppError(true));
		dispatch(setAppInfo(e.response ? e.response.data.error : e));
	} finally {
		dispatch(setAppIsLoading(false));
	}
};

export const deleteDeck = (payload: DeleteDeckData): ThunkType => async dispatch => {
	dispatch(setAppIsLoading(true));
	try {
		await decksApi.deleteDeck(payload);
		await dispatch(fetchDecks());
		dispatch(setAppInfo('Deck was deleted!'));
	} catch (e: any) {
		console.log((e as Error).message);
		dispatch(setAppError(true));
		dispatch(setAppInfo(e.response ? e.response.data.error : e));
	} finally {
		dispatch(setAppIsLoading(false));
	}
};

export const updateDeck = (payload: UpdateDeckData): ThunkType => async dispatch => {
	dispatch(setAppIsLoading(true));
	try {
		await decksApi.updateDeck(payload);
		await dispatch(fetchDecks());
		dispatch(setAppInfo('Deck was updated!'));
	} catch (e: any) {
		console.log((e as Error).message);
		dispatch(setAppError(true));
		dispatch(setAppInfo(e.response ? e.response.data.error : e));
	} finally {
		dispatch(setAppIsLoading(false));
	}
};


// Types
export enum DECKS_ACTIONS {
	SET_DECKS = 'DECKS/SET-DECKS',
	SET_DECKS_CURRENT_PAGE = 'DECKS/SET-CURRENT-PAGE',
	SET_DECKS_PER_PAGE = 'DECKS/SET-DECKS-PER-PAGE',
	SET_DECKS_TOTAL_COUNT = 'DECKS/SET-TOTAL-COUNT',
	SET_DECKS_MIN_MAX_COUNT = 'DECKS/SET-DECKS-MIN-MAX-COUNT',
	SET_PRIVATE_DECKS = 'DECKS/SET-PRIVATE-DECKS',
	SET_DECKS_SORTING_METHOD = 'DECKS/SET-SET-SORTING-METHOD',
	SET_CURRENT_CARDS_COUNT = 'DECKS/SET-CURRENT-CARDS-COUNT',
}

export type SetDecksActionType = ReturnType<typeof setDecks>;
export type SetDecksCurrentPageActionType = ReturnType<typeof setDecksCurrentPage>;
export type SetDecksPerPageActionType = ReturnType<typeof setDecksPerPage>;
export type SetDecksTotalCountActionType = ReturnType<typeof setDecksTotalCount>;
export type SetDecksMinMaxCountActionType = ReturnType<typeof setDecksMinMaxCount>;
export type SetPrivateDecksActionType = ReturnType<typeof setPrivateDecks>;
export type SetDecksSortingMethod = ReturnType<typeof setDecksSortingMethod>;
export type SetCurrentCardsCount = ReturnType<typeof setCurrentCardsCount>;

export type DecksActionsType =
	| SetDecksActionType
	| SetDecksCurrentPageActionType
	| SetDecksPerPageActionType
	| SetDecksTotalCountActionType
	| SetDecksMinMaxCountActionType
	| SetPrivateDecksActionType
	| SetDecksSortingMethod
	| SetCurrentCardsCount;

export type DecksStateType = DecksResponse & {
	privatePacks: boolean
	sortBy: string | undefined
	currentCardsCount: number[]
	countPerPage: number[]
};
