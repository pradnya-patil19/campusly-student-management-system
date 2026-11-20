export type Gender = "Male" | "Female" | "Other" | "Prefer not to say";
export interface Student {
  id: number;
  admissionNumber: string;
  name: string;
  course: string;
  year: number;
  dob: string;
  email: string;
  mobileNumber: string;
  gender: Gender;
  address: string;
  photoUrl: string | null;
  photoPublicId: string | null;
  createdAt: string;
  updatedAt: string;
}
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  meta?: { page: number; limit: number; total: number; totalPages: number };
}
export interface StudentPayload {
  name: string;
  course: string;
  year: number;
  dob: string;
  email: string;
  mobileNumber: string;
  gender: Gender;
  address: string;
}
