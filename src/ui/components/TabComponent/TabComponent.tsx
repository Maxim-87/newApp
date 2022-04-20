import React from 'react';
import s from './TabComponent.module.scss';
import SuperButton from '../SuperButton/SuperButton';

interface ITabComponent {
	tabToggle: () => void;
	element: any;
	title: string;
}

export const TabComponent = React.memo(({ title, element, tabToggle }: ITabComponent) => {
	return <div>
		<div className={s.tabPanel}>
			<SuperButton onClick={tabToggle}>X</SuperButton>
			<h2>{title}</h2>
			{element}
		</div>
		<div className={s.tabWindow} />
	</div>;
});


