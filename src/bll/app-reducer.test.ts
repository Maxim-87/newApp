import {
	appReducer,
	InitialStateType,
	setAppError,
	setAppInfo,
	setAppInitialized,
	setAppIsLoading,
} from './app-reducer';

let startState: InitialStateType;

beforeEach(() => {
	startState = {
		isLoading: false,
		error: false,
		isInitialized: false,
		appInfo: '',
	};
});

test('isLoading should be set to false', () => {
	const action = setAppIsLoading(true);
	const endState = appReducer(startState, action);

	expect(endState.isLoading).toBe(true);
});

test('correct error status should be set', () => {
	const action = setAppError(true);
	const endState = appReducer(startState, action);

	expect(endState.error).toBe(true);
	expect(endState.isLoading).toBe(false);
});

test('isInitialized value  should be set to true', () => {
	const action = setAppInitialized(true);
	const endState = appReducer(startState, action);

	expect(endState.isInitialized).toBe(true);
	expect(endState.isLoading).toBe(false);
	expect(endState.error).toBe(null);
});

test('correct appInfo  should be set', () => {
	const action = setAppInfo('Your registration is confirmed.');
	const endState = appReducer(startState, action);

	expect(endState.appInfo).toBe('Your registration is confirmed.');
	expect(endState.isLoading).toBe(false);
});
