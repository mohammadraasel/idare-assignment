import React from 'react'
import { usePagination, useTable } from 'react-table'
import styled from 'styled-components'

interface ITableData {
	columns: any[],
	data: any[]
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
	} = useTable({ columns, data }, usePagination) as any

	return (
		<Styles>
			<table {...getTableProps()}>
			<thead>
				{headerGroups.map((headerGroup:any) => (
				<tr {...headerGroup.getHeaderGroupProps()}>
					{headerGroup.headers.map((column:any) => (
					<th
						{...column.getHeaderProps()}
					>
						{column.render('Header')}
					</th>
					))}
				</tr>
				))}
			</thead>
			<tbody {...getTableBodyProps()}>
				{page.map((row:any) => {
				prepareRow(row)
				return (
					<tr {...row.getRowProps()}>
					{row.cells.map((cell:any) => {
						return (
						<td
							{...cell.getCellProps()}
						>
							{cell.render('Cell')}
						</td>
						)
					})}
					</tr>
				)
				})}
			</tbody>
			</table>
			<div className="pagination">
				<button
					onClick={() => gotoPage(0)}
					disabled={!canPreviousPage}
				>
					{'<<'}
				</button>{' '}
				<button
					onClick={() => previousPage()}
					disabled={!canPreviousPage}
				>
					{'<'}
				</button>{' '}
				<button
					onClick={() => nextPage()}
					disabled={!canNextPage}
				>
					{'>'}
				</button>{' '}
				<button
					onClick={() => gotoPage(pageCount - 1)}
					disabled={!canNextPage}
				>
					{'>>'}
				</button>{' '}
				<span>
					Page{' '}
					<strong>
						{pageIndex + 1} of {pageOptions.length}
					</strong>{' '}
				</span>
				<span>
					| Go to page:{' '}
				<input
					type="number"
					defaultValue={pageIndex + 1}
					onChange={e => {
					const page = e.target.value ? Number(e.target.value) - 1 : 0
					gotoPage(page)
					}}
					style={{ width: '100px' }}
				/>
				</span>{' '}
				<select
					value={pageSize}
					onChange={e => {
						setPageSize(Number(e.target.value))
					}}
				>
				{[10, 20, 30, 40, 50].map(pageSize => (
					<option key={pageSize} value={pageSize}>
						Show {pageSize}
					</option>
				))}
				</select>
			</div>
		</Styles>
  	)
}

Table.defaultProps = {
	columns: [],
	data: []
}

export default Table

const Styles = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }
  }

  .pagination {
    padding: 0.5rem;
  }
`
