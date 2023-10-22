import {Component, inject, Input, OnInit, signal, WritableSignal} from '@angular/core';
import {NgIf} from "@angular/common";
import {HttpClient} from "@angular/common/http";
import {PersonPhotoResponse} from "../../../people/person-photo/person-photo.response";
import {Observable} from "rxjs";

const defaultImageUrl: string = 'assets/images/user-profile-placeholder.jpg';

@Component({
  selector: 'app-person-photo',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './person-photo.component.html',
  styleUrls: ['./person-photo.component.scss']
})
export class PersonPhotoComponent implements OnInit {
  @Input({ required: false })
  public label: string = 'Upload File';

  @Input({ required: true })
  public imageUrl: string | undefined = undefined;

  @Input({ required: false })
  public createUpdateUrl: string | undefined | null;

  private httpClient: HttpClient = inject(HttpClient);

  public addImageUrl: string | undefined | null;
  public resolvedImageUrl: WritableSignal<string> = signal(defaultImageUrl);
  public loading: WritableSignal<boolean> = signal(false);

  private _selectedFile: File | null = null;
  private _downloadedFile!: Blob | undefined;

  async ngOnInit(): Promise<void> {
    this.addImageUrl = this.createUpdateUrl;
    await this._resolveImageUrl(this.imageUrl);
  }

  public onFileSelected(event: any): void {
    event.preventDefault();
    event.stopPropagation();

    this._selectedFile = event.target.files[0] as File;
    this.resolvedImageUrl.set(defaultImageUrl);

    if (this.addImageUrl && this._selectedFile) {
      this._uploadFile<PersonPhotoResponse>(this.addImageUrl, this._selectedFile)
        .subscribe((response: PersonPhotoResponse) => {
            if (response._data.personPhoto.links.downloadPersonPhoto) {
              this.resolvedImageUrl.set(URL.createObjectURL(this._selectedFile as Blob));
              // TODO publish output here
              // this.imageUrl = response._data.personPhoto.links.downloadPersonPhoto.href;
            }
          }, (error) => {
            console.error('Error uploading file:', error);
          }
        );
    }
  }

  private _uploadFile<T>(url: string, file: File): Observable<T> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);

    return this.httpClient.post<T>(url, formData);
  }

  private async _resolveImageUrl(imageUrlToFetch: string | undefined): Promise<void> {
    this.loading.set(true);

    console.log('refetch image ', imageUrlToFetch)
    if (imageUrlToFetch) {
      await this._fetchImage(imageUrlToFetch);
    }

    this.loading.set(false);
  }

  private async _fetchImage(imageUrl: string): Promise<void> {
    try {
      const imageBlob: Blob | undefined = await this.httpClient.get(
        imageUrl,
        { responseType: 'blob' })
        .toPromise();

      if (imageBlob) {
        this.resolvedImageUrl.set(URL.createObjectURL(imageBlob));
      }
    } catch (error) {
      console.error('Error fetching image:', error);
    }
  }
}
