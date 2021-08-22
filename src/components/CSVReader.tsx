import React, { MouseEvent, useRef } from 'react';
import { CSVReader as CSVPapaReader } from 'react-papaparse';
import Button from './Button';


const CSVReader: React.FC = () => {

  const buttonRef = useRef<any>()

  const handleOpenDialog = (e:MouseEvent<HTMLElement>) => {
    if (buttonRef.current) {
      buttonRef.current.open(e);
    }
  }

  const handleOnFileLoad = (data: any) => {
    console.log('---------------------------');
    console.log(data);
    console.log('---------------------------');
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
    <CSVPapaReader
      ref={buttonRef}
      onFileLoad={handleOnFileLoad}
      onError={handleOnError}
      noClick
      noDrag
      onRemoveFile={handleOnRemoveFile}
    >
      {({ file }: any) => (
        <div
          style={{
            display: 'flex',
            marginBottom: 10,
          }}
        >
          <Button
            type="button"
            onClick={handleOpenDialog}
            variant='primary'
            style={{
              width: '40%',
            }}
          >
            Browse file
          </Button>
          <div
            style={{
              borderWidth: 1,
              borderStyle: 'solid',
              borderColor: '#ccc',
              height: 45,
              paddingLeft: 13,
              paddingTop: 12,
              width: '60%',
            }}
          >
            {file && file.name}
          </div>
          <Button
            variant='alert'
            onClick={handleRemoveFile}
          >
            Remove
          </Button>
        </div>
      )}
    </CSVPapaReader>
  )
}

export default CSVReader
