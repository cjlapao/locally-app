import { FormControl } from '@angular/forms';

export interface LoginFormModel {
  username: FormControl<string | null>;
  password: FormControl<string | null>;
}
