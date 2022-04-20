import { profileReducer, ProfileStateType, setUserProfile } from './profile-reducer';

let startState: ProfileStateType;

beforeEach(() => {
	startState = {
		name: 'Alex',
		email: 'alex@gmail.com',
		_id: '1',
	};
});

test('profile of user with correct id should be set', () => {
	const action = setUserProfile('3', 'John', 'john@gmail.com');
	const endState = profileReducer(startState, action);

	expect(endState).toStrictEqual({ _id: '3', name: 'John', email: 'john@gmail.com' });
});