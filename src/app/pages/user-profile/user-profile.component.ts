import { DataService } from './../../services/data.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { pluck } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  providers: [DataService]
})
export class UserProfileComponent implements OnInit,OnDestroy {
  /**
   * Count of repositories associated with a user
   */
  allRepoCount = 0;
  /**
   * Error messages for different error conditions
   */
  errorMessages = {
    USER_NOT_FOUND: 'Opps! Unable to locate the requested profile.',
    REPO_ERROR: 'Opps! some error occured while loading the repositories.',
    NO_REPO_IN_ACCOUNT: 'No repositories found.',
    PROFILE_ERROR: 'User not found, please make sure username is correct.'
  }

  /**
   * local variable for state observables
   */
  uiState$ = this.dataService.dataLoadStatus$;
  profileData$ = this.dataService.profileDetail$;
  repoData$ = this.dataService.repoDetails$;
  pagiantion$ = this.dataService.paginationStatus$;
  profileSubscription !:Subscription;
  /**
   * Github username fetched from route
   */
  githubUsername = ''
  constructor(private dataService: DataService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.pipe(pluck('id')).subscribe({
      next: (username: string) => {
        this.githubUsername = username;
        this.getProfileData();
        this.setMaxRepoSize();
      },
      error: () => { this.dataService.setLoadingState('PROFILE', 'ERROR') }
    })

  }
  /**
   * Sets max repo size to 100 if the repo is more than 100 in account asper requirement we are only supposed to show at max 100 repo
   */
  setMaxRepoSize() {
    this.profileSubscription = this.profileData$.pipe(pluck('public_repos')).subscribe({
      next: (publicRepo) => {
        this.allRepoCount = publicRepo <= 100 ? publicRepo : 100;
      },
    });
  }
  /**
   *  initiates profile data fetch
   */
  getProfileData() {
    this.dataService.fetchProfileDetails(this.githubUsername);
  }
  /**
   * Gets repo associated with profile
   * @param [pageNumber]
   */
  getProfileRepo(pageNumber: number = 1) {
    this.dataService.fetchAssociatedRepo(pageNumber, this.githubUsername);
  }

  ngOnDestroy(){
    this.profileSubscription.unsubscribe();
  }


}
