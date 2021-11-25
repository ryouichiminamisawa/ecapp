import React from "react";
import TextField from "@material-ui/core/TextField";

const TextInput = (props) => {
	return (
		<TextField
			fullwidth={props.fullwidth}
			label={props.label}
			margin={"dense"}
			multiline={props.multiline}
			required={props.required}
			rows={props.rows}
			type={props.type}
			onChange={props.onChange}
		/>
	);
};

export default TextInput;
