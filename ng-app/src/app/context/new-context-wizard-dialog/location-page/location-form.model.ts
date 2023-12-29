import { FormControl, FormGroup } from '@angular/forms';
import { LocationLocallyForm } from './locally-form.component';
import { AwsForm } from './aws-form.model';
import { AzureForm } from './azure-form.model';

export interface LocationFormModel {
  type: FormControl<string>;
  locally: FormGroup<LocationLocallyForm>;
  aws: FormGroup<AwsForm>;
  azure: FormGroup<AzureForm>;
}
