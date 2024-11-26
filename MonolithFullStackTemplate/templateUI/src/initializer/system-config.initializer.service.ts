import {inject, Injectable} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";


@Injectable({
  providedIn: 'root'
})
export class SystemConfigInitializerService {
  private _translateService: TranslateService = inject(TranslateService);

  constructor() {
  }

  public async initSystemConfiguration(): Promise<void> {
    await console.log('Add server config here');
  }
}
