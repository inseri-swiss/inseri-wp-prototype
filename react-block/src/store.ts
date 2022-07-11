import { createReduxStore, register } from "@wordpress/data";

interface State {
	counters: {}
}

const DEFAULT_STATE = {
	counters: {},
};

const actions = {
	setFound(key: string, count: number) {
		return {
			type: "SET_FOUND",
			key,
			count,
		};
	},
};

export const store = createReduxStore<State>("counters", {
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
