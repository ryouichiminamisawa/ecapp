import React, { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { PrimaryButton, TextInput } from "../components/UIKIT";
import { passwordReset } from "../reducks/users/operations";

const PasswordReset = () => {
	const dispatch = useDispatch();
	const [email, setEmail] = useState();
	const inputEmail = useCallback((event) => {
		setEmail(event.target.value);
	}, []);
	return (
		<div>
			<h2>パスワードリセット</h2>
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
			<PrimaryButton
				label={"パスワードリセット"}
				onClick={() => {
					dispatch(passwordReset(email));
				}}
			></PrimaryButton>
		</div>
	);
};

export default PasswordReset;
