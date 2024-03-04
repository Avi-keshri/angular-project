import { NgModule } from '@angular/core';
import { AuthComponent } from './auth.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    imports: [
        RouterModule,
        FormsModule,
        AuthRoutingModule,
        SharedModule
    ],
    declarations: [
        AuthComponent,
    ]
})
export class AuthModule { }