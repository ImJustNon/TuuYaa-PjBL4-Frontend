import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Helmet, HelmetProvider } from 'react-helmet-async';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<HelmetProvider>
			<GoogleOAuthProvider clientId='175992254880-5ch1eesii181r7plltatqce87imaekq9.apps.googleusercontent.com'>
				<BrowserRouter>
					<App />
				</BrowserRouter>
			</GoogleOAuthProvider>
		</HelmetProvider>
	</React.StrictMode>
);
