import { push } from "connected-react-router";
import { auth, db, FirebaseTimestamp } from "../../firebase/index";
import { signInAction, signOutAction } from "./actions";

export const signUp = (username, email, password, confirmPassword) => {
	return async (dispatch) => {
		if (
			username === "" ||
			email === "" ||
			password === "" ||
			confirmPassword === ""
			//三項演算子の復習をやってください。
		) {
			alert("必須項目を記入してください");
			return false;
		}

		if (confirmPassword !== password) {
			alert("パスワードをご確認ください");
			return false;
		}
		return auth
			.createUserWithEmailAndPassword(email, password)
			.then((result) => {
				const user = result.user;
				if (user) {
					const uid = user.uid;
					const timestamp = FirebaseTimestamp.now();

					const userInitialData = {
						created_at: timestamp,
						email: email,
						role: "costomer",
						uid: uid,
						updated_at: timestamp,
						username: username,
					};
					db.collection("users")
						.doc(uid)
						.set(userInitialData)
						.then(() => {
							dispatch(push("/"));
						});
				}
			});
		//firebaseの記入方法を復習してください。
	};
};

export const signIn = (email, password) => {
	return async (dispatch) => {
		if (email === "" || password === "") {
			alert("必須項目が未記入です。");
			return false;
		}
		auth.signInWithEmailAndPassword(email, password).then((result) => {
			const user = result.user;
			if (user) {
				const uid = user.uid;

				db.collection("users")
					.doc(uid)
					.get()
					.then((snapshot) => {
						const data = snapshot.data();

						dispatch(
							signInAction({
								isSignedIn: true,
								role: data.role,
								uid: uid,
								username: data.username,
							})
						);
					});
			}

			dispatch(push("/"));
			//getメソッドとsnapshotメソッドを確認してください。
			//emailとpasswordの欄を縦方向にしてください。
		});
	};
};

export const listenAuthState = () => {
	return async (dispatch) => {
		return auth.onAuthStateChanged((user) => {
			if (user) {
				const uid = user.uid;

				db.collection("users")
					.doc(uid)
					.get()
					.then((snapshot) => {
						const data = snapshot.data();

						dispatch(
							signInAction({
								isSignedIn: true,
								role: data.role,
								uid: uid,
								username: data.username,
							})
						);
					});
			} else {
				dispatch(push("/signin"));
			}
		});
	};
};

export const signOut = () => {
	return async (dispatch) => {
		auth.signOut().then(() => {
			dispatch(signOutAction());
			dispatch(push("./signIn"));
		});
	};
};

export const passwordReset = (email) => {
	return async (dispatch) => {
		if (email === "") {
			alert("必須項目を記入してください");
			return false;
		} else {
			auth
				.sendPasswordResetEmail(email)
				.then(() => {
					alert("パスワードリセット用のメールを送信しました。");
					dispatch(push("/signIn"));
				})
				.catch(() => {
					alert("パスワードリセットに失敗しました。通信環境をご確認ください。");
				});
		}
	};
};
