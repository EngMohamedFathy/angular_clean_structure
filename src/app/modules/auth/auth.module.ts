import { NgModule } from '@angular/core';

import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';

import { SharedModule } from '../../shared/shared.module';
import { AuthRoutingModule } from './auth.routing';

import { ButtonModule, CardModule, FormModule, GridModule } from '@coreui/angular';
import {IconModule} from "@coreui/icons-angular";

@NgModule({
  declarations: [LoginComponent, RegisterComponent],
  imports: [
    AuthRoutingModule,
    SharedModule,
    ButtonModule,
    GridModule,
    IconModule,
    FormModule,
    CardModule,
  ]
})
export class AuthModule {}
