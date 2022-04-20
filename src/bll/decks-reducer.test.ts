import { decksReducer, DecksStateType, setDecks } from './decks-reducer';

let startState: DecksStateType;

beforeEach(() => {
	startState = {
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
});

test('decks should be added', () => {
	const action = setDecks({
		cardPacks: startState.cardPacks,
		cardPacksTotalCount: 100,
		maxCardsCount: 20,
		minCardsCount: 5,
		page: 2,
		pageCount: 5,
	});
	const endState = decksReducer(startState, action);

	expect(endState.cardPacksTotalCount).toBe(100);
});