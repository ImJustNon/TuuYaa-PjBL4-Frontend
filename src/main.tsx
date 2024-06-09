import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import config from "./config/config";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<HelmetProvider>
			<GoogleOAuthProvider clientId={config.googleClientId}>
				<BrowserRouter>
					<App />
				</BrowserRouter>
			</GoogleOAuthProvider>
		</HelmetProvider>
	</React.StrictMode>
);
