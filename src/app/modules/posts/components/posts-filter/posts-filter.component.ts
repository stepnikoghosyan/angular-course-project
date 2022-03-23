import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

// services
import { UsersService } from '../../../users/services/users.service';

// models
import { AppRoutes } from '@shared/models/app-routes.model';
import { IUser } from '../../../users/models/user.model';
import { IPostsQueryParams } from '../../models/posts-query-params.model';

// helpers
import { getFullRoute } from '@shared/utils/get-full-route.helper';
import { AppStateService } from '../../../../services/app-state.service';

@Component({
  selector: 'app-posts-filter',
  templateUrl: './posts-filter.component.html',
  styleUrls: ['./posts-filter.component.scss'],
})
export class PostsFilterComponent implements OnInit, OnDestroy {
  public queryParams: IPostsQueryParams = {
    userID: undefined,
    title: undefined,
  };

  public readonly createPostRoute = getFullRoute(AppRoutes.CreatePost);

  private currentUser: IUser | null = null;

  public usersList: IUser[] | null = null;

  private subscriptions$ = new Subject<void>();

  constructor(
    private readonly usersService: UsersService,
    private readonly appStateService: AppStateService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
  ) {
  }

  ngOnInit() {
    this.getUsers();

    this.appStateService.getCurrentUser()
      .pipe(takeUntil(this.subscriptions$))
      .subscribe(val => this.currentUser = val);

    this.subscribeToQueryParams();
  }

  private getUsers(): void {
    this.usersService.getUsers({ showAll: true, excludeSelf: true })
      .pipe(takeUntil(this.subscriptions$))
      .subscribe({
        next: (response) => {
          this.usersList = [
            ...(!!this.currentUser && [{ ...this.currentUser, fullName: '@Me' }] || []),
            ...response.results,
          ];
        },
        error: () => this.usersList = [],
      });
  }

  private subscribeToQueryParams(): void {
    this.route.queryParamMap
      .pipe(takeUntil(this.subscriptions$))
      .subscribe({
        next: (params) => {
          this.queryParams = {
            userID: params.has('userID') && +params.get('userID')! || undefined,
            title: params.get('title') || '',
          };
        },
      });
  }

  public onTitleSearch(value?: string): void {
    this.queryParams.title = value;
    this.updateQueryParams();
  }

  public onUserSelect(userId: number): void {
    this.queryParams.userID = userId || undefined;
    this.updateQueryParams();
  }

  private updateQueryParams(): void {
    this.router.navigate(['./'], {
      queryParams: this.queryParams,
      relativeTo: this.route,
    });
  }

  ngOnDestroy() {
    this.subscriptions$.next();
    this.subscriptions$.complete();
  }
}
