import { registrationReducer, RegistrationStateType, setRegistrationSuccess } from './registration-reducer';

let startState: RegistrationStateType;

beforeEach(() => {
	startState = {
		registrationSuccess: false
	};
});

test('user must be registered successfully', () => {
	const action = setRegistrationSuccess(true);
	const endState = registrationReducer(startState, action);

	expect(endState.registrationSuccess).toBe(true);
});