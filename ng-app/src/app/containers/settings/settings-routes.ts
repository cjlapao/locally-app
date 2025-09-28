import { SettingsOverviewComponent } from './overview.component';
import { UserDetailsComponent } from './users/user-details.component';
import { UsersListComponent } from './users/users-list.component';

export const SETTING_ROUTES = [
  {
    path: '',
    component: SettingsOverviewComponent
  },
  {
    path: 'users',
    children: [
      {
        path: ':id',
        data: { tab: 'formatted' },
        component: UserDetailsComponent
      },
      {
        path: ':id/raw',
        data: { tab: 'raw' },
        component: UserDetailsComponent
      },
      {
        path: '',
        component: UsersListComponent
      }
    ]
  }
];
