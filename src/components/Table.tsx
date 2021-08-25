import React from "react";
import { usePagination, useTable } from "react-table";
import styled from "styled-components";

interface ITableData {
	columns: any[];
	data: any[];
}

const Table: React.FC<ITableData> = ({ columns, data }) => {
	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		prepareRow,
		page,
		canPreviousPage,
		canNextPage,
		pageOptions,
		pageCount,
		gotoPage,
		nextPage,
		previousPage,
		setPageSize,
		state: { pageIndex, pageSize },
	} = useTable({ columns, data }, usePagination) as any;

	return (
		<Styles>
			<table {...getTableProps()}>
				<thead className="thead">
					{headerGroups.map((headerGroup: any) => (
						<tr {...headerGroup.getHeaderGroupProps()}>
							{headerGroup.headers.map((column: any) => (
								<th {...column.getHeaderProps()}>{column.render("Header")}</th>
							))}
						</tr>
					))}
				</thead>
				<tbody className="tbody" {...getTableBodyProps()}>
					{page.map((row: any) => {
						prepareRow(row);
						return (
							<tr {...row.getRowProps()}>
								{row.cells.map((cell: any, idx: number) => {
									return (
										<td {...cell.getCellProps()} data-label={columns[idx]?.Header}>
											{cell.render("Cell")}
										</td>
									);
								})}
							</tr>
						);
					})}
				</tbody>
			</table>
			{data.length > 0 && (
				<div className="pagination">
					<div className="content">
						<div className="next-prev">
							<button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
								{"<<"}
							</button>{" "}
							<button onClick={() => previousPage()} disabled={!canPreviousPage}>
								{"<"}
							</button>{" "}
							<button onClick={() => nextPage()} disabled={!canNextPage}>
								{">"}
							</button>{" "}
							<button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
								{">>"}
							</button>{" "}
						</div>
						<div className="page-info">
							<span>
								Page{" "}
								<strong>
									{pageIndex + 1} of {pageOptions.length}
								</strong>{" "}
							</span>
							<span>
								| Go to page:{" "}
								<input
									type="number"
									defaultValue={pageIndex + 1}
									onChange={(e) => {
										const page = e.target.value ? Number(e.target.value) - 1 : 0;
										gotoPage(page);
									}}
									style={{ width: "100px" }}
								/>
							</span>{" "}
						</div>
						<div className="page-show">
							<select
								value={pageSize}
								onChange={(e) => {
									setPageSize(Number(e.target.value));
								}}
							>
								{[10, 20, 30, 40, 50, 100].map((pageSize) => (
									<option key={pageSize} value={pageSize}>
										Show {pageSize}
									</option>
								))}
							</select>
						</div>
					</div>
				</div>
			)}
		</Styles>
	);
};

Table.defaultProps = {
	columns: [],
	data: [],
};

export default Table;

const Styles = styled.div`
	padding: 2rem 0;
	table {
		border: 1px solid rgba(0, 0, 0, 0.33);
		border-collapse: collapse;
		margin: 0;
		padding: 0;
		width: 100%;
		table-layout: fixed;

		tr {
			border: 1px solid rgba(0, 0, 0, 0.33);
			padding: 0.35em;
			color: rgba(0, 0, 0, 0.33);
			font-size: 14px;
		}

		td {
			padding: 0.625em;
			text-align: center;
			border-bottom: 1px solid rgba(0, 0, 0, 0.33);
			border-right: 1px solid rgba(0, 0, 0, 0.33);
			color: #475569;

			:last-child {
				border-right: 0;
			}
		}

		th {
			font-size: 12px;
			letter-spacing: 0.1em;
			text-transform: uppercase;
			padding: 1rem 0.5rem;
			border-bottom: 1px solid rgba(0, 0, 0, 0.33);
			border-right: 1px solid rgba(0, 0, 0, 0.33);
			color: #475569;
			overflow-wrap: anywhere;
		}
	}

	.pagination {
		padding: 0.8rem 0;
		display: flex;
		justify-content: flex-end;

		.content {
			display: flex;
			align-items: center;

			.page-info {
				margin: 0 10px;
			}
		}
	}

	@media (max-width: 1150px) {
		table {
			td {
				font-size: 12px;
			}

			th {
				font-size: 10px;
			}
		}
	}

	@media (max-width: 968px) {
		table {
			border: 0;

			thead {
				border: none;
				clip: rect(0 0 0 0);
				height: 1px;
				margin: -1px;
				overflow: hidden;
				padding: 0;
				position: absolute;
				width: 1px;
			}

			tr {
				display: block;
				margin-bottom: 0.625em;
			}

			td {
				border-bottom: 1px solid #ddd;
				display: block;
				font-size: 0.9em;
				text-align: right;
				border-right: 0;
			}

			td::before {
				content: attr(data-label);
				float: left;
				font-weight: bold;
				text-transform: uppercase;
			}

			td:last-child {
				border-bottom: 0;
			}
		}
	}

	@media (max-width: 500px) {
		.pagination {
			.content {
				display: flex;
				flex-direction: column;
				align-items: flex-end;

				.page-info {
					margin: 10px 0;
					font-size: 14px;
				}
			}
		}
	}
`;
