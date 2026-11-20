import { ComponentFixture, TestBed } from "@angular/core/testing";
import { provideHttpClient } from "@angular/common/http";
import { provideHttpClientTesting } from "@angular/common/http/testing";
import { provideRouter } from "@angular/router";

import { StudentForm } from "./student-form";

describe("StudentForm", () => {
  let component: StudentForm;
  let fixture: ComponentFixture<StudentForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentForm],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(StudentForm);
    component = fixture.componentInstance;
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
