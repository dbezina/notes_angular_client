import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import {MaterialModule} from "./material-module";

@NgModule({
  imports: [
    AppModule,
    ServerModule,
    MaterialModule,
  ],
  bootstrap: [AppComponent],
})
export class AppServerModule {}
