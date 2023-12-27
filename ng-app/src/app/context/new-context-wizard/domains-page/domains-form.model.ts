import { FormControl } from '@angular/forms';

export interface DomainsFormModel {
  domainName: FormControl<string>;
  subDomainName: FormControl<string>;
}
