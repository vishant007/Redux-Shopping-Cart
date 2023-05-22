import React, { useEffect } from 'react';
import './App.css';
import Auth from './components/Auth';
import Layout from './components/Layout';
import { useDispatch, useSelector } from 'react-redux';
import { json } from 'react-router-dom';
import Notification from './components/Notification';
import { uiActions } from './store/ui-slice';

function App() {
	const dispatch = useDispatch();
	const notification = useSelector((state) => state.ui.notification);
	const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
	console.log(isLoggedIn);
	// send the state as sending request
	const cart = useSelector((state) => state.cart);
	useEffect(() => {
		const sendRequest = async () => {
			// send the state as sending
			dispatch(
				uiActions.showNotification({
					open: true,
					message: 'Sending Request',
					type: 'warning',
				})
			);
			const res = await fetch(
				'https://redux-cart-f27c4-default-rtdb.firebaseio.com/cartItems.json',
				{
					method: 'PUT',
					body: JSON.stringify(cart),
				}
			);

			const data = await res.json();
			// send state as the request is successful
			dispatch(
				uiActions.showNotification({
					open: true,
					message: 'Sending Request to database is successful',
					type: 'success',
				})
			);
		};
		//
		sendRequest().catch((err) => {
			// send state as ERROR
			dispatch(
				uiActions.showNotification({
					open: true,
					message: 'Sending Request to database failed',
					type: 'error',
				})
			);
		});
	}, [cart]);
	return (
		<div className='App'>
			{notification && (
				<Notification type={notification.type} message={notification.message} />
			)}
			{!isLoggedIn && <Auth />}
			{isLoggedIn && <Layout />}
		</div>
	);
}

export default App;
