import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { SharedModule } from './shared/shared-module';
import { AuthModule } from './modules/auth/auth-module';
import { InviteModule } from './modules/invite/invite-module';
import { MarketplaceModule } from './modules/marketplace/marketplace-module';
import { CoreModule } from './core/core-module';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { AdminModule } from './modules/admin/admin-module';

@NgModule({
  declarations: [App],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    SharedModule,
    AuthModule,
    InviteModule,
    MarketplaceModule,
    AdminModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(withInterceptors([authInterceptor]))
  ],
  bootstrap: [App],
})
export class AppModule {}
