import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RedirectCommand,
  ResolveFn,
  Router,
  RouterStateSnapshot
} from '@angular/router';

import { HealthService } from '../services/api/health.service';

export const healthResolver: ResolveFn<boolean> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const router = inject(Router);
  const healthService = inject(HealthService);
  return healthService.isHealthy()
    ? true
    : new RedirectCommand(router.parseUrl('/connection-error'), {
        skipLocationChange: true
      });
};
