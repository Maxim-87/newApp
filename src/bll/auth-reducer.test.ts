import { authReducer, AuthStateType, setLoggedIn } from './auth-reducer';

let startState: AuthStateType;

beforeEach(() => {
	startState = {
		isLoggedIn: false
	};
});

test('user must be logged in', () => {
	const action = setLoggedIn(true);
	const endState = authReducer(startState, action);

	expect(endState.isLoggedIn).toBe(true);
});