import React from "react";
import Plot from "react-plotly.js";

interface IPlotterProps {
	data?: any;
	title?: string;
	layout?: any;
}

const Plotter: React.FC<IPlotterProps> = ({ data, title, layout }) => {
	return (
		<Plot
			data={data}
			layout={{ autosize: true, title, ...layout }}
			style={{ width: "100%", height: "100%" }}
			useResizeHandler={true}
		/>
	);
};

Plotter.defaultProps = {
	data: [],
	title: "",
	layout: {},
};

export default Plotter;
