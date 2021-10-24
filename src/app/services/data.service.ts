import { environment } from './../../environments/environment';
import { Pagination } from './../models/pagination';
import { UiState } from './../models/ui-state';
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  initialUIState: UiState = {
    profileDetailState: 'LOADING',
    repoDetailState: 'LOADING',
  };
  initialPagination: Pagination = {
    previousPage: 1,
    currentPage: 1,
    perPage: 10,
  };

  constructor(private http: HttpClient) { }

  private loadingState: BehaviorSubject<UiState> = new BehaviorSubject<UiState>(
    this.initialUIState
  );
  dataLoadStatus$: Observable<UiState> = this.loadingState.asObservable();

  private paginationState: BehaviorSubject<Pagination> =
    new BehaviorSubject<Pagination>(this.initialPagination);
  paginationStatus$: Observable<Pagination> =
    this.paginationState.asObservable();

  private profile: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  profileDetail$: Observable<any> = this.profile.asObservable();

  private reposList: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  repoLDetails$: Observable<any> = this.reposList.asObservable();

  fetchProfileDetails(username: string) {
    this.http.get(environment.BASE_ENDPOINT + `users/${username}`).subscribe({
      next: (res: any) => {
        this.profile.next(res);
        this.fetchAssociatedRepo(1, username);
        this.setLoadingState('PROFILE', 'LOADED');
      },
      error: (err: HttpErrorResponse) => {
        if (err?.status === 404) {
          this.setLoadingState('PROFILE', 'NOT_FOUND');
        } else {
          this.setLoadingState('PROFILE', 'ERROR');
        }

      },
    });
  }

  fetchAssociatedRepo(pageNumber: number = 1, userName: string) {
    this.setLoadingState('REPO', 'LOADING');
    let params = new HttpParams();
    params = params.append('per_page', this.initialPagination.perPage);
    params = params.append('page', pageNumber);
    this.http
      .get(environment.BASE_ENDPOINT + `users/${userName}/repos`, { params })
      .subscribe({
        next: (response) => {
          this.reposList.next(response);
          this.setLoadingState('REPO', 'LOADED');
          this.setPage(pageNumber);
        },
        error: (err: HttpErrorResponse) => {
          this.setLoadingState('REPO', 'ERROR');
        },
      });
  }

  setLoadingState(
    stateType: 'PROFILE' | 'REPO',
    value: 'LOADED' | 'LOADING' | 'ERROR' | 'NOT_FOUND'
  ) {
    const currentState: UiState = { ...this.loadingState.getValue() };
    switch (stateType) {
      case 'PROFILE': {
        currentState.profileDetailState = value;
        break;
      }
      case 'REPO': {
        currentState.repoDetailState = value;
        break;
      }
    }
    console.log('State', currentState);
    this.loadingState.next(currentState);
  }

  setPage(pageNumber: number) {
    this.paginationState.next({
      ...this.paginationState.getValue(),
      ...{
        previousPage: this.paginationState.getValue().currentPage,
        currentPage: pageNumber,
      },
    });
  }
}
