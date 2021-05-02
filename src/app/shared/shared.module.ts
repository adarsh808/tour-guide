import { NgModule } from "@angular/core";
import { AutocompleteComponent } from './autocomplete/autocomplete.component';
import { AutocompleteLibModule } from "angular-ng-autocomplete";


@NgModule({
    declarations:[AutocompleteComponent],
    imports: [AutocompleteLibModule],
  exports: [AutocompleteComponent],
})
export class SharedModule {}
