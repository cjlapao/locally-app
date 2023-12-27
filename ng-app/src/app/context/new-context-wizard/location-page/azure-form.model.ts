import { FormControl } from '@angular/forms';

export interface AzureForm {
  subscriptionId: FormControl<string>;
  tenantId: FormControl<string>;
  clientId: FormControl<string>;
  clientSecret: FormControl<string>;
  storageAccountName: FormControl<string>;
  resourceGroupName: FormControl<string>;
  containerName: FormControl<string>;
}
