import React from "react";
import { PDFExport } from "@progress/kendo-react-pdf";
import Button from "./Button";

const PDFExporter:React.FC<any> = ({children}) => {
  const pdfExportComponent = React.useRef<PDFExport>(null);

	return (
		<div>
			<div>
				<Button
					variant="primary"
					onClick={() => {
						if (pdfExportComponent.current) {
							pdfExportComponent.current.save();
						}
					}}
				>
					Download PDF
				</Button>
			</div>

			<div style={{ position: "absolute", left: "-1000px", top: 0 }}>
				<PDFExport paperSize="A4" margin="1cm" ref={pdfExportComponent}>
					<div style={{ width: "500px" }}>
						{children}
					</div>
				</PDFExport>
			</div>
		</div>
	);
}

export default PDFExporter
