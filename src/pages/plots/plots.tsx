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

const generateRandomNumber = (length: number = 2) => {
	return Math.floor(Math.random() * (length - 1)) + 1
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

		const getRandomCols = () => {
			const keys = Object.keys(plotData)
			let rand1 = generateRandomNumber(keys.length)
			let rand2 = generateRandomNumber(keys.length)
			while (rand1 === rand2) {
				rand1 = generateRandomNumber(keys.length)
				rand2 = generateRandomNumber(keys.length)
			}

			const keyX = keys[rand1]
			const keyY = keys[rand2]

			return { keyX, keyY }
		}

		return {plotData, ...getRandomCols() }
	}

	const getScatterPlotData = () => {
		const {plotData, keyX, keyY } = getPlotData()
		return [
			{
				x: plotData[keyX],
				mode: 'lines+markers',
				name: keyX,
  				type: 'scatter'
			},
			{
				y: plotData[keyY],
				mode: 'lines+markers',
				name: keyY,
  				type: 'scatter'
			}
		]
	}
	const getBoxPlotData = () => {
		const {plotData, keyX, keyY } = getPlotData()
		return [
			{
				y: plotData[keyX],
				name: keyX,
  				type: 'box'
			},
			{
				y: plotData[keyY],
				name: keyY,
  				type: 'box'
			}
		]
	}
	const getHistogramData = () => {
		const {plotData, keyX } = getPlotData()
		return [
			{
				x: plotData[keyX],
				type: 'histogram',
				name: keyX,
			}
		]
	}

	if (data.length === 0) {
		return null
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
						{
							tabItems.map((item) => (
								<Plotter
									key={item.label}
									layout={layoutConfig}
									data={getPlotDataByType(item.value)}
									title={item.value}
								/>
							))
						}
					</PDFExporter>
				</div>
				<div className="tabs">
					{
						tabItems.map((tab) => (
							<div
								onClick={() => setActiveTab(tab.value)}
								className={`tab-item ${tab.value === activeTab ? 'active' : ''}`}
								key={tab.value}
							>
								{tab.label}
							</div>
						))
					}
				</div>
				<Plotter data={getPlotDataByType(activeTab)} />
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
	padding-bottom: 50px;

	.action {
		width: 100%;
		display: flex;
		justify-content: flex-end;
		margin-bottom: 10px;
	}

	.tabs {
		display: flex;
		justify-content: center;
		align-items: center;
		border-bottom: 1px solid rgba(0, 0, 0, 0.33);
		width: 100%;

		.tab-item {
			margin: 0 15px;
			padding: 5px 10px;
			:hover {
				cursor: pointer;
			}

			&.active {
				border: 1px solid rgba(0, 0, 0, 0.33);
				border-bottom: none;
			}
		}
	}

	@media (max-width: 768px) {
		.tabs {

			.tab-item {
				margin: 0 8px;
				font-size: 14px;
				white-space: nowrap;
			}
		}
	}
`
