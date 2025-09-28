import { AsyncPipe, JsonPipe } from '@angular/common';
import { Component, computed, inject, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { UserService } from '../../../services/api/user.service';
import { LoadStatePipe } from '../../../shared/pipes/load-state.pipe';

@Component({
  selector: 'app-user-details',
  imports: [AsyncPipe, LoadStatePipe, RouterLink, JsonPipe, RouterLinkActive],
  template: `
    <div class="flex gap-[8px] text-sm text-locally-caption-text">
      <a routerLink="/" class="ly-link">Home</a> /
      <a routerLink="/settings" class="ly-link">Settings</a> /
      <a routerLink="/settings/users" class="ly-link">Users</a>
    </div>

    @if (user$() | loadState | async; as user) {
      @if (user.loading) {
        <p>Loading...</p>
      }

      @if (user.error) {
        <div class="ly-alert ly-alert--error">
          Unable to load the user details.
        </div>
      } @else {
        <div class="flex flex-row items-center gap-[16px]">
          <div class="flex items-center gap-[8px]">
            <button
              class="ly-button ly-button--text"
              routerLink="/settings/users"
            >
              <i class="i-locally-back"></i>
            </button>
            <div class="text-2xl font-medium">{{ user.value?.name }}</div>
          </div>
          <div class="ml-auto flex flex-row gap-[8px]">
            <button class="ly-button">
              <i class="i-locally-edit"></i>Edit
            </button>
          </div>
        </div>
        <div class="flex flex-1 flex-col gap-[24px]">
          <div class="ly-tabs">
            <div
              class="ly-tabs__item"
              routerLink="/settings/users/{{ user.value?.id }}"
              routerLinkActive="ly-tabs__item--selected"
              [routerLinkActiveOptions]="{ exact: true }"
              tabindex="0"
            >
              Formatted
            </div>
            <div
              class="ly-tabs__item"
              routerLink="/settings/users/{{ user.value?.id }}/raw"
              routerLinkActive="ly-tabs__item--selected"
              [routerLinkActiveOptions]="{ exact: true }"
              tabindex="0"
            >
              Raw
            </div>
          </div>

          @if (tab() === 'formatted') {
            <table class="ly-table w-full border-t border-locally-border">
              <thead>
                <tr>
                  <th class="w-1/4">Property</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Status</td>
                  <td>
                    {{ user.value?.['status'] }}
                  </td>
                </tr>
                <tr>
                  <td>Slug</td>
                  <td>
                    {{ user.value?.['slug'] }}
                  </td>
                </tr>
                <tr>
                  <td>User name</td>
                  <td>
                    {{ user.value?.['username'] }}
                  </td>
                </tr>
                <tr>
                  <td>Password</td>
                  <td>
                    {{ user.value?.['password'] }}
                  </td>
                </tr>
                <tr>
                  <td>Email</td>
                  <td>
                    {{ user.value?.['email'] }}
                  </td>
                </tr>
              </tbody>
            </table>

            <div class="flex flex-col gap-[8px]">
              <div class="text-lg font-medium">Roles</div>

              <table class="ly-table w-full border-t border-locally-border">
                <thead>
                  <tr>
                    <th class="w-1/4">Name</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  @for (role of user.value?.['roles']; track role.id) {
                    <tr>
                      <td>
                        {{ role.name }}
                      </td>
                      <td>
                        {{ role.description }}
                      </td>
                    </tr>
                  }
                </tbody>
              </table>
            </div>

            <div class="flex flex-col gap-[8px]">
              <div class="text-lg font-medium">Claims</div>

              <table class="ly-table w-full border-t border-locally-border">
                <thead>
                  <tr>
                    <th>Slug</th>
                  </tr>
                </thead>
                <tbody>
                  @for (claim of user.value?.['claims']; track claim.id) {
                    <tr>
                      <td>{{ claim.slug }}</td>
                    </tr>
                  }
                </tbody>
              </table>
            </div>
          }

          @if (tab() === 'raw') {
            <textarea
              class="ly-form-control h-full w-full"
              [value]="user.value | json"
              readonly
            ></textarea>
          }
          <!--
          <table class="ly-table w-full">
            <thead>
              <tr>
                <th class="w-full">Name</th>
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
                    <button class="ly-button ly-button--text">
                      <i class="ly-icon-more"></i>
                    </button>
                  </td>
                </tr>
              }
            </tbody>
          </table> -->
        </div>
      }
    }
  `,
  host: {
    class: 'flex w-full flex-1 flex-col gap-[16px]'
  }
})
export class UserDetailsComponent {
  usersService = inject(UserService);

  id = input.required<string>();
  tab = input.required<string>();

  user$ = computed(() => this.usersService.getUser(this.id()));
}
