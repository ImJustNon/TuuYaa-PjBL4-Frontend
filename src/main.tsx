import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "animate.css";
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import config from "./config/config";
import { I18nextProvider } from 'react-i18next';
import i18n from "./i18n";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<HelmetProvider>
			<GoogleOAuthProvider clientId={config.googleClientId}>
				<I18nextProvider i18n={i18n}>
					<BrowserRouter>
						<App />
					</BrowserRouter>
				</I18nextProvider>
			</GoogleOAuthProvider>
		</HelmetProvider>
	</React.StrictMode>
);
