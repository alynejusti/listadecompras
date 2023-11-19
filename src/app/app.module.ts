import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Importe o FormsModule para suportar Two-Way Data Binding
import { ListaComprasComponent } from './lista-compras/lista-compras.component';
import { FooterComponent } from './footer/footer.component';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    ListaComprasComponent,
    FooterComponent,
    HeaderComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule, // Adicione FormsModule aqui
  ],
  providers: [],
  bootstrap: [AppComponent], // Defina o componente inicial aqui
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
