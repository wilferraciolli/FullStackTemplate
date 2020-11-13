import { Component, OnInit } from '@angular/core';
import {PersonService} from '../person.service';
import {PersonAdapter} from '../person.adapter';
import {NotificationService} from '../../shared/notification.service';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss']
})
export class PersonComponent implements OnInit {

  constructor(private personService: PersonService,
              private adapter: PersonAdapter,
              private notificationService: NotificationService) {
  }

   ngOnInit(): void {
  }

}
