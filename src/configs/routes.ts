import HomePage from '../pages/home'
import PlotsPage from '../pages/plots'

export const Paths = {
	HOME_PAGE: () => '/',
	PLOTS_PAGE: () => '/plots',
}

export const Routes = [
	{
		exact: true,
		path: Paths.HOME_PAGE(),
		component: HomePage,
	},
	{
		exact: true,
		path: Paths.PLOTS_PAGE(),
		component: PlotsPage,
	},
]
