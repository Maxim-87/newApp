import React, { ChangeEvent } from 'react';

export const UseInputValueHook = () => {
	const [inputValue, setInputValue] = React.useState('');

	const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		setInputValue(e.currentTarget.value);
	};

	return { inputValue, onInputChange };
};
