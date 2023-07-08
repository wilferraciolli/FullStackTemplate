import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-mat-error',
  templateUrl: './mat-error.component.html',
  styleUrls: ['./mat-error.component.scss']
})
export class MatErrorComponent {
@Input({required: true})
  public errorLabel: string | null = null;

}
