import React from 'react'
import Plot from 'react-plotly.js'

interface IPlotterProps {
	data?: any
	title?: string
}

const Plotter: React.FC<IPlotterProps>= ({data, title}) => {
	return (
		<Plot
			data={data}
			layout={ {width: 900, height: 500, title } }
      	/>
	)
}

Plotter.defaultProps = {
	data: [],
	title: 'Plot'
}

export default Plotter
