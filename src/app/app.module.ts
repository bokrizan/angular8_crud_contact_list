import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AllContactsComponent } from "./all-contacts/all-contacts.component";
import { FavoritesComponent } from "./favorites/favorites.component";
import { AddNewComponent } from "./add-new/add-new.component";
import { DetailsComponent } from "./details/details.component";
import { HeaderTitleComponent } from "./header-title/header-title.component";
import { SearchPipe } from "./search.pipe";
import { EditComponent } from "./edit/edit.component";

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ToastrModule } from "ngx-toastr";

@NgModule({
  declarations: [AppComponent, AllContactsComponent, FavoritesComponent, AddNewComponent, DetailsComponent, HeaderTitleComponent, SearchPipe, EditComponent],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: "toast-bottom-right",
      preventDuplicates: true
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
