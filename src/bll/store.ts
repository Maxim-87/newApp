import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunkMiddleware, { ThunkAction } from 'redux-thunk';
import { RegistrationActionsType, registrationReducer } from './registration-reducer';
import { ProfileActionsType, profileReducer } from './profile-reducer';
import { AppActionsType, appReducer } from './app-reducer';
import { AuthActionsType, authReducer } from './auth-reducer';
import { NewPassActionsType, newPassReducer } from './new-pass-reducer';
import { forgotPasswordReducer, ForgotPassActionsType } from './forgot-pass-reducer';
import { CardsActionsType, cardsReducer } from './cards-reducer';
import { DecksActionsType, decksReducer } from './decks-reducer';

const rootReducer = combineReducers({
	registration: registrationReducer,
	profile: profileReducer,
	app: appReducer,
	auth: authReducer,
	newPass: newPassReducer,
	forgotPass: forgotPasswordReducer,
	cards: cardsReducer,
	decks: decksReducer,
});

export type RootStateType = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export type RootActionsType =
	RegistrationActionsType
	| ProfileActionsType
	| AppActionsType
	| AuthActionsType
	| NewPassActionsType
	| ForgotPassActionsType
	| CardsActionsType
	| DecksActionsType;

export type ThunkType = ThunkAction<void, RootStateType, unknown, RootActionsType>;

// @ts-ignore
window.store = store;