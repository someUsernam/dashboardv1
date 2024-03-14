import { Tag } from "@prisma/client";

type State = {
	tags: Tag[];
	selectedTags: Tag[];
	value: string;
	selectedColor: string;
};

type Action =
	| { type: "SET_TAGS"; payload: Tag[] }
	| { type: "SET_SELECTED_TAGS"; payload: Tag[] }
	| { type: "SET_VALUE"; payload: string }
	| { type: "SET_SELECTED_COLOR"; payload: string }
	| { type: "DELETE_TAG"; payload: string };

function reducer(state: State, action: Action) {
	if (action.type === "SET_TAGS") {
		return {
			...state,
			tags: action.payload,
		};
	}
	if (action.type === "SET_SELECTED_TAGS") {
		return {
			...state,
			selectedTags: action.payload,
		};
	}
	if (action.type === "SET_VALUE") {
		return {
			...state,
			value: action.payload,
		};
	}
	if (action.type === "SET_SELECTED_COLOR") {
		return {
			...state,
			selectedColor: action.payload,
		};
	}
	if (action.type === "DELETE_TAG") {
		return {
			...state,
			tags: state.tags.filter((tag) => tag.id !== action.payload),
		};
	}
	return state;
}

// const initalState: State = {
// 	tags: defaultTags || [],
// 	selectedTags: defaultTags || [],
// 	value: "",
// 	selectedColor: "",
// };

export { reducer };
