import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

// services
import { UsersService } from './services/users.service';

// models
import { IUser } from './models/user.model';

@Component({
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, OnDestroy {
  public users: IUser[] | null = null;

  public searchValue = '';

  private subscriptions$ = new Subject<void>();

  constructor(
    private readonly usersService: UsersService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
  ) {
  }

  ngOnInit() {
    this.subscribeToQueryParams();
  }

  private subscribeToQueryParams(): void {
    this.route.queryParamMap
      .pipe(takeUntil(this.subscriptions$))
      .subscribe((val) => {
        this.searchValue = val.get('search') || '';
        this.getUsers();
      });
  }

  private getUsers(): void {
    this.usersService.getUsers({ showAll: true, search: this.searchValue })
      .pipe(takeUntil(this.subscriptions$))
      .subscribe({
        next: (response) => this.users = response.results,
        error: () => this.users = [],
      });
  }

  public onSearch(value?: string): void {
    this.router.navigate(['./'], {
      relativeTo: this.route,
      queryParams: {
        search: value,
      },
    });
  }

  ngOnDestroy() {
    this.subscriptions$.next();
    this.subscriptions$.complete();
  }
}
