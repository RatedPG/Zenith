import { Component, OnInit} from '@angular/core';
import { Event } from '../event';
import { EventFetchService } from '../event-fetch.service';
import { ActivityCategory } from '../activity-category';
import { ActivityFetchServiceService } from '../activity-fetch-service.service';
import { Data } from '@angular/router/src/config';
import { forEach } from '@angular/router/src/utils/collection';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  
  events : Event[];
  displayEvents: Event[];
  lastMonday : Date;
  nextSunday : Date;
  referDate  : Date;
  isLoading  : boolean;
  constructor(
    private eventFetchService : EventFetchService,
    private activityFetchService : ActivityFetchServiceService,
  ) { 
    this.displayEvents = [];
    this.isLoading = true;
    this.getDisplayEvents = this.getDisplayEvents.bind(this);
    this.parseEvents = this.parseEvents.bind(this);
    this.getActivty = this.getActivty.bind(this);
  }

  getMondaySunday(){
    var temp = new Date(this.referDate);

    var lastMonday = temp.getDate() - temp.getDay() + 1;
    if(temp.getDay() === 0){
      this.lastMonday = new Date(temp.setDate(lastMonday - 7));
      this.nextSunday = new Date(temp.setDate(this.lastMonday.getDate() + 6));
    } else {
      this.lastMonday = new Date(temp.setDate(lastMonday));
      this.nextSunday = new Date(temp.setDate(this.lastMonday.getDate() + 6));
    }
  }

  parseEvents(){
    for(let element of this.events){
      var compFromDate = new Date(element.eventFromDate);
      var compToDate = new Date(element.eventToDate)
      if(compFromDate > this.lastMonday && compToDate < this.nextSunday){
        this.activityFetchService.getActivity(element.activityCategoryId)
          .then(ac => element.activityCategory = ac)
          .then(ac => this.displayEvents = [...this.displayEvents, element]);
      }
    }
  }

  async getDisplayEvents(){
    this.isLoading = true;
    this.displayEvents = [];
    await this.parseEvents();
    this.isLoading = false;

    /*
    this.events.forEach(function(element){
      var compFromDate = new Date(element.eventFromDate);
      var compToDate = new Date(element.eventToDate)
      if(compFromDate > this.lastMonday && compToDate < this.nextSunday){
        this.activityFetchService.getActivity(element.activityCategoryId)
          .then(ac => element.activityCategory = ac)
          .then(ac => this.displayEvents = [...this.displayEvents, element]);
      }
    }.bind(this));
    */
  }

  getActivty(id: number) : ActivityCategory {
    var activity
    this.activityFetchService.getActivity(id)
    .then(ac => activity = ac);
    return activity
  }
 
  nextWeek(){
    this.referDate = new Date(this.referDate.setDate(this.referDate.getDate() + 7));
    this.getMondaySunday();
    this.getDisplayEvents();
    this.isLoading = false;
  }

  prevWeek(){
    this.referDate = new Date(this.referDate.setDate(this.referDate.getDate() - 7));
    this.getMondaySunday();
    this.getDisplayEvents();
  }
 getEvents(): void {
    this.eventFetchService.getEvents()
      .then(events => this.events = events)
      .then(events => this.getDisplayEvents());
  }
  ngOnInit() {
    this.getEvents();
    this.referDate = new Date();
    this.getMondaySunday();
  }
}
