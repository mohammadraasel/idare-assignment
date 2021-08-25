import { Link } from "react-router-dom";
import styled from "styled-components";
import CSVReader from "../../components/CSVReader";
import Layout from "../../components/Layout";
import { Paths } from "../../configs/routes";
import { useAppSelector } from "../../hooks";
import { selectData } from "../../redux/slices/stats-slice";

const HomePage: React.FC<any> = () => {
	const data = useAppSelector(selectData);
	return (
		<Layout>
			<StyledContent>
				<CSVReader />
				{data.length > 0 && (
					<div className="link">
						<Link to={Paths.PLOTS_PAGE()}>See data list and plots</Link>
					</div>
				)}
			</StyledContent>
		</Layout>
	);
};

export default HomePage;

const StyledContent = styled.div`
	height: 100vh;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	.link {
		padding: 20px;
	}
`;
