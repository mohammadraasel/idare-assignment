import React from 'react'
import { CSVDownloader as CSVPapaDownloader  } from 'react-papaparse'
import Button from './Button'

interface ICSVDownloaderProps {
	data: any[],
	filename?: string,
	buttonLabel?: string,
}

const CSVDownloader: React.FC<ICSVDownloaderProps> = ({
	data, filename, buttonLabel
}) => {

	return (
		<CSVPapaDownloader
			data={data}
			filename={filename}
		>
			<Button variant="primary">
				{buttonLabel}
			</Button>
		</CSVPapaDownloader>
	)
}

CSVDownloader.defaultProps = {
	filename: 'download',
	buttonLabel: 'Download'
}
export default CSVDownloader
