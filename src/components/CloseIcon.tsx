import styled from "styled-components";

export const CloseIcon: React.FC<any> = (props) => {
	return (
		<StyledSVG
			height="24"
			width="24"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 512 512"
			{...props}
		>
			<ellipse cx={256} cy={256} rx={256} ry={255.832} fill="#e04f5f" />
			<g fill="#fff">
				<path d="M376.812 337.18l-39.592 39.593-201.998-201.999 39.592-39.592z" />
				<path d="M376.818 174.825L174.819 376.824l-39.592-39.592 201.999-201.999z" />
			</g>
		</StyledSVG>
	);
};

export default CloseIcon;

const StyledSVG = styled.svg`
	:hover {
		cursor: pointer;
	}
`;
