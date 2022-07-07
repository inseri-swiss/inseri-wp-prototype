import { createReduxStore, register } from "@wordpress/data";

const DEFAULT_STATE = {
	counters: {},
};

const actions = {
	setFound(key, count) {
		return {
			type: "SET_FOUND",
			key,
			count,
		};
	},
};

export const store = createReduxStore("counters", {
	reducer(state = DEFAULT_STATE, action) {
		switch (action.type) {
			case "SET_FOUND":
				const { key, count } = action;

				return {
					...state,
					counters: {
						...state.counters,
						[key]: count,
					},
				};
		}

		return state;
	},

	actions,
	selectors: {
		getCounters(state) {
			return state.counters;
		},
	},
});

register(store);
