import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { AppPaginationService } from './app-pagination.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './app-pagination.component.html',
  styleUrls: ['./app-pagination.component.css']
})
export class AppPaginationComponent implements OnChanges {

  @Input('count') count: number;
  @Input('limit') limit: number;
  @Input('activePage') activePage: number;

  @Output('changePageEvent') changePageEvent: EventEmitter<Number> = new EventEmitter();

  paginationData: any;

  constructor(
    private appPaginationService: AppPaginationService
  ) { }

  ngOnChanges() {
    this.paginationData = this.appPaginationService.getPager(
      this.count,
      this.activePage,
      this.limit);
  }

  changePage(pageno: number) {
    if (this.appPaginationService.validatePageChangeFn(this.paginationData, pageno)) {
      this.changePageEvent.emit(pageno);
      this.paginationData = this.appPaginationService.getPager(
        this.count,
        pageno,
        this.limit);
      this.activePage = pageno;
    }
  }

}
