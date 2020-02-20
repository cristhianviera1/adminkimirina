import { Component, OnInit } from '@angular/core';
import { FormularioService } from 'src/app/services/formulario.service';
import { Formulario } from 'src/app/models/formulario';
import { ExportadorxlsService } from 'src/app/services/exportadorxls.service';
import Swal from 'sweetalert2';
import { CompileShallowModuleMetadata } from '@angular/compiler';



@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css'],
  providers: [FormularioService]
})
export class FormularioComponent implements OnInit {

  constructor(private formularioService: FormularioService, private excelService: ExportadorxlsService) { }

  ngOnInit() {
    this.getFormularios();
  }

  getFormularios() {
    this.formularioService.getFormularios().subscribe(res => {
      console.log(res);
      this.formularioService.formularios = res as Formulario[];
      console.log("esto tengo"+ this.formularioService.formularios);
    });
  }

  exportarToExcel(): void {
    this.excelService.exportarExcel(this.formularioService.formularios, 'formularios');
  }

}
