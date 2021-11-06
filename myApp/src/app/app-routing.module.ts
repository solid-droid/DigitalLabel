import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import {MainComponent} from './main/main.component'
import { EmployeeUIComponent } from './screens/employee-ui/employee-ui.component';
import { SupplierUIComponent } from './screens/supplier-ui/supplier-ui.component';
import { UserUIComponent } from './screens/user-ui/user-ui.component';
import { QrScannerComponent } from './shared/qr-scanner/qr-scanner.component';

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'login', component: LoginComponent },
  { path: 'employee', component: EmployeeUIComponent },
  { path: 'supplier', component: SupplierUIComponent },
  { path: 'user', component: UserUIComponent },
  { path:'scanner',component: QrScannerComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes), ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
