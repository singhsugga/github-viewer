import { DebugElement } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { repoDetails } from './sample-testing -data';
import { RepoCardComponent } from './repo-card.component';

describe('RepoCardComponent', () => {
  let component: RepoCardComponent;
  let fixture: ComponentFixture<RepoCardComponent>;
  let el : DebugElement;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RepoCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RepoCardComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should render the repo name in template', () => {
    component.repoDetails = repoDetails;
    fixture.detectChanges();
    expect(el.query(By.css('h4')).nativeElement.textContent).toBe(repoDetails.name);
  });
  it('should render the repo description in template', () => {
    component.repoDetails = repoDetails;
    fixture.detectChanges();
    expect(el.query(By.css('.description')).nativeElement.textContent).toBe(repoDetails.description);
  });
  it('should render the repo topics', () => {
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      let topics = fixture.debugElement.queryAll(By.css('.topic'));
      expect(topics[0].nativeElement).toContain(repoDetails.topics[0])
      expect(topics[1].nativeElement).toContain(repoDetails.topics[1])
  })
  });


});
