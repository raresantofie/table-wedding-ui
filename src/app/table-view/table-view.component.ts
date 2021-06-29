import { Component, OnInit } from '@angular/core';
import {AggregatedTableDto, Table, TableCount} from '../model';
import {TableService} from '../table.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.css']
})
export class TableViewComponent implements OnInit {

  closeResult = '';
  state = 'search';
  table: Table = {
    name: '',
    checked: false,
    tableNumber: 0
  };

  count: TableCount = {
    toArrive: 0,
    totalArrived: 0,
    totalInvites: 0
  };

  apiTable: Table[] = [];
  currentRow: Table = this.table;
  isPresent = false;
  nameSearch = '';
  aggregatedTables: AggregatedTableDto[] = [];

  constructor(private tableService: TableService, private modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.tableService.getCount().subscribe(data => {
      this.count = data;
    });
    console.log(this.count);
  }

  changeState(ev: any): void {
    this.state = ev.target.value;
    this.currentRow = {
      name: '',
      checked: false,
      tableNumber: 0
    };
    this.nameSearch = '';
    this.isPresent = false;
    this.apiTable = [];

    if (this.state === 'view-all') {
      this.getAll();
    }

    if (this.state === 'view-not-arrived') {
      this.getAllNotPresent();
    }

    if (this.state === 'statistics') {
      this.tableService.getCount().subscribe(data => {
        this.count = data;
        console.log('count is', this.count);
      });
    }
  }

  searchByName(ev: any): void {
    this.nameSearch = ev.target.value;
    this.tableService.getByName(this.nameSearch).subscribe( data => {
      this.apiTable = data;
    });
  }

  save(): void {
    this.tableService.create(this.table);
  }

  open(content: any, t: Table): void {
    this.currentRow = t;
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.tableService.update({id: this.currentRow.id, checked: this.isPresent}).subscribe((res) => {
        this.tableService.getByName(this.nameSearch).subscribe( data => {
          this.apiTable = data;
        });
      });
    }, (reason) => {
      this.closeResult = `Dismissed `;
    });
  }

  update(ev: any): void {
    this.currentRow.checked = ev.target.value;
  }

  getAll(): void {
    this.tableService.getAll().subscribe(data => {
      this.aggregatedTables = data;
    }, error => {
    });
  }

  getAllNotPresent(): void {
    this.tableService.getNotArrived().subscribe(data => {
      this.aggregatedTables = data;
    }, error => {
      console.log(error);
    });
  }
}
