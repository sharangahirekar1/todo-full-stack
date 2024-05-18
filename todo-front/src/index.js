import React from 'react';
import ReactDOM from 'react-dom/client';
import {App} from './App';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {store} from './store';
import SnackBarProvider from './Common/Contexts/Snackbar';

const registerServiceWorker = async () => {
  if( "serviceWorker" in navigator ) {
    try {
      const registration = await navigator.serviceWorker.register("/sw.js")

      if( registration.installing) {
        console.log("Service worker installing")
      }
      else if (registration.waiting) {
        console.log("Service worker installed")
      }
      else if (registration.active) {
        console.log("Service worker active")
      }
    } catch (err){
      console.log(`Registration failed with ${err}`)
    }
  }
}

registerServiceWorker();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<Provider store={store}>
  <BrowserRouter>
    <SnackBarProvider>
      <App />
    </SnackBarProvider>
  </BrowserRouter>
</Provider>
);

