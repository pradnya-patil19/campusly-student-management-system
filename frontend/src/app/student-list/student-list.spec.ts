import { ComponentFixture, TestBed } from "@angular/core/testing";
import { provideHttpClient } from "@angular/common/http";
import { provideHttpClientTesting } from "@angular/common/http/testing";
import { provideRouter } from "@angular/router";

import { StudentList } from "./student-list";

describe("StudentList", () => {
  let component: StudentList;
  let fixture: ComponentFixture<StudentList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentList],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(StudentList);
    component = fixture.componentInstance;
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
