import {Component, inject, Input, OnInit} from '@angular/core';
import {NgIf} from "@angular/common";
import {PersonPhotoResponse} from "../../../people/person-photo/person-photo.response";
import { HttpClient } from "@angular/common/http";
import {Observable} from "rxjs";

const DEFAULT_EMPTY_IMAGE: string = '';

@Component({
  selector: 'app-photo-thumbnail',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './photo-thumbnail.component.html',
  styleUrls: ['./photo-thumbnail.component.scss']
})
export class PhotoThumbnailComponent implements OnInit {

  @Input({ required: true })
  public imageUrl: string | undefined = '';

  @Input({ required: false })
  public createUpdateUrl: string | undefined | null;

  private httpClient: HttpClient = inject(HttpClient);

  public addImageUrl: string | undefined | null;
  public cursorType: string = 'default';

  private _selectedFile: File | null = null;
  private _downloadedFile!: Blob | undefined;

  async ngOnInit(): Promise<void> {
    this.addImageUrl = this.createUpdateUrl;
    this.cursorType = this.addImageUrl ? 'pointer' : 'default';
    this._downloadedFile = await this._downloadFile();
  }

  public onFileSelected(event: any): void {
    this._selectedFile = event.target.files[0] as File;

    if (this.addImageUrl) {
      this._uploadFile<PersonPhotoResponse>(this.addImageUrl, this._selectedFile)
        .subscribe((response: PersonPhotoResponse) => {
            if (response._data.personPhoto.links.downloadPersonPhoto) {
              // TODO publish output here
              this.imageUrl = response._data.personPhoto.links.downloadPersonPhoto.href;
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

  public getImageBackgroundUrl(): string {
    console.log('Got image')
    if (this._downloadedFile) {
      const reader: FileReader = new FileReader();
      reader.readAsDataURL(this._downloadedFile);

      reader.onloadend = () => {
        const imageUrl: string = reader.result as string;

        return `url(${imageUrl})`;
      }
    }

    console.log('returned default image')
    return DEFAULT_EMPTY_IMAGE;
  }

  private async _downloadFile(): Promise<Blob | undefined> {
    const headers = { 'Content-Type': 'image/png' };

    console.log('download fiel ', this.imageUrl)
    if (this.imageUrl) {
      try{
        console.log('trying to get image ')
        return await this.httpClient.get(this.imageUrl,
          { headers, responseType: 'blob' })
          .toPromise();
      }      catch (error){
        return undefined;
      }


      // await this.httpClient.get(this.imageUrl,
      //   { headers, responseType: 'blob' })
      //   .subscribe((data: Blob) => {
      //     console.log('received blob ', data)
      //
      //     return data;
      //   });
    }

    return undefined;
  }
}
