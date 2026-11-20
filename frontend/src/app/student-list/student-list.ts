import { Component, OnInit, inject, OnDestroy } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterLink } from "@angular/router";
import { FormsModule } from "@angular/forms";

import { StudentService } from "../student.service";
import { Student } from "../models";

@Component({
  selector: "app-student-list",
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: "./student-list.html",
  styleUrl: "./student-list.css",
})
export class StudentList implements OnInit, OnDestroy {
  private api = inject(StudentService);

  students: Student[] = [];

  search = "";
  year = "";

  page = 1;
  total = 0;
  totalPages = 1;

  loading = false;
  error = "";

  private timer: ReturnType<typeof setTimeout> | undefined;

  ngOnInit(): void {
    this.load();
  }

  ngOnDestroy(): void {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }

  onSearch(): void {
    if (this.timer) {
      clearTimeout(this.timer);
    }

    this.timer = setTimeout(() => {
      this.page = 1;
      this.load();
    }, 300);
  }

  onFilterChange(): void {
    this.page = 1;
    this.load();
  }

  load(): void {
    this.loading = true;
    this.error = "";

    this.api
      .list({
        page: this.page,
        limit: 10,
        search: this.search,
        year: this.year ? Number(this.year) : undefined,
      })
      .subscribe({
        next: (r) => {
          this.students = r.data;
          this.total = r.meta?.total || 0;
          this.totalPages = r.meta?.totalPages || 1;
          this.loading = false;
        },
        error: (e) => {
          this.error = e.error?.message || "Unable to load students";
          this.loading = false;
        },
      });
  }

  yearLabel(year: number): string {
    const years: Record<number, string> = {
      1: "First Year",
      2: "Second Year",
      3: "Third Year",
      4: "Fourth Year",
      5: "Fifth Year",
      6: "Sixth Year",
    };

    return years[year] ?? "Unknown Year";
  }

  initials(name: string): string {
    return name
      .split(" ")
      .map((x) => x[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
  }

  changePage(delta: number): void {
    this.page += delta;
    this.load();
  }

  remove(s: Student): void {
  if (
    !confirm(
      `Delete ${s.name} (${s.admissionNumber})? This action cannot be undone.`,
    )
  ) {
    return;
  }

  this.api.delete(s.id).subscribe({
    next: () => this.load(),
    error: (e) => alert(e.error?.message || "Delete failed"),
  });
}
}
