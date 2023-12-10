import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { userReducer } from '../modules/user/application/user.reducer';
import { UserEffects } from '../modules/user/application/user.effects';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { ProductEffects } from '../modules/airconditioner/application/airconditioner.effects';
import { productReducer } from '../modules/airconditioner/application/ariconditioner.reducer';
import { cartReducer } from '../modules/cart/application/cart.reducer';
import { CartEffects } from '../modules/cart/application/cart.effects';
import { appReducer } from '../modules/core/application/core.reducer';
import { SaleEffects } from '../modules/sale/application/sale.effects';
import { saleReducer } from '../modules/sale/application/sale.reducer';
import { serviceRequestReducer } from '../modules/service-request/application/service-request.reducer';
import { ServiceRequestEffects } from '../modules/service-request/application/service-request.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withFetch()),
    provideClientHydration(),
    provideStore({
      app: appReducer,
      auth: userReducer,
      product: productReducer,
      cart: cartReducer,
      sale: saleReducer,
      service: serviceRequestReducer
    }),
    provideEffects(UserEffects, ProductEffects, CartEffects, SaleEffects, ServiceRequestEffects),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
  ],
};
