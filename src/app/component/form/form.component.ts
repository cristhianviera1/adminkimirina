import { Component, OnInit } from '@angular/core';
import { FormService } from '../../services/form.service';
import { Form } from '../../models/form';
import { ExporterxlsService } from '../../services/exporterxls.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  providers: [FormService]
})
export class FormComponent implements OnInit {

  page = 1;
  pageSize = 10;
  filtertext: null;
  actualDate = '';

  constructor(public formService: FormService, private excelService: ExporterxlsService) { }

  ngOnInit(): void {
    this.filtertext = null;
    this.getForms();
    this.getActualDate();
  }

  getForms() {
    this.formService.getForms().subscribe(res => {
      this.formService.forms = res['data'] as Form[];
    });
  }

  getActualDate() {
    const today = new Date();

    const date = today.getFullYear() + '-' + ( today.getMonth() + 1 ) + '-' + today.getDate();
    const hour = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();

    this.actualDate = date + ' ' + hour;
  }

  exportToExcel(): void {
    this.excelService.exportExcel(this.formService.forms, `Encuestas-${this.actualDate}`);
  }

}
