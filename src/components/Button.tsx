import React from 'react'
import styled from 'styled-components'


const Button:React.FC<any> = ({ children, variant, ...props }) => {
	return (
		<StyledButton className={variant} {...props}>
			{children}
		</StyledButton>
	)
}

Button.defaultProps = {
	variant: 'default'
}

export default Button

const StyledButton = styled.button`
	:active,
	:hover {
		outline: none;
		cursor: pointer;
	}
	color: white;
	padding: 10px 20px;
	border: none;
	font-size: 18px;

	&.primary {
		background-color: #4B91C9;
	}

	&.alert {
		background-color: #DD2222;
	}

	&.upload {
		background-color: white;
		padding: 20px 30px;
		border: 2px dashed grey;
		color: black;
		width: 100%;
	}
`
