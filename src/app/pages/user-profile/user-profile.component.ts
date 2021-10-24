import { DataService } from './../../services/data.service';
import { Component, OnInit } from '@angular/core';
import { pluck } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  providers: [DataService]
})
export class UserProfileComponent implements OnInit {

  collectionSize = 10;
  errorMessages = {
    USER_NOT_FOUND: 'Opps! Unable to locate the requested profile.',
    REPO_ERROR: 'Opps! some error occured while loading the repositories.',
    NO_REPO_IN_ACCOUNT: 'No repositories found.',
    PROFILE_ERROR: 'User not found, please make sure username is correct.'
  }
  uiState$ = this.dataService.dataLoadStatus$;
  profileData$ = this.dataService.profileDetail$;
  repoData$ = this.dataService.repoLDetails$;
  pagiantion$ = this.dataService.paginationStatus$;
  githubUsername = ''
  constructor(private dataService: DataService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.pipe(pluck('id')).subscribe({
      next: (username: string) => {
        this.githubUsername = username;
        this.getProfileData();
        this.setMaxPage();
      },
      error: () => { this.dataService.setLoadingState('PROFILE', 'ERROR') }
    })

  }

  setMaxPage() {
    this.profileData$.pipe(pluck('public_repos')).subscribe({
      next: (publicRepo) => {
        this.collectionSize = publicRepo <= 100 ? publicRepo : 100;
      },
    });
  }

  getProfileData() {
    this.dataService.fetchProfileDetails(this.githubUsername);
  }

  getProfileRepo(pageNumber: number = 1) {
    this.dataService.fetchAssociatedRepo(pageNumber, this.githubUsername);
  }


}
