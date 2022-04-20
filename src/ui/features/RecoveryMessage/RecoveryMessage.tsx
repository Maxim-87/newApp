
const RecoveryMessage = () => {
	return(
		<div>
			<h3>Reset Password Notification</h3>
			<p>
				Hello, You are receiving this email because we received a password reset request for your account.
			</p>
			<a href='http://localhost:3000/react-project#/pass-recovery/$token$'>ResetPassword</a>
			<p>If you did not request a password reset, no further action is required.
				Regards,
				IT-Incubator
				If you’re having trouble clicking the "Reset Password" button,
				copy and paste the URL below into your web browser:
			</p>
			<a href='http://localhost:3000/react-project#/pass-recovery/$token$'>
				http://localhost:3000/react-project#/pass-recovery/$token$
			</a>
		</div>

	);
};

export default RecoveryMessage;