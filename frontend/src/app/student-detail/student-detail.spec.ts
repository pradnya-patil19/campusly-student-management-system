import { ComponentFixture, TestBed } from "@angular/core/testing";
import { provideHttpClient } from "@angular/common/http";
import { provideHttpClientTesting } from "@angular/common/http/testing";
import { provideRouter } from "@angular/router";

import { StudentDetail } from "./student-detail";

describe("StudentDetail", () => {
  let component: StudentDetail;
  let fixture: ComponentFixture<StudentDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentDetail],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(StudentDetail);
    component = fixture.componentInstance;
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
