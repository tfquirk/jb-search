import { Component } from "@angular/core";
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";

import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatDialog } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { provideNativeDateAdapter } from "@angular/material/core";

import { CitySelectComponent } from "../city-select/city-select.component";
import { Dialog } from "../dialog/dialog.component";

const departureAndDestinationCityValidator = (searchForm: FormGroup) => {
  const departureCity = searchForm.value.departureCity;
  const destinationCity = searchForm.value.destinationCity;

  if (departureCity && destinationCity) {
    if (departureCity === destinationCity) {
      searchForm.controls["departureCity"].setErrors({
        hasSameCity: true,
      });
      searchForm.controls["destinationCity"].setErrors({
        hasSameCity: true,
      });
    } else {
      searchForm.controls["departureCity"].setErrors(null);
      searchForm.controls["destinationCity"].setErrors(null);
    }
  }
};

@Component({
  selector: "app-city-search-form",
  standalone: true,
  imports: [
    CitySelectComponent,
    Dialog,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule,
    ReactiveFormsModule,
  ],
  templateUrl: "./city-search-form.component.html",
  providers: [provideNativeDateAdapter()],
  styleUrl: "./city-search-form.component.css",
})
export class CitySearchFormComponent {
  isSwapCitiesDisabled = true;
  isSubmitDisabled = true;
  minDate: Date;
  searchForm: FormGroup;

  constructor(public dialog: MatDialog) {
    this.minDate = new Date(new Date().setHours(0, 0, 0, 0));

    this.searchForm = new FormGroup({
      departureCity: new FormControl("", [Validators.required]),
      destinationCity: new FormControl("", [Validators.required]),
      startDate: new FormControl("", [Validators.required]),
      endDate: new FormControl("", [Validators.required]),
    });
  }

  private departureAndDestinationValues() {
    const departureCityValue = this.searchForm.value.departureCity;
    const destinationCityValue = this.searchForm.value.destinationCity;

    return {
      areNotEqual:
        departureCityValue &&
        destinationCityValue &&
        departureCityValue !== destinationCityValue,
      departureCityValue,
      destinationCityValue,
    };
  }

  private isFormValid() {
    this.isSubmitDisabled = this.searchForm.status === "INVALID";
    return this.searchForm.status === "VALID";
  }

  private isSwapCitiesButtonDisabled() {
    if (this.departureAndDestinationValues().areNotEqual) {
      this.isSwapCitiesDisabled = false;
    } else {
      this.isSwapCitiesDisabled = true;
    }
  }

  private openDialog() {
    this.dialog.open(Dialog, {
      data: {
        title: "Happy Jetting!",
        text: "We're searching for the very best flights for your itinerary.",
      },
    });
  }

  onChangeCity = () => {
    departureAndDestinationCityValidator(this.searchForm);
    this.isSwapCitiesButtonDisabled();
    this.isFormValid();
  };

  onChangeDate() {
    this.isFormValid();
  }

  onSwapDepartureAndDestinationValues() {
    const values = this.departureAndDestinationValues();
    if (values.areNotEqual) {
      this.searchForm.controls["departureCity"].setValue(
        values.destinationCityValue
      );
      this.searchForm.controls["destinationCity"].setValue(
        values.departureCityValue
      );
    }
  }

  onSubmit() {
    const isValid = this.isFormValid();

    if (isValid) {
      this.openDialog();
    }
  }
}
