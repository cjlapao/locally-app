import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';

import { UserService } from '../services/api/user.service';
import { AvatarComponent } from '../shared/components/avatar.component';
import { LoadStatePipe } from '../shared/pipes/load-state.pipe';

@Component({
  selector: 'app-user-info-panel',
  imports: [LoadStatePipe, AsyncPipe, AvatarComponent],
  template: `
    @if (userInfo$ | loadState | async; as userInfoWithloadState) {
      @if (userInfoWithloadState.loading) {
        <p>Loading...</p>
      } @else {
        @if (userInfoWithloadState.error) {
          <p>Error loading user information</p>
        } @else {
          @if (userInfoWithloadState.value; as userInfo) {
            <div class="flex flex-row items-center gap-[8px]">
              <app-avatar [name]="userInfo.name" [size]="40"></app-avatar>
              <div class="flex flex-col items-start gap-[0px]">
                <div class="text-base text-locally-caption-text">
                  {{ userInfo.name }}
                </div>
                <div class="text-sm text-locally-caption-text">
                  {{ userInfo.roles.join(', ') }}
                </div>
              </div>
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
