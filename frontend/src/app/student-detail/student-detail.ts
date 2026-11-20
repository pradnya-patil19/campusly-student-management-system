import { CommonModule } from "@angular/common";
import { Component, OnInit, inject } from "@angular/core";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { StudentService } from "../student.service";
import { Student } from "../models";

@Component({
  selector: "app-student-detail",
  imports: [CommonModule, RouterLink],
  templateUrl: "./student-detail.html",
  styleUrl: "./student-detail.css",
})
export class StudentDetail implements OnInit {
  private route = inject(ActivatedRoute);
  private api = inject(StudentService);

  student: Student | null = null;
  loading = true;
  error = "";

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get("id"));

    if (!Number.isInteger(id) || id <= 0) {
      this.error = "Invalid student ID.";
      this.loading = false;
      return;
    }

    this.api.get(id).subscribe({
      next: (response) => {
        this.student = response.data;
        this.loading = false;
      },
      error: (err) => {
        this.error = err.status === 404
          ? "Student not found."
          : "Unable to load student details.";
        this.loading = false;
      },
    });
  }
}