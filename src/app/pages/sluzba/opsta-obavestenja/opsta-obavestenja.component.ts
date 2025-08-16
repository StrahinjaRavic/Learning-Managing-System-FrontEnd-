import { Component } from '@angular/core';
import { Obavestenje } from '../../../Model/obavestenje';
import { ObavestenjeService } from '../../../services/obavestenje.service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ObavestenjeEditComponent } from './obavestenje-edit/obavestenje-edit.component';
import { MatDialog } from '@angular/material/dialog';
import { ObavestenjeSaveDTO } from '../../../Model/DTO/obavestenje-save-dto.model';
import { ForumService } from '../../../services/forum.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-opsta-obavestenja',
  imports: [CommonModule,MatIconModule,MatCardModule,MatButtonModule],
  templateUrl: './opsta-obavestenja.component.html',
  styleUrl: './opsta-obavestenja.component.scss'
})
export class OpstaObavestenjaComponent {

  userRoles: string [] = [];
  obavestenja: Obavestenje[] = [];
  constructor(public auth: AuthService, private obavestenjeService: ObavestenjeService, private dialog: MatDialog){}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(){
    this.obavestenjeService.getByForumId(1).subscribe({
      next: res => {
        this.obavestenja = res;
      }
    })

    this.auth.userRole$.subscribe(roles => {
      this.userRoles = roles;
    });
  }

  obrisi(id: number) {
    if (confirm("Da li ste sigurni da želite da obrišete obaveštenje?")) {
      this.obavestenjeService.delete(id).subscribe(() => this.loadData());
    }
  }

  vrati(id: number) {
    this.obavestenjeService.restore(id).subscribe(() => {
      this.loadData();
    });
  }

  dodaj(){
    const dialogRef = this.dialog.open(ObavestenjeEditComponent, {
      width: '800px',
      data: {obavestenje: {
        naslov: '',
        tekstObavestenja: '',
        forum_id: 1
      },
        titles: 'Kreiraj Obavestenje',
      }
    });

    dialogRef.afterClosed().subscribe((result: ObavestenjeSaveDTO | undefined) => {
          if (result) {
            this.obavestenjeService.create(result).subscribe({
              next: updated => { 
                this.obavestenja.push(updated)
                this.obavestenja = [...this.obavestenja];
              },
              error: err => {
                console.error('Greška pri kreiranju:', err);
              }
            });
          }
        });

  }

  izmeni(obavestenje: Obavestenje){
    const dialogRef = this.dialog.open(ObavestenjeEditComponent, {
      width: '800px',
      data: {obavestenje:{...obavestenje},
        titles: 'Izmeni Obavestenje'
      }
    });

    dialogRef.afterClosed().subscribe((result: Obavestenje | undefined) => {
          if (result) {
            this.obavestenjeService.update(result.id!, result).subscribe({
              next: updated => {
                      
                const index = this.obavestenja.findIndex(p => p.id === updated.id);
                if (index !== -1) {
                  this.obavestenja[index] = updated;
                  this.obavestenja = [...this.obavestenja];
                }
              },
                error: err => {
                  console.error('Greška pri ažuriranju:', err);
                }
            });
          }
        });

  }
}
