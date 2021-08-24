import React from 'react'
import Plot from 'react-plotly.js'

interface IPlotterProps {
	data?: any
	title?: string
	layout?: any
}

const Plotter: React.FC<IPlotterProps>= ({data, title, layout}) => {
	return (
		<Plot
			data={data}
			layout={ {...layout, title } }
      	/>
	)
}

Plotter.defaultProps = {
	data: [],
	title: 'Plot',
	layout: {width: 900, height: 500,}
}

export default Plotter
