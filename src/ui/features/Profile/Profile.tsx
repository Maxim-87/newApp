import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootStateType } from '../../../bll/store';
import { Navigate } from 'react-router-dom';
import { ProfileStateType, putUserName } from '../../../bll/profile-reducer';
import { EditableSpan } from '../../components/EditableSpan/EditableSpan';

export const Profile = React.memo(() => {
	const dispatch = useDispatch();
	const isLoggedIn = useSelector<RootStateType, boolean>(state => state.auth.isLoggedIn);
	const profile = useSelector<RootStateType, ProfileStateType>(state => state.profile);
	const isLoading = useSelector<RootStateType, boolean>(state => state.app.isLoading);
	if (!isLoggedIn) {
		return <Navigate to={'/login'} />;
	}
	const editNameHandle = useCallback((name: string) => {
		dispatch(putUserName(name));
	}, []);
	return (
		<div>
			<p><b>email:</b> {profile.email}</p>
			<p><b>name:</b> <EditableSpan title={profile.name} disabled={isLoading} callBack={editNameHandle}/></p>
			<p><b>id:</b> {profile._id}</p>
		</div>
	);
});


