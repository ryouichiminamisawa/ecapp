import React, { useState, useCallback, useEffect } from "react";
import { PrimaryButton, SelectBox, TextInput } from "../components/UIKIT";
import { useDispatch } from "react-redux";
import { saveProduct } from "../reducks/product/operations";
import { db } from "../firebase";
import { ImageArea, SetSizeArea } from "../components/products";

const ProductEdit = () => {
	const dispatch = useDispatch();

	let id = window.location.pathname.split("/product/edit")[1];
	if (id !== "") {
		id = id.split("/")[1];
	}

	const [name, setName] = useState(""),
		[description, setDescription] = useState(""),
		[category, setCategory] = useState(""),
		[images, setImages] = useState([]),
		[price, setPrice] = useState(""),
		[sizes, setSizes] = useState([]);

	const inputName = useCallback(
		(event) => {
			setName(event.target.value);
		},
		[setName]
	);

	const inputDescription = useCallback(
		(event) => {
			setDescription(event.target.value);
		},
		[setDescription]
	);

	const inputPrice = useCallback(
		(event) => {
			setPrice(event.target.value);
		},
		[setPrice]
	);

	const categories = [
		{ id: "statis", name: "スターチス" },
		{ id: "clematis", name: "クレマチス" },
		{ id: "dahlia", name: "ダリア" },
		{ id: "gift", name: "ギフト" },
	];

	useEffect(() => {
		if (id !== "") {
			db.collection("products")
				.doc(id)
				.get()
				.then((snapshot) => {
					const data = snapshot.data();
					setImages(data.images);
					setName(data.name);
					setDescription(data.description);
					setCategory(data.category);
					setPrice(data.price);
					setSizes(data.sizes);
				});
		}
	}, [id]);

	return (
		<section>
			<h2 className="u-text__headline u-text-center">商品の登録・編集</h2>
			<div className="c-section-container">
				<ImageArea images={images} setImages={setImages} />
				<TextInput
					fullWidth={true}
					label={"商品名"}
					multiline={false}
					required={true}
					onChange={inputName}
					rows={1}
					value={name}
					type={"text"}
				/>
				<TextInput
					fullWidth={true}
					label={"商品説明"}
					multiline={true}
					required={true}
					onChange={inputDescription}
					rows={5}
					value={description}
					type={"text"}
				/>
				<SelectBox
					label={"カテゴリー"}
					required={true}
					options={categories}
					select={setCategory}
					value={category}
				/>
				<TextInput
					fullWidth={true}
					label={"価格"}
					multiline={false}
					required={true}
					onChange={inputPrice}
					rows={1}
					value={price}
					type={"number"}
				/>
				<div className="module-spacer--small" />
				<SetSizeArea sizes={sizes} setSizes={setSizes} />
				<div className="module-spacer--small" />
				<div className="center">
					<PrimaryButton
						label={"商品情報を保存"}
						onClick={() =>
							dispatch(
								saveProduct(
									id,
									name,
									description,
									category,
									images,
									price,
									sizes
								)
							)
						}
					/>
				</div>
			</div>
		</section>
	);
};

export default ProductEdit;
