import { Component , Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule,isPlatformBrowser, } from '@angular/common';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { ImageCropperComponent } from 'ngx-image-cropper';
import { AuthService } from '../../../services/auth.service';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { UlogovaniKorisnikService } from '../../../services/ulogovani-korisnik.service';
import { UlogovaniKorisnik } from '../../../Model/ulogovanikorisnik';
import { MatCardModule } from '@angular/material/card';
import { NastavnikService } from '../../../services/nastavnik.service';
import { Nastavnik } from '../../../Model/nastavnik';
import { catchError, of } from 'rxjs';


@Component({
  selector: 'app-profil-edit',
  imports: [CommonModule,ImageCropperComponent,MatIconModule,FormsModule,MatFormFieldModule,MatInputModule,MatButtonModule,MatCardModule],
  templateUrl: './profil-edit.component.html',
  styleUrl: './profil-edit.component.scss'
})
export class ProfilEditComponent implements OnInit{

  selectedFile: File | null = null;
  imageChangedEvent: any = '';
  croppedImage: Blob | null = null;
  imageUrl: string | null = null;
  ulogovaniKorisnik!: UlogovaniKorisnik;
  newPassword: string = '';
  repeatPassword: string = '';
  userRoles: String[] = []
  showNewPassword: boolean = false;
  showRepeatPassword: boolean = false;
  isEditing = false;
  showPassword = false;
  isBrowser: boolean;
  nastavnik! : Nastavnik

   constructor(private ulogovaniKorisnikService: UlogovaniKorisnikService, private authService:AuthService, private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object,private nastavnikService: NastavnikService) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  ngOnInit(): void {
    this.authService.userRole$.subscribe(roles => {
      this.userRoles = roles;
    });

    const userId = this.authService.getLoggedInUserId();
    if (userId != null) {
      this.loadProfilePhoto(userId);

      this.ulogovaniKorisnikService.getById(this.authService.getLoggedInUserId()!).subscribe({
        next: res => {
          this.ulogovaniKorisnik = res;
          this.nastavnikService.getByOsobaId(res.osoba.id).subscribe({
            next: res => {
              this.nastavnik = res;
            }
          })
        },
        error: err => {
          console.log("greska pri ucitavanju korisnika", err)
        }
      })
    }
  }

  loadProfilePhoto(userId: number): void {
    const url = `http://localhost:8080/api/photos/photo/${userId}`;
    this.http.get(url, { responseType: 'blob' }).subscribe({
      next: (blob) => {
        if(blob && blob.size > 0){this.imageUrl = URL.createObjectURL(blob);}else{this.imageUrl = 'default-avatar.png'}
      }
    });
  }

  fileChangeEvent(event: any): void {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      this.imageChangedEvent = event;
    } else {
      alert('Please  select a valid image file.');
    }
  }


  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.blob!;
  }

  toggleEdit(){
    this.isEditing = !this.isEditing;
  }

  upload() {
    if (!this.croppedImage) {
      console.error('Nema isečene slike za upload!');
      return;
    }

    const blob = this.croppedImage
    const userId = this.authService.getLoggedInUserId();
    if (userId == null) {
      console.warn('User ID is null or undefined, upload aborted.');
      return;
    }
    const filename = userId.toString();
    const formData = new FormData();
    formData.append('file', blob, filename);

    this.http.post('http://localhost:8080/api/photos/upload', formData, { responseType: 'text' }).subscribe({
      next: (response) => {
        this.loadProfilePhoto(userId);
        this.imageChangedEvent = '';
        window.location.reload();
      },
      error: (err) => {
        console.error('Upload error:', err);
      }
    });
  }

  saveUpdatedInfo() {
    if (this.newPassword !== this.repeatPassword) {
      alert("Passwords do not match.");
      return;
    }
    if (this.newPassword) {
      this.ulogovaniKorisnik.lozinka = this.newPassword;
    }
    this.ulogovaniKorisnik.osoba_id = this.ulogovaniKorisnik.osoba.id
    this.ulogovaniKorisnikService.update(this.ulogovaniKorisnik.id,this.ulogovaniKorisnik).subscribe({
      next: res => {
        this.nastavnik.osoba_id = this.nastavnik.osoba.id;
        this.nastavnikService.update(this.nastavnik.id,this.nastavnik).subscribe({
          next: res => {
            this.isEditing = false;
            console.log('User info updated successfully');
          }
        })
      },
      error: err => {
        console.error('Error updating user info:', err);
      }
    });
    
  }
}
