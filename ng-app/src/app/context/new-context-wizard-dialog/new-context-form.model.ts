import { FormGroup } from "@angular/forms";
import { DomainsFormModel } from "./domains-page/domains-form.model";
import { LocationFormModel } from "./location-page/location-form.model";
import { NameFormModel } from "./name-page/name-form.model";

export interface NewContextFormModel {
  name: FormGroup<NameFormModel>;
  location: FormGroup<LocationFormModel>;
  domains: FormGroup<DomainsFormModel>;
}
