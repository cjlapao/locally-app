import { FormControl } from '@angular/forms';

export interface AwsForm {
  accessKeyId: FormControl<string>;
  accessKeySecret: FormControl<string>;
  region: FormControl<string>;
  bucketName: FormControl<string>;
}
