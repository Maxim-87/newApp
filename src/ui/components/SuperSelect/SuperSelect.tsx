import React, {SelectHTMLAttributes, DetailedHTMLProps, ChangeEvent} from 'react';
import s from './SuperSelect.module.scss';

type DefaultSelectPropsType = DetailedHTMLProps<SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>;

type SuperSelectPropsType = DefaultSelectPropsType & {
	options?: string[]|number[]
	onChangeOption?: (option: any) => void
	label?: string
};

const SuperSelect: React.FC<SuperSelectPropsType> = (
	{
		options,
		onChange, onChangeOption,
		className,
		label,
		...restProps
	}
) => {

	const mappedOptions: JSX.Element[] = options ? options.map((o, i) => {
		return (
			<option
				className={s.option}
				key={o + ' ' + i}
				value={o}
			>
				{o}
			</option>);
	}) : [];// map options with key

	const onChangeCallback = (e: ChangeEvent<HTMLSelectElement>) => {
		onChangeOption && onChangeOption(e.currentTarget.value);

		onChange && onChange(e);
		// onChange, onChangeOption
	};

	const finalSelectClassName = s.select + (className ? ' ' + className : '');

	return (
		<div className={s.selectContainer}>
			{label && <label className={s.selectLabel}>{label}</label>}
			<select onChange={onChangeCallback}
					{...restProps}
					className={finalSelectClassName}
			>
				{mappedOptions}
			</select></div>
	);
};

export default SuperSelect;
