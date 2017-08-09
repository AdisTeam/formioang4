
/**
FORMAT : import { name } from '<imports>';
Name should match that exported in the package exported from!
Check readme.MD for instructions in node_modules under the respective names
**/

//Declare @angular Modules
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
 import { FormsModule, ReactiveFormsModule } from '@angular/forms';
 import {FormControl,FormGroup} from '@angular/forms';
// import { HttpModule, JsonpModule } from '@angular/http';
// import { RouterModule, Routes } from '@angular/router';
 import { BrowserModule } from '@angular/platform-browser';

//Declare other Modules
import { RoutingModule } from './routing.module';
import { SharedModule } from './shared/shared.module';
import {DndModule} from 'ng2-dnd';
//import {DynamicComponentModule} from 'angular2-dynamic-component/index';
import {DynamicHTMLModule,DynamicComponentModule} from 'ng-dynamic';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import * as Fuse from 'fuse.js'
// Declare Services
import { CatService } from './services/cat.service';
import { UserService } from './services/user.service';
import { AuthService } from './services/auth.service';
import { AuthGuardLogin } from './services/auth-guard-login.service';
import { AuthGuardAdmin } from './services/auth-guard-admin.service';
//myservs
import { FormShowService } from './form-show/form-show.service';


// Declare Components :
import { AppComponent } from './app.component';
import { CatsComponent } from './cats/cats.component';
import { AboutComponent } from './about/about.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { AccountComponent } from './account/account.component';
import { AdminComponent } from './admin/admin.component';
import { NotFoundComponent } from './not-found/not-found.component';
//mycomps
import { WidgetComponent } from './widget/widget.component';
import { WidgetEditorComponent } from './widget-editor/widget-editor.component';
import { FormShowComponent } from './form-show/form-show.component';
import { FormBuilderComponent } from './form-builder/form-builder.component';
import { DataViewerComponent } from './data-viewer/data-viewer.component';



@NgModule({
  declarations: [  // Components in here
    AppComponent,
    CatsComponent,
    AboutComponent,
    RegisterComponent,
    LoginComponent,
    LogoutComponent,
    AccountComponent,
    AdminComponent,
    NotFoundComponent,  //mycomps
    WidgetComponent,
    WidgetEditorComponent,
    FormShowComponent,
    FormBuilderComponent,
    DataViewerComponent

  ],
  imports: [     // Modules in here
    RoutingModule,
    BrowserModule,
     FormsModule,
    SharedModule,
    ReactiveFormsModule,
    DndModule.forRoot(),
//    DynamicComponentModule
    Ng2SmartTableModule,
    DynamicHTMLModule.forRoot({
  components: [
  ]
}),
DynamicComponentModule.forRoot({
  imports: [SharedModule]
}),
  ],
  providers: [  // Services in here
    AuthService,
    AuthGuardLogin,
    AuthGuardAdmin,
    CatService,
    UserService,
    FormShowService //myservs

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  entryComponents:[

  ],  bootstrap: [AppComponent]
})

export class AppModule { }
