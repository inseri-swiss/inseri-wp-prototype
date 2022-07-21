import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface MetaItem {
	field: string,
	block: string,
}

interface MetaBlock {
	block: string,
	fields: MetaItem[]
}

interface Meta {
	activeBlocks: {
		[key: string]: number;
	}
	fields: MetaItem[]
}

const initialState: Meta = {
	activeBlocks: {},
	fields: []
}

export const metaSlice = createSlice({
	name: 'inseri/meta',
	initialState,
	reducers: {
		addSlice: (state, {payload}: PayloadAction<MetaBlock>) => {
			const {block, fields} = payload

			if(!state.activeBlocks[block]){
				state.activeBlocks[block] = 1
				state.fields.push(...fields)
			}
			else {
				state.activeBlocks[block]++
			}
		},
		removeSlice: (state, {payload: block}: PayloadAction<string>) => {
			if(state.activeBlocks[block] === 1){
				state.activeBlocks[block] = null

				state.fields = state.fields.filter(i => i.block !== block)
			}
			else {
				state.activeBlocks[block]--
			}
		}
	}
})

export const fooSlice = createSlice({
	name: 'inseri/foo',
	initialState: {foo:0},
	reducers: {
		fooify: (state) => {
			state.foo++
		},
	}
})


export const { addSlice, removeSlice } = metaSlice.actions

export const store = configureStore({
	reducer: { "inseri/meta": metaSlice.reducer },
	devTools: {name: 'inseri'}
})
