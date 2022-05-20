import { Routes, Route, Navigate } from 'react-router-dom';
import { MovieDetails } from './MovieDetails';
import { LandingPage } from './LandingPage';

import UserPage from './UserPage';
import FormUser from '../components/FormUser';
import ProfilePage from './ProfilePage';

import PrivateRoute from '../components/PrivateRoute';
import PublicRoute from '../components/PublicRoute';

const Pages = () => {
	return (
		<Routes>
			<Route path='/movies/:movieId' element={<MovieDetails />} />

			<Route
				path='/profile'
				element={
					<PrivateRoute>
						<ProfilePage />
					</PrivateRoute>
				}
			/>

			<Route
				path='/user'
				element={
					<PublicRoute>
						<UserPage />
					</PublicRoute>
				}
			>
				<Route index element={<FormUser type='login' />} />
				<Route path='login' element={<FormUser type='login' />} />
				<Route path='singup' element={<FormUser type='singup' />} />
			</Route>

			<Route path='/' element={<LandingPage />} />
			<Route path='*' element={<Navigate replace to='/' />} />
		</Routes>
	);
};

export default Pages;
