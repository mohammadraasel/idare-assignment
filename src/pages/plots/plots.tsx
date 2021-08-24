import { useState } from 'react'
import styled from 'styled-components'
import CSVDownloader from '../../components/CSVDownloader'
import Layout from '../../components/Layout'
import PDFExporter from '../../components/PDFExporter'
import Plotter from '../../components/Plotter'
import Table from '../../components/Table'
import { PlotType } from '../../constants/enums'
import { useAppSelector } from '../../hooks'
import { selectTableData } from '../../redux/slices/stats-slice'

const tabItems = [
	{
		label: 'Scatter Plot',
		value: PlotType.SCATTER
	},
	{
		label: 'Box Plot',
		value: PlotType.BOX,
	},
	{
		label: 'Histogram',
		value: PlotType.HISTOGRAM
	}
]

const layoutConfig = {
	height: 400,
	width: 500,
}

const PlotsPage = () => {
	const { columns, data } = useAppSelector(selectTableData)
	const [activeTab, setActiveTab] = useState<PlotType>(PlotType.SCATTER)

	const getPlotDataByType = (type: PlotType) => {
		switch (type) {
			case PlotType.SCATTER:
				return getScatterPlotData()
			case PlotType.BOX:
				return getBoxPlotData()
			case PlotType.HISTOGRAM:
				return getHistogramData()
			default:
				return []
		}
	}

	const getPlotData = () => {
		const plotData = {} as any
		data.forEach((d: any) => {
			for (const [key, value] of Object.entries(d)){
				if (plotData[key]) {
					plotData[key].push(value)
				} else {
					plotData[key] = []
					plotData[key].push(value)
				}
			}
		})
		return plotData
	}

	const getScatterPlotData = () => {
		const plotData = getPlotData()
		return [
			{
				x: plotData['dn'],
				mode: 'lines+markers',
  				type: 'scatter'
			},
			{
				y: plotData['up'],
				mode: 'lines+markers',
  				type: 'scatter'
			}
		]
	}
	const getBoxPlotData = () => {
		const plotData = getPlotData()
		return [
			{
				y: plotData['dn'],
  				type: 'box'
			},
			{
				y: plotData['up'],
  				type: 'box'
			}
		]
	}
	const getHistogramData = () => {
		const plotData = getPlotData()
		return [
			{
				x: plotData['up'],
  				type: 'histogram'
			}
		]
	}

	return (
		<Layout>
			<StyledSection>
				<div className="action">
					<CSVDownloader data={data}/>
				</div>
				<Table columns={columns} data={data} />
			</StyledSection>
			<StyledSection>
				<div className="action">
					<PDFExporter>
						<Plotter
							layout={layoutConfig}
							data={getPlotDataByType(PlotType.SCATTER)}
							title={PlotType.SCATTER}
						/>
						<Plotter
							layout={layoutConfig}
							data={getPlotDataByType(PlotType.BOX)}
							title={PlotType.BOX}
						/>
						<Plotter
							layout={layoutConfig}
							data={getPlotDataByType(PlotType.HISTOGRAM)}
							title={PlotType.HISTOGRAM}
						/>
					</PDFExporter>
				</div>
				<div className="tabs">
					{
						tabItems.map((tab) => (
							<div
								onClick={() => setActiveTab(tab.value)} className={`tab-item ${tab.value === activeTab ? 'active': ''}`}
								key={tab.value}
							>
								{tab.label}
							</div>
						))
					}
				</div>
				<Plotter data={getPlotDataByType(activeTab)} title={activeTab} />
			</StyledSection>
		</Layout>
	)
}

export default PlotsPage


const StyledSection = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding-top: 50px;

	.action {
		width: 100%;
		display: flex;
		justify-content: flex-end;
	}

	.tabs {
		display: flex;
		justify-content: center;
		align-items: center;
		border-bottom: 1px solid grey;
		width: 100%;

		.tab-item {
			margin: 0 15px;
			padding: 5px 10px;
			:hover {
				cursor: pointer;
			}

			&.active {
				border: 1px solid grey;
				border-bottom: none;
			}
		}
	}
`
