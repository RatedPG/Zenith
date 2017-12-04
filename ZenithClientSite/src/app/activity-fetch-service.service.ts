import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { ActivityCategory} from './activity-category'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

@Injectable()
export class ActivityFetchServiceService {

  private BASE_URL = "http://zenithsocore.azurewebsites.net/api/activitycategoriesapi/";
  constructor(private http: Http) { }

  getActivity(id : string): Promise<ActivityCategory> {
    return this.http.get(this.BASE_URL + id)
        .toPromise()
        .then(response => response.json() as ActivityCategory)
        .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
