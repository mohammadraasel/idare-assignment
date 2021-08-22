import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

export interface IStats {
	data: any[]
}

const initialState: IStats = {
	data: [],
}

export const statsSlice = createSlice({
	name: 'stats',
	initialState,

	reducers: {
		setData: (state, action: PayloadAction<any>) => {
			state.data = action.payload
		},
	},
})

export const { setData } = statsSlice.actions

export const selectData = (state: RootState) => state.stats.data

export default statsSlice.reducer
