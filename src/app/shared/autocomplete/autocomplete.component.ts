import { Component, OnInit, Input, Output ,EventEmitter,OnChanges} from '@angular/core';

@Component({
  selector: "app-autocomplete",
  templateUrl: "./autocomplete.component.html",
  styleUrls: ["./autocomplete.component.scss"],
})
export class AutocompleteComponent implements OnInit {
  @Input()
  keyword: string;
  @Input()
  data: Array<any> = [];
  @Input()
  placeHolder: string;
  @Input()
  cityNumber: number;
  @Input()
  initialValue: string;
  @Output()
  selectionEvent: EventEmitter<any> = new EventEmitter();
  @Output()
  changeEvent: EventEmitter<any> = new EventEmitter();
  constructor() {}

  ngOnInit() {}
  ngOnChanges() {
  }
  selectEvent(item) {
    let obj={...item}
    obj["cityNumber"] = this.cityNumber || 0;

    this.selectionEvent.emit(obj);
  }
  onChangeSearch(event) {
    this.changeEvent.emit(this.cityNumber);
  }
  inputCleared(event) {
    this.changeEvent.emit(this.cityNumber);
  }
}


