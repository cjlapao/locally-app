import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { UserService } from '../../../services/api/user.service';
import { LoadStatePipe } from '../../../shared/pipes/load-state.pipe';

@Component({
  selector: 'app-users-list',
  imports: [AsyncPipe, LoadStatePipe, RouterLink],
  template: `
    <div class="flex gap-[8px] text-sm text-locally-caption-text">
      <a routerLink="/" class="ly-link">Home</a> /
      <a routerLink="/settings" class="ly-link">Settings</a>
    </div>

    <div class="text-2xl font-medium">Users</div>
    <div class="flex flex-row gap-2">
      <button class="ly-button ly-button--text">
        <i class="i-locally-add"></i>New
      </button>
    </div>
    <div>
      @if (users$ | loadState | async; as users) {
        @if (users.loading) {
          <p>Loading...</p>
        }

        @if (users.error) {
          <div class="ly-alert ly-alert--error">
            Unable to load the users list.
          </div>
        } @else {
          <table class="ly-table w-full">
            <thead>
              <tr>
                <th class="w-full">Name</th>
                <th class="w-full">Status</th>
                <th class="w-12"></th>
              </tr>
            </thead>
            <tbody>
              @for (user of users.value?.data; track user.id) {
                <tr>
                  <td>
                    <a
                      class="ly-link"
                      routerLink="/settings/users/{{ user.id }}"
                      ><i
                        class="ly-icon-document relative top-[.15em] mr-1.5"
                      ></i
                      >{{ user.name }}</a
                    >
                  </td>
                  <td>
                    {{ user.status }}
                  </td>
                  <td>
                    <button class="ly-button ly-button--text">
                      <i class="ly-icon-more"></i>
                    </button>
                  </td>
                </tr>
              }
            </tbody>
          </table>
        }
      }
    </div>
  `,
  host: {
    class: 'flex w-full flex-col gap-[20px]'
  }
})
export class UsersListComponent {
  usersService = inject(UserService);

  users$ = this.usersService.getUsers();
}
