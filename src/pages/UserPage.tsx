import { Container } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';

// Login - Register
const UserPage = () => {
	return (
		<main>
			<Container fluid='lg'>
				<Outlet />
			</Container>
		</main>
	);
};

export default UserPage;
