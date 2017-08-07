//@angular components
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Components
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

//services
import { AuthGuardLogin } from './services/auth-guard-login.service';
import { AuthGuardAdmin } from './services/auth-guard-admin.service';
import {FormShowService} from './form-show/form-show.service';
/**

STEPS EXPLAINED AT server/routes.ts

INSTRUCTIONS :

define routes in Routes below.
DO NOT USE / in PATH ! However you DO so in redirectTo
use canActivate:['<service>'] to enable services upon launch

redirections are initiated in  the respective components

For Server side processing refer server/routes.ts
**/
const routes: Routes = [
  { path: '', component: FormBuilderComponent },
  { path: 'show', component: FormShowComponent },
  { path: 'cats', component: CatsComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'account', component: AccountComponent, canActivate: [AuthGuardLogin] },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuardAdmin] },
  { path: 'notfound', component: NotFoundComponent },
  { path: 'fetch', component: DataViewerComponent },
  { path: '**', redirectTo: '/notfound' },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class RoutingModule {}
