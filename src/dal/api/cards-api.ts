import { instance } from './instance';

export const cardsApi = {
	async getCards(id: string | undefined, data?: IGetCardsQueryParams) {
		return instance.get<ICards>(`cards/card`, { params: { ...data, cardsPack_id: id } });
	},
	async createCard(data: ICreateCard) {
		return instance.post(`cards/card`, { card: data });
	},
	async deleteCard(id: string | undefined) {
		return instance.delete(`cards/card`, { params: { id } });
	},
	async updateCard(data: IUpdateCard) {
		return instance.put(`cards/card`, { card: data });
	},
};

export interface IGetCardsQueryParams {
	cardAnswer?: string;
	cardQuestion?: string;
	cardsPack_id?: string;
	min?: number;
	max?: number;
	sortCards?: number;
	page?: number;
	pageCount?: number;
}

interface IUpdateCard {
	_id: string | undefined;
	question: string;
	comments?: string;
}

interface ICreateCard {
	cardsPack_id: string | undefined;
	question: string;
	answer: string;
	grade?: number;
	shots?: number;
	rating?: number;
	answerImg?: string;
	questionImg?: string;
	questionVideo?: string;
	answerVideo?: string;
	type?: string;
}

export interface ICard {
	answer: string;
	question: string;
	cardsPack_id: string;
	grade: number;
	rating: number;
	shots: number;
	type: string;
	user_id: string;
	created: Date;
	updated: Date;
	__v: number;
	_id: string;
}

export interface ICards {
	cards: ICard[];
	cardsTotalCount: number;
	maxGrade: number;
	minGrade: number;
	page: number;
	pageCount: number;
	packUserId: string;
}
