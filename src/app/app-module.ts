import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { SharedModule } from './shared/shared-module';
import { CoreModule } from './core/core-module';
import { AuthModule } from './modules/auth/auth-module';
import { InviteModule } from './modules/invite/invite-module';
import { MarketplaceModule } from './modules/marketplace/marketplace-module';
import { InvitePage } from './shared/pages/invite-page/invite-page';

@NgModule({
  declarations: [App], // 👈 Removido o InvitePage daqui
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    SharedModule,
    AuthModule,
    InviteModule,
    MarketplaceModule,
    InvitePage, // 🌟 Adicionado o InvitePage AQUI nos imports!
  ],
  providers: [provideBrowserGlobalErrorListeners()],
  bootstrap: [App],
})
export class AppModule {}
