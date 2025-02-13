import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { TodoListComponent } from './todo-list/todo-list.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatFabButton} from "@angular/material/button";
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";

import {MatSelect} from "@angular/material/select";
import { DeleteModalComponent } from './component/delete-modal/delete-modal.component';
import {MatDialogActions, MatDialogClose, MatDialogContent} from "@angular/material/dialog";
import { TitleCasePipe } from './shared/pipe/titleCase/title-case.pipe';
import { StrikeThroughDirective } from './shared/directive/strikeThrough/strike-through.directive';


@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent,
    DeleteModalComponent,
    TitleCasePipe,
    StrikeThroughDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // TransactionTestModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatIcon,
    MatFabButton,
    MatFormField,
    MatInput,
    MatSelect,
    MatDialogActions,
    MatDialogContent,
    MatButton,
    MatDialogClose,
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
