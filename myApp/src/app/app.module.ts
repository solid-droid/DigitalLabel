import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {ZXingScannerModule} from '@zxing/ngx-scanner'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { LoginComponent } from './login/login.component';
import { EmployeeUIComponent } from './screens/employee-ui/employee-ui.component';
import { SupplierUIComponent } from './screens/supplier-ui/supplier-ui.component';
import { UserUIComponent } from './screens/user-ui/user-ui.component';
import { QrScannerComponent } from './shared/qr-scanner/qr-scanner.component';
import { QrGeneratorComponent } from './shared/qr-generator/qr-generator.component';
import { ProductStoreComponent } from './screens/product-store/product-store.component';
import { ChatRoomComponent } from './screens/chat-room/chat-room.component';
import { AnalyticsComponent } from './screens/analytics/analytics.component';
import { ProductInfoComponent } from './shared/product-info/product-info.component';
import { UserInfoComponent } from './shared/user-info/user-info.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MyProductsComponent } from './screens/my-products/my-products.component';


@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    LoginComponent,
    EmployeeUIComponent,
    SupplierUIComponent,
    UserUIComponent,
    QrScannerComponent,
    QrGeneratorComponent,
    ProductStoreComponent,
    ChatRoomComponent,
    AnalyticsComponent,
    ProductInfoComponent,
    UserInfoComponent,
    MyProductsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ZXingScannerModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
