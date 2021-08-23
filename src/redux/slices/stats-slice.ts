import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface ITableData {
	columns: string[];
	data: any[];
}
export interface IStats {
	data: any[];
	tableData: ITableData;
}

const initialState: IStats = {
	data: [],
	tableData: { columns: [], data: [] },
};

const formatData = (rows: any[]) => {
	const headerRow = rows[0].data;
	const getAccessor = (arg: string) => {
		return arg.replace(".", "-");
	};
	const columns = headerRow.map((r: any) => {
		return { Header: r.toUpperCase(), accessor: getAccessor(r) };
	});

	const formatRow = (row: any[]) => {
		const rowData = {} as any;
		row.forEach((data: any, idx: number) => {
			rowData[getAccessor(headerRow[idx])] = data;
		});
		return rowData;
	};
	const data = rows.slice(1).map((row: any) => formatRow(row.data));

	return { columns, data };
};

export const statsSlice = createSlice({
	name: "stats",
	initialState,

	reducers: {
		setData: (state, action: PayloadAction<any>) => {
			state.data = action.payload;
			state.tableData = formatData(action.payload);
		},
	},
});

export const { setData } = statsSlice.actions;

export const selectData = (state: RootState) => state.stats.data;
export const selectTableData = (state: RootState) => state.stats.tableData;

export default statsSlice.reducer;
