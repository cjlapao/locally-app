import { AsyncPipe, JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';

import { UserService } from '../services/api/user.service';
import { LoadStatePipe } from '../shared/pipes/load-state.pipe';

@Component({
  selector: 'app-user-info-panel',
  imports: [LoadStatePipe, AsyncPipe],
  template: `
    @if (userInfo$ | loadState | async; as userInfoWithloadState) {
      @if (userInfoWithloadState.loading) {
        <p>Loading...</p>
      } @else {
        @if (userInfoWithloadState.error) {
          <p>Error loading user information</p>
        } @else {
          @if (userInfoWithloadState.value; as userInfo) {
            <div>
              <h2>User Information</h2>
              <p>Id: {{ userInfo.id }}</p>
              <p>Name: {{ userInfo.name }}</p>
            </div>
          }
        }
      }
    }
  `
})
export class UserInfoPanelComponent {
  userService = inject(UserService);

  userInfo$ = this.userService.getSelfUser();
}
