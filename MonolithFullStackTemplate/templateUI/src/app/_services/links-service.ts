import {Injectable} from '@angular/core';
import {Link} from '../shared/response/link';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class LinksService {

  constructor() {
  }

  /**
   * Determines if a ling is present.
   * @param link true if the link is defined.
   */
  public hasLink(link: Link): boolean {
    // console.log(link);

    return !_.isUndefined(link);
  }

  /**
   * Checks whether the link is for a resource template.
   * @param link The link to check
   */
  public isTemplateLink(link: Link): boolean {

    return link.href.includes('template');
  }

  /**
   * Removes the template suffix from the link
   * @param link The link to get the create url from
   */
  public getCreateUrlFromTemplateUrl(link: Link): string {

    if (this.isTemplateLink(link)) {
      const re = /template/gi;

      return link.href.replace(re, '');
    } else {

      return undefined;
    }
  }
}
