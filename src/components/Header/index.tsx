import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { useAuth } from '../../hooks/useAuth';

import styles from './Header.module.css';

const Header = () => {
	const { isAuth, logout } = useAuth();

	return (
		<header>
			<Navbar bg='dark' variant='dark' expand='md'>
				<Container>
					<Navbar.Brand as={Link} to='/'>
						<h1 className={styles.title}>Movies</h1>
					</Navbar.Brand>
					<Navbar.Toggle aria-controls='basic-navbar-nav' />
					<Navbar.Collapse id='basic-navbar-nav'>
						<Nav className='ms-auto'>
							<Nav.Link as={Link} to='/'>
								Home
							</Nav.Link>
							{isAuth && (
								<>
									<Nav.Link as={Link} to='/profile'>
										Profile
									</Nav.Link>
									<Nav.Link as={Button} onClick={logout}>
										LogOut
									</Nav.Link>
								</>
							)}
							{!isAuth && (
								<>
									<Nav.Link as={Link} to='/user/login'>
										Login
									</Nav.Link>
									<Nav.Link as={Link} to='/user/singup'>
										Sign up
									</Nav.Link>
								</>
							)}
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</header>
	);
};

export default Header;
