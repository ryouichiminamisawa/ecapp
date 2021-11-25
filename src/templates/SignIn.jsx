import React, { useState, useCallback } from "react";
import { PrimaryButton, TextInput } from "../components/UIKIT";
import { signIn } from "../reducks/users/operations";
import { useDispatch } from "react-redux";
import { push } from "connected-react-router";

const SignIn = () => {
	const [email, setEmail] = useState();
	const inputEmail = useCallback(
		(event) => {
			setEmail(event.target.value);
		},
		[setEmail]
	);
	const [password, setPassword] = useState();
	const inputPassword = useCallback(
		(event) => {
			setPassword(event.target.value);
		},
		[setPassword]
	);
	const dispatch = useDispatch();
	return (
		<div>
			<div className="c-section-container"></div>
			<h2 className="u-text_headline u-text-center">サインイン</h2>
			<div className="module-spacer-medium"></div>
			<TextInput
				fullWidth={true}
				label={"Eメール"}
				multiline={false}
				rows={1}
				required={true}
				value={email}
				type={"email"}
				onChange={inputEmail}
			></TextInput>
			<TextInput
				fullWidth={true}
				label={"パスワード"}
				multiline={false}
				rows={1}
				required={true}
				value={password}
				type={"password"}
				onChange={inputPassword}
			></TextInput>
			<div className="module-spacer-medium"></div>
			<div className="center">
				<PrimaryButton
					label={"ログイン"}
					onClick={() => dispatch(signIn(email, password))}
				/>
			</div>
			<p
				onClick={() => {
					dispatch(push("/signup"));
				}}
			>
				アカウントをお持ちでない方はこちら
			</p>
			<p
				onClick={() => {
					dispatch(push("/PasswordReset"));
				}}
			>
				パスワードをお忘れの方はこちら
			</p>
		</div>
	);
};

export default SignIn;
