import { fakeBackendProvider } from './pages/_helpers/fake-backend';
import { ErrorInterceptor } from './pages/_helpers/error.interceptor';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconRegistry } from '@angular/material';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app.routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material/material.module';
import { HomeComponent } from './pages/home/home.component';
import { ComponentsModule } from './components/components.module';
import { SettingsComponent } from './pages/settings/settings.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { DepositsComponent } from './pages/deposits/deposits.component';
import { WithdrawalsComponent } from './pages/withdrawals/withdrawals.component';
import { FormsModule } from '@angular/forms';
import { JwtInterceptor } from './pages/_helpers/jwt.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SettingsComponent,
    RegisterComponent,
    LoginComponent,
    DepositsComponent,
    WithdrawalsComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    MaterialModule,
    ComponentsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    // provider used to create fake backend
    fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    // Add custom icon
    this.matIconRegistry.addSvgIcon(
      'settings-outline',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icon/outline-settings-24px.svg')
    );

    this.matIconRegistry.addSvgIcon(
      'home-outline',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icon/outline-home-24px.svg')
    );

    this.matIconRegistry.addSvgIcon(
      'lock-outline',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icon/outline-lock-24px.svg')
    );
  }
}
