import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { DropdownDirective } from './dropdown.directive';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        LoadingSpinnerComponent,
        DropdownDirective
    ],
    exports: [
        CommonModule,
        LoadingSpinnerComponent,
        DropdownDirective
    ]
})
export class SharedModule { }