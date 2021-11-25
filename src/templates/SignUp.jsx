import React, { useState, useCallback } from "react";
import { PrimaryButton, TextInput } from "../components/UIKIT";
import { useDispatch } from "react-redux";
import { signUp } from "../reducks/users/operations";

const SignUp = () => {
	const [username, setUsername] = useState();
	const [email, setEmail] = useState();
	const [password, setPassword] = useState();
	const [confirmPassword, setConfirmPassword] = useState();

	const inputUsername = useCallback(
		(event) => {
			setUsername(event.target.value);
		},
		[setUsername]
	);
	const inputEmail = useCallback(
		(event) => {
			setEmail(event.target.value);
		},
		[setEmail]
	);
	const inputPassword = useCallback(
		(event) => {
			setPassword(event.target.value);
		},
		[setPassword]
	);
	const inputConfirmPassword = useCallback(
		(event) => {
			setConfirmPassword(event.target.value);
		},
		[setConfirmPassword]
	);
	const dispatch = useDispatch();
	return (
		<div className="c-section-container">
			<h2 className="u-text_headline u-text-center">アカウント登録</h2>
			<div className="module-space--medium" />
			<TextInput
				fullWidth={true}
				label={"ユーザー名"}
				multiline={false}
				required={true}
				rows={1}
				value={username}
				type={"username"}
				onChange={inputUsername}
			></TextInput>
			<TextInput
				fullWidth={true}
				label={"メールアドレス"}
				multiline={false}
				required={true}
				rows={1}
				value={email}
				type={"email"}
				onChange={inputEmail}
			></TextInput>
			<TextInput
				fullWidth={true}
				label={"パスワード"}
				multiline={false}
				required={true}
				rows={1}
				value={password}
				type={"password"}
				onChange={inputPassword}
			></TextInput>
			<TextInput
				fullWidth={true}
				label={"パスワード（確認用）"}
				multiline={false}
				required={true}
				rows={1}
				value={confirmPassword}
				type={"password"}
				onChange={inputConfirmPassword}
			></TextInput>
			<div className="module-spacer--medium"></div>
			<div className="center">
				<PrimaryButton
					label={"アカウントを登録する"}
					onClick={() =>
						dispatch(signUp(username, email, password, confirmPassword))
					}
				/>
			</div>
		</div>
	);
};

export default SignUp;
