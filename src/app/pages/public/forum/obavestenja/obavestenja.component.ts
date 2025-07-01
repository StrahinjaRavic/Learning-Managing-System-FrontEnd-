import { Component } from '@angular/core';
import { Obavestenje } from '../../../../Model/obavestenje';
import { CommonModule } from '@angular/common';
import { OnInit } from '@angular/core';
import { inject } from '@angular/core';
import { ForumService } from '../../../../services/forum.service';
import { ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';


@Component({
  standalone: true,
  selector: 'app-forum-obavestenja',
  templateUrl: './obavestenja.component.html',
  imports: [CommonModule, MatCardModule, MatListModule, MatIconModule],
})
export class ObavestenjaComponent implements OnInit {
  obavestenja: Obavestenje[] = [];
  forumId!: number;

  private route = inject(ActivatedRoute);
  private forumService = inject(ForumService);

  ngOnInit(): void {
    this.forumId = +this.route.snapshot.paramMap.get('id')!;
    this.forumService.getObavestenjaZaForum(this.forumId).subscribe(data => {
      this.obavestenja = data;
    });
  }
}
