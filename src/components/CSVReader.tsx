import React, { MouseEvent, useRef } from 'react';
import { CSVReader as CSVPapaReader } from 'react-papaparse';
import styled from 'styled-components';
import { useAppDispatch } from '../hooks';
import { setData } from '../redux/slices/stats-slice';
import Button from './Button';
import CloseIcon from './CloseIcon';


const CSVReader: React.FC = () => {

	const buttonRef = useRef<any>()
	const dispatch = useAppDispatch()

	const handleOpenDialog = (e:MouseEvent<HTMLElement>) => {
		if (buttonRef.current) {
		buttonRef.current.open(e);
		}
	}

	const handleOnFileLoad = (data: any) => {
		dispatch(setData(data))
	}

	const handleOnError = (err: any, file: any, inputElem: any, reason: any) => {
		console.log('---------------------------');
		console.log(err);
		console.log('---------------------------');
	}

	const handleOnRemoveFile = (data:any) => {
		console.log('---------------------------');
		console.log(data);
		console.log('---------------------------');
	}

	const handleRemoveFile = (e:MouseEvent<HTMLElement>) => {
		if (buttonRef.current) {
			buttonRef.current.removeFile(e);
		}
	}

	return (
		<StyledUploader>
			<CSVPapaReader
				ref={buttonRef}
				onFileLoad={handleOnFileLoad}
				onError={handleOnError}
				noClick
				noDrag
				onRemoveFile={handleOnRemoveFile}
			>
				{({ file }: any) => (
				<div className='uploader'>
					<Button
						type="button"
						onClick={handleOpenDialog}
						variant='upload'
					>
						Click here to upload file
					</Button>
					<div className="file">
						<div className="filename">
							{file && file.name}
						</div>
						{
							file &&
							<CloseIcon
								onClick={handleRemoveFile}
							/>
						}
					</div>
				</div>
				)}
			</CSVPapaReader>

		</StyledUploader>
	)
}

export default CSVReader


const StyledUploader = styled.div`
	width: 100%;
	max-width: 700px;

	.file {
		display: flex;
		padding: 10px;
		justify-content: center;
		align-items: center;

		.filename {
			margin-right: 10px;
		}
	}
`
