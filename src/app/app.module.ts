import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { TodoListComponent } from './todo-list/todo-list.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatIcon} from "@angular/material/icon";
import {MatFabButton} from "@angular/material/button";
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {AppStrikethroughDirective} from "./shared/Directive/appStrikethrough/app-strikethrough.directive";
import {MatSelect} from "@angular/material/select";


@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent,
    AppStrikethroughDirective,
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
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
