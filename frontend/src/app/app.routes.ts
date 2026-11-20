import { Routes } from "@angular/router";
import { StudentList } from "./student-list/student-list";
import { StudentForm } from "./student-form/student-form";
import { StudentDetail } from "./student-detail/student-detail";

export const routes: Routes = [
  { path: "", component: StudentList },
  { path: "students/new", component: StudentForm },
  { path: "students/:id/view", component: StudentDetail },
  { path: "students/:id/edit", component: StudentForm },
  { path: "**", redirectTo: "" },
];
