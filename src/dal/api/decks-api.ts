import { AxiosResponse } from 'axios';
import { instance } from './instance';

export const decksApi = {
	async getDecks(payload?: GetDecksQueryParams) {
		return instance.get<DecksResponse>('cards/pack', { params: payload });
	},
	async createDeck(payload: NewDeckData) {
		return instance.post<NewDeckData, AxiosResponse<IDeck>>('cards/pack', payload);
	},
	async deleteDeck(payload: DeleteDeckData) {
		return instance.delete<IDeck>('cards/pack', { params: payload });
	},
	async updateDeck(payload: UpdateDeckData) {
		return instance.put<UpdateDeckData, AxiosResponse<IDeck>>('cards/pack', payload);
	},
};

export interface DecksResponse {
	cardPacks: IDeck[];
	cardPacksTotalCount: number;
	maxCardsCount: number;
	minCardsCount: number;
	page: number;
	pageCount: number;
}

export interface IDeck {
	cardsCount: number;
	created: Date;
	grade: number;
	more_id: string;
	name: string;
	path: string;
	private: boolean;
	rating: number;
	shots: number;
	type: string;
	updated: Date;
	user_id: string;
	user_name: string;
	__v: number;
	_id: string;
}

export interface GetDecksQueryParams {
	min?: number;
	max?: number;
	sortPacks?: string;
	page?: number;
	pageCount?: number;
	user_id?: string;
	packName?: string;
}

export interface UpdateDeckData {
	cardsPack: {
		_id: string
		name: string
	};
}

export interface NewDeckData {
	cardsPack: {
		name: string
		private?: boolean
	};
}

export interface DeleteDeckData {
	id: string;
}


//
// export interface ICreateDeck {
// 	name: string;
// 	path?: string;
// 	grade?: number;
// 	shots?: number;
// 	rating?: number;
// 	deckCover?: string;
// 	private?: boolean;
// 	type?: string;
// }



