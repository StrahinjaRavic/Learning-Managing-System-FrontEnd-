import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatumPredmetaService } from '../../../services/datum-predmeta.service';
import { DatumPredmeta } from '../../../Model/datumpredmeta';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { PregledDatumaEditComponent } from './pregled-datuma-edit/pregled-datuma-edit.component';
import { MatDialog } from '@angular/material/dialog';
import { Rok } from '../../../Model/rok';
import { RokService } from '../../../services/rok.service';
import { DateAdapter, MAT_DATE_FORMATS, MAT_NATIVE_DATE_FORMATS, NativeDateAdapter } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { PolaganjeService } from '../../../services/polaganje.service';
import { PolaganjeCreateDTO } from '../../../Model/DTO/PolaganjeCreateDTO';
import { PregledDatumaCreateComponent } from './pregled-datuma-create/pregled-datuma-create.component';

@Component({
  selector: 'app-pregled-roka',
  imports: [CommonModule,MatFormFieldModule,MatCardModule,MatMenuModule,MatDatepickerModule,MatIconModule,MatButtonModule,MatCheckboxModule,FormsModule,MatTableModule,MatInputModule],
  providers: [ {provide: DateAdapter, useClass: NativeDateAdapter}, {provide: MAT_DATE_FORMATS, useValue: MAT_NATIVE_DATE_FORMATS}, ],
  templateUrl: './pregled-roka.component.html',
  styleUrl: './pregled-roka.component.scss'
})
export class PregledRokaComponent implements OnInit{

  rokId!: number
  rok! : Rok
  datumiPredmeta: DatumPredmeta[] = [];
  filteredDatumiPredmeta: DatumPredmeta[] = [];
  displayedColumns: string[] = ['rok', 'predmet', 'datum', 'akcije'];
  minDate!: Date;
  maxDate!: Date;
  filter = {
    rok: '',
    realizacija: '',
    datum: null,
    obrisano: false
  };
  
  constructor(private route: ActivatedRoute,private datumPredmetaService: DatumPredmetaService,private dialog: MatDialog,private rokService: RokService, private polaganjeService: PolaganjeService){}

  ngOnInit(): void {
    this.rokId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadData();
  }

  loadData(){
    this.datumPredmetaService.getByRokId(this.rokId).subscribe({
      next: res => {
        this.datumiPredmeta = res;
        this.filteredDatumiPredmeta = this.datumiPredmeta
      }
    })

    this.rokService.getById(this.rokId).subscribe({
      next: res => {
        this.rok = res
        this.minDate = new Date(res.pocetak)
        this.maxDate = new Date(res.kraj)
      }
    })
  }
  dodaj(){
    const dialogRef = this.dialog.open(PregledDatumaCreateComponent, {
      width: '700px',
      data: {
        datumPredmeta:{
          rok: null,
          realizacijaPredmeta: null,
          datum:null
        },
        title: 'Dodaj Datum',
        rok: this.rok
      },
    });

    dialogRef.afterClosed().subscribe((result: {datumPredmeta: DatumPredmeta , evaluacijaId: number}) => {
          if (result) {
            console.log(result.datumPredmeta)
            this.datumPredmetaService.create(result.datumPredmeta).subscribe({
              next: created => { 
                this.filteredDatumiPredmeta.push(created)
                this.filteredDatumiPredmeta = [...this.filteredDatumiPredmeta];

                const novoPolaganje: PolaganjeCreateDTO= {
                  evaluacijaZnanja_id:result.evaluacijaId,
                  rok_id: this.rokId,
                  datum: new Date(created.datum).toISOString()
                }
                console.log(novoPolaganje)

                this.polaganjeService.create(novoPolaganje).subscribe({
                  error: err => {
                    console.error('Greška pri kreiranju:', err);
                  }
                })
              },
              error: err => {
                console.error('Greška pri kreiranju:', err);
              }
            });
          }
        });
  }

  izmeni(datumPredmeta : DatumPredmeta){
    const dialogRef = this.dialog.open(PregledDatumaEditComponent, {
      width: '700px',
      data: { datumPredmeta:{...datumPredmeta},title: 'Izmeni Rok',rok: this.rok }
    });

    dialogRef.afterClosed().subscribe((result: DatumPredmeta | undefined) => {
      if (result) {
        console.log("result:",result)
        this.datumPredmetaService.update(result.id!, result).subscribe({
          next: updated => {
                
            const index = this.filteredDatumiPredmeta.findIndex(p => p.id === updated.id);
            if (index !== -1) {
              this.filteredDatumiPredmeta[index] = updated;
              this.filteredDatumiPredmeta = [...this.filteredDatumiPredmeta];
            }
          },
          error: err => {
            console.error('Greška pri ažuriranju:', err);
          }
        });
      }
    });
  }

  obrisi(){

  }

  vrati(){

  }

  applyFilter(){

    this.filteredDatumiPredmeta = this.datumiPredmeta.filter(datum => {
      const rokMatch = this.filter.rok ? datum.rok.naziv.toLowerCase().includes(this.filter.rok.toLowerCase()) : true;
      const predmetMatch = this.filter.realizacija ? datum.realizacijaPredmeta.predmet.naziv.toLowerCase().includes(this.filter.realizacija.toLowerCase()) : true;
      const obrisanoMatch = this.filter.obrisano || !datum.obrisano;

      let datumMatch = true;
      if (this.filter.datum) {
        const filterDate = new Date(this.filter.datum).setHours(0, 0, 0, 0);
        const datumDate = new Date(datum.datum).setHours(0, 0, 0, 0);
        datumMatch = datumDate == filterDate;
      }

      return rokMatch && predmetMatch && datumMatch && obrisanoMatch;
    });
  }
}
