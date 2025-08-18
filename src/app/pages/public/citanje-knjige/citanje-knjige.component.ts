import { Component } from '@angular/core';
import { Udzbenik } from '../../../Model/udzbenik';
import { Stranica } from '../../../Model/stranica';
import { ActivatedRoute } from '@angular/router';
import { UdzbenikService } from '../../../services/udzbenik.service';
import { StranicaService } from '../../../services/stranica.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { StranicaCreateDTO } from '../../../Model/DTO/StranicaCreateDTO';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-citanje-knjige',
  imports: [CommonModule,MatCardModule,MatButtonModule],
  templateUrl: './citanje-knjige.component.html',
  styleUrl: './citanje-knjige.component.scss'
})
export class CitanjeKnjigeComponent {
  udzbenik!: Udzbenik;
  stranice: Stranica[] = [];
  currentPage = 0;
  udzbenik_id = 0;
  userRoles: string [] = [];

  constructor(
    private route: ActivatedRoute,
    private udzbenikService: UdzbenikService,
    private stranicaService: StranicaService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.udzbenik_id = Number(this.route.snapshot.paramMap.get('id'));

    this.udzbenikService.getById(this.udzbenik_id).subscribe({
      next: data => {
        this.udzbenik = data
      },
      error: err => console.error(err)
    });

    this.authService.userRole$.subscribe(roles => {
      this.userRoles = roles;
    });

    this.loadStranice();
  }

  loadStranice(){
    this.stranicaService.getByUdzbenikId(this.udzbenik_id).subscribe({
      next: data => {
        this.stranice = data.sort((a, b) => a.brojStranice - b.brojStranice)
      },
      error: err => console.error(err)
    });
  }

  prevPage() {
    if (this.currentPage > 0) this.currentPage--;
  }

  nextPage() {
    if (this.currentPage < this.stranice.length - 1) this.currentPage++;
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;

    const file = input.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(reader.result as string, "application/xml");
      const straniceNodes = xmlDoc.getElementsByTagName("stranica");

      let straniceToUpload: StranicaCreateDTO[] = [];
      for (let i = 0; i < straniceNodes.length; i++) {
        const brojStranice = Number(
          straniceNodes[i].getElementsByTagName("brojStranice")[0].textContent
        );
        const sadrzaj =
          straniceNodes[i].getElementsByTagName("sadrzaj")[0].textContent || "";

        const exists = this.stranice.some(s => s.brojStranice === brojStranice);

        if (!exists) {
          straniceToUpload.push({
            brojStranice,
            sadrzaj,
            udzbenik_id: this.udzbenik.id!
          });
        } else {
          console.warn(`Stranica ${brojStranice} već postoji i neće biti dodata.`);
        }
      }

      straniceToUpload.forEach(str => {
        this.stranicaService.create(str).subscribe({
          next: () => this.loadStranice(),
          error: err => console.error("Error saving stranica:", err)
        });
      });
    };

    reader.readAsText(file);
  }

}
