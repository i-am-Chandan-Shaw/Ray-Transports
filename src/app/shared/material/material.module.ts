import { NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule } from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatMenuModule} from '@angular/material/menu';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';


@NgModule({
    exports:[
        BrowserAnimationsModule,
        MatButtonModule,
        MatSidenavModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatSelectModule,
        MatIconModule,
        MatDividerModule,
        MatToolbarModule,
        MatDialogModule,
        MatInputModule,
        MatMenuModule,
        MatSnackBarModule,
        MatAutocompleteModule,
        MatBottomSheetModule
    ]

}) export class MaterialModule { }