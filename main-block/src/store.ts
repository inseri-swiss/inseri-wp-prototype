import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit'

interface MetaItem {
	name: string,
	displayName: string,
	namespace: string,
	description: string,
}

const metaSlice = createSlice({
	name: 'inseri/meta',
	initialState: [],
	reducers: {
		addDataType: (state, action: PayloadAction<MetaItem>) => {
			state.push(action.payload)
		},
		removeDataType: (state, action: PayloadAction<MetaItem>) => {
			const { name, namespace } = action.payload
			state = state.filter(i => i.name !== name || i.namespace !== namespace)
		}
	}
})

export const { addDataType, removeDataType } = metaSlice.actions


export const store = configureStore({
	reducer: {
		'inseri/meta': metaSlice.reducer
	},
	devTools: {name: 'inseri'}
})
