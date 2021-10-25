import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { userDetails } from './sample-testing-data';

import { UserDetailsComponent } from './user-details.component';

describe('UserDetailsComponent', () => {
  let component: UserDetailsComponent;
  let fixture: ComponentFixture<UserDetailsComponent>;
  let el : DebugElement;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDetailsComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the profile picture in template', () => {
    component.userDetails = userDetails;
    fixture.detectChanges();
    expect(el.query(By.css('img')).nativeElement.src).toBe(userDetails.avatar_url);
   });

  it('should render the profile bio in template', () => {
    component.userDetails = userDetails;
    fixture.detectChanges();
    expect(el.query(By.css('.bio')).nativeElement.textContent).toBe(userDetails.bio);
  });

  it('should render the User name in template', () => {
    component.userDetails = userDetails;
    fixture.detectChanges();
    expect(el.query(By.css('h1')).nativeElement.textContent).toBe(userDetails.name);
  });
  it('should render the location in template', () => {
    component.userDetails = userDetails;
    fixture.detectChanges();
    expect(el.query(By.css('h5 > span')).nativeElement.textContent).toBe(userDetails.location);
  });
  it('should render twitter url in template', () => {
    component.userDetails = userDetails;
    fixture.detectChanges();
    expect(el.query(By.css('.twitter')).nativeElement.textContent).toBe('twitter.com/'+userDetails.twitter_username);
  });
  it('should map src with twitter profile', () => {
    component.userDetails = userDetails;
    fixture.detectChanges();
    expect(el.query(By.css('.twitter')).nativeElement.href).toBe('https://twitter.com/'+userDetails.twitter_username);
  });
  it('should render github url in template', () => {
    component.userDetails = userDetails;
    fixture.detectChanges();
    expect(el.query(By.css('.github')).nativeElement.textContent).toBe(userDetails.html_url);
  });
  it('should map src with github profile', () => {
    component.userDetails = userDetails;
    fixture.detectChanges();
    expect(el.query(By.css('.github')).nativeElement.href).toBe(userDetails.html_url);
  });
});
