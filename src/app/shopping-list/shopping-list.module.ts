import { NgModule } from '@angular/core';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { ShoppingListComponent } from './shopping-list.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ShoppingListRoutingModule } from './shopping-list-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    imports: [
        RouterModule,
        FormsModule,
        ShoppingListRoutingModule,
        SharedModule
    ],
    declarations: [
        ShoppingListComponent,
        ShoppingEditComponent
    ]
})
export class ShoppingListModule { }