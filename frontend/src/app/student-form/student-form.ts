import { Component, OnInit, OnDestroy, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";

import { StudentService } from "../student.service";
import { Gender, StudentPayload } from "../models";

@Component({
  selector: "app-student-form",
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: "./student-form.html",
  styleUrl: "./student-form.css",
})
export class StudentForm implements OnInit, OnDestroy {
  private fb = inject(FormBuilder);
  private api = inject(StudentService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  id = 0;
  isEdit = false;
  saving = false;
  error = "";

  photo?: File;
  preview: string | null = null;
  private previewObjectUrl: string | null = null;

  today = new Date().toISOString().slice(0, 10);

  form = this.fb.group({
    name: ["", [Validators.required, Validators.minLength(2), Validators.maxLength(120)]],
    course: ["", [Validators.required, Validators.minLength(2), Validators.maxLength(120)]],
    year: [null as number | null, [Validators.required, Validators.min(1), Validators.max(6)]],
    dob: ["", [Validators.required]],
    email: ["", [Validators.required, Validators.email, Validators.maxLength(254)]],
    mobileNumber: ["", [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]],
    gender: ["" as Gender | "", [Validators.required]],
    address: ["", [Validators.required, Validators.minLength(5), Validators.maxLength(1000)]],
  });

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get("id"));
    this.isEdit = !!this.id;

    if (this.isEdit) {
      this.api.get(this.id).subscribe({
        next: (r) => {
          this.form.patchValue(r.data);
          this.preview = r.data.photoUrl;
        },
        error: (e) => {
          this.error = e.error?.message || "Unable to load student";
        },
      });
    }
  }

  ngOnDestroy(): void {
    if (this.previewObjectUrl) {
      URL.revokeObjectURL(this.previewObjectUrl);
    }
  }

  invalid(k: string): boolean {
    const c = this.form.get(k);
    return !!c && (c.touched || c.dirty) && c.invalid;
  }

  onMobileInput(event: Event): void {
    const input = event.target as HTMLInputElement;

    const digitsOnly = input.value.replace(/\D/g, "").slice(0, 10);

    input.value = digitsOnly;
    this.form.controls.mobileNumber.setValue(digitsOnly);
  }

  onFile(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];

    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      this.error = "Photo must be 5 MB or smaller";
      return;
    }

    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      this.error = "Only JPG, PNG and WEBP files are supported";
      return;
    }

    if (this.previewObjectUrl) {
      URL.revokeObjectURL(this.previewObjectUrl);
    }

    this.photo = file;
    this.previewObjectUrl = URL.createObjectURL(file);
    this.preview = this.previewObjectUrl;
    this.error = "";
  }

  submit(): void {
    this.form.markAllAsTouched();

    if (this.form.invalid || this.saving) return;

    this.saving = true;
    this.error = "";

    const value = this.form.getRawValue();

    const payload = {
      ...value,
      year: Number(value.year),
    } as StudentPayload;

    const request = this.isEdit
      ? this.api.update(this.id, payload, this.photo)
      : this.api.create(payload, this.photo);

    request.subscribe({
      next: () => this.router.navigate(["/"]),
      error: (e) => {
        this.error = e.error?.message || "Unable to save student";
        this.saving = false;
      },
    });
  }
}
