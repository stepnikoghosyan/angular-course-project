import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, Subject, takeUntil } from 'rxjs';

// services
import { AppStateService } from '../../services/app-state.service';

@Component({
  templateUrl: './posts.component.html',
})
export class PostsComponent implements OnInit, OnDestroy {

  public isCurrentUser = false;
  private subscriptions$ = new Subject<void>();

  constructor(
    private readonly appStateService: AppStateService,
    private readonly route: ActivatedRoute,
  ) {
  }

  ngOnInit() {
    combineLatest([
      this.appStateService.getCurrentUser(),
      this.route.queryParamMap,
    ])
      .pipe(takeUntil(this.subscriptions$))
      .subscribe(([currentUser, queryParamMap]) => {
        let currentUserId: number | null = null;
        if (!!currentUser) {
          currentUserId = currentUser.id;
        }

        let selectedUserID: number | null = null;
        if (queryParamMap.has('userID') && +queryParamMap.get('userID')! > 0) {
          selectedUserID = +queryParamMap.get('userID')!;
        }

        this.isCurrentUser = currentUserId === selectedUserID;
      });
  }

  ngOnDestroy() {
    this.subscriptions$.next();
    this.subscriptions$.complete();
  }
}
