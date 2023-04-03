import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { InicioComponent } from './inicio/inicio.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RankingScoreComponent } from './ranking-score/ranking-score.component';
import { RegisterScoreComponent } from './register-score/register-score.component';
import { ModalComponent } from './modal/modal.component';
import { InputMaskModule } from 'racoon-mask-raw';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';




@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    InicioComponent,
    RankingScoreComponent,
    RegisterScoreComponent,
    ModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgbModule.forRoot(),
    HttpClientModule,
    ReactiveFormsModule,
    InputMaskModule
  ],
  providers: [],
  entryComponents: [
    ModalComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
