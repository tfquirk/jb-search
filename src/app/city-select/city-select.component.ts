import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { FormGroup, ReactiveFormsModule } from "@angular/forms";

import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";

import { CitiesService } from "../../cities.service";
import { CommonModule } from "@angular/common";

interface Cities {
  name: string;
  value: string;
}

@Component({
  selector: "app-city-select",
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
  ],
  templateUrl: "./city-select.component.html",
  styleUrl: "./city-select.component.css",
})
export class CitySelectComponent implements OnInit, OnDestroy {
  @Input({ required: true }) label!: string;
  @Input({ required: true }) selectId!: string;
  @Input({ required: true }) form!: FormGroup;
  @Input({ required: true }) handleChange!: () => void;

  @Input() errorMessage: string = "";

  citiesList: Cities[] = [];
  subscription$: any;

  constructor(private citiesService: CitiesService) {}

  ngOnInit(): void {
    this.subscription$ = this.citiesService.getCities().subscribe({
      next: (cities: Cities[]) => (this.citiesList = cities),
      error: (err: Error) =>
        console.error("CitiesService Subscription Error: ", err),
      complete: () => console.log(this.label + " loaded options"),
    });
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }
}
