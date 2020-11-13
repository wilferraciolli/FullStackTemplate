import {Authentication} from './authentication';

export class LogInPayload {

  authentication: Authentication;

  constructor(authentication: Authentication) {
    this.authentication = authentication;
  }
}
