import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export const textSlice = createSlice({
	name: 'inseri/text',
	initialState: {text: ""},
	reducers: {
		setText: (state, {payload:{text}}: PayloadAction<{text: string}>) => {
			state.text = text
		},
		reset: (state,) => {
			state.text = ""
		}
	}
})

export const { setText, reset } = textSlice.actions
