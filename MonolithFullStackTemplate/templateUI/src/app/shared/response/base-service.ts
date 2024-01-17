import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { PersonPhotoResponse } from '../../people/person-photo/person-photo.response';
import {environment} from "../../../environments/environment";

@Injectable()
export class HttpBaseService {

  private headers: HttpHeaders = new HttpHeaders();

  constructor(
    private router: Router,
    private httpClient: HttpClient) {
    this.headers = this.headers.set('Content-Type', 'application/json');
    this.headers = this.headers.set('Accept', 'application/json');
  }

  getAll<T>(url: string): Observable<T> {

    return this.httpClient.get<T>(environment.baseUrl + url)
      .pipe(retry(1),
        catchError(this.handleError));
  }

  public async getAllPromise<T>(url: string): Promise<any> {
    const response =  await this.httpClient.get<T>(environment.baseUrl + url)
      .toPromise();

    return response;
  }

  getSingle<T>(url: string) {

    return this.httpClient.get<T>(environment.baseUrl + url)
      .pipe(
        // tap(() => console.log(`fetched by url = ${url}`)),
        retry(1),
        catchError(this.handleError));
  }


  // Promise using then
  // getById<T>(url: string): Promise<any> {
  //
  //   return this.httpClient.get<T>(url)
  //     .toPromise()
  //     .then(data => {
  //       const d = data;
  //       console.log('The value from promise is', d);
  //       return data;
  //     });
  // }

  async getById<T>(url: string): Promise<any> {

    const data = await this.httpClient.get<T>(environment.baseUrl + url)
      .toPromise();

    return data;
  }

  async getTemplateAsync<T>(url: string): Promise<any> {

    const data = await this.httpClient.get<T>(environment.baseUrl + url)
      .toPromise();

    return data;
  }

  getTemplate<T>(url: string) {

    return this.httpClient.get<T>(environment.baseUrl + url)
      .pipe(retry(1),
        catchError(this.handleError));
  }

  add<T>(url: string, payloadToAdd: T) {
    return this.httpClient.post<T>(environment.baseUrl + url, payloadToAdd, { headers: this.headers });
  }

  uploadFile<T>(url: string, file: File): Observable<T>  {
    const formData: FormData = new FormData();

    formData.append('file', file, file.name);

    return this.httpClient.post<T>(environment.baseUrl + url, formData);

    // this.httpClient.post(url, formData).subscribe(
    //   (response) => {
    //     console.log('Response', response);
    //   },
    //   (error) => {
    //     console.error('Error', error);
    //   }
    // );



    // const req:HttpRequest<any> = new HttpRequest('POST', url, formData, {
    //   reportProgress: true,
    //   responseType: 'json'
    // });
    //
    // return this.httpClient.request(req);
  }

  async downloadFile<T>(url: string): Promise<any> {
    const imageBlob: Blob | undefined = await this.httpClient.get(environment.baseUrl + url, { responseType: 'blob' })
      .toPromise();

    return imageBlob;
  }

  update<T>(url: string, payloadToUpdate: T) {
    return this.httpClient.put<T>(environment.baseUrl + url, payloadToUpdate, { headers: this.headers });
  }

  delete(url: string) {
    return this.httpClient.delete(environment.baseUrl + url);
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

  reloadCurrentRoute(): void {

    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

}
