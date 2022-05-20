import { BrowserRouter as Router } from 'react-router-dom';
import UserProvider from './context/UserProvider';

import Layout from './layout';

const App = () => {
	return (
		<Router>
			<UserProvider>
				<Layout />
			</UserProvider>
		</Router>
	);
};

export default App;
