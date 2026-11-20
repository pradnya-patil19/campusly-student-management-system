import { Request, Response, NextFunction } from "express";
import {
  createStudent,
  deleteStudent,
  getStudent,
  listStudents,
  updateStudent,
} from "../services/student.service";
import { studentSchema } from "../validators/student.validator";
const parseBody = (body: any) => studentSchema.safeParse(body);
export async function list(req: Request, res: Response) {
  const page = Math.max(1, Number(req.query.page) || 1);
  const limit = Math.min(100, Math.max(1, Number(req.query.limit) || 10));
  const year = req.query.year ? Number(req.query.year) : undefined;
  const result = await listStudents({
    page,
    limit,
    search: String(req.query.search || "").trim(),
    course: String(req.query.course || "").trim(),
    year,
  });
  res.json({
    success: true,
    data: result.rows,
    meta: {
      page,
      limit,
      total: result.count,
      totalPages: Math.ceil(result.count / limit),
    },
  });
}
export async function getOne(req: Request, res: Response) {
  const student = await getStudent(Number(req.params.id));
  if (!student) {
    res.status(404).json({ success: false, message: "Student not found" });
    return;
  }
  res.json({ success: true, data: student });
}
export async function create(req: Request, res: Response) {
  const parsed = parseBody(req.body);
  if (!parsed.success) {
    res
      .status(400)
      .json({
        success: false,
        message: "Validation failed",
        errors: parsed.error.flatten().fieldErrors,
      });
    return;
  }
  const student = await createStudent(parsed.data, req.file);
  res
    .status(201)
    .json({
      success: true,
      data: student,
      message: "Student created successfully",
    });
}
export async function update(req: Request, res: Response) {
  const parsed = parseBody(req.body);
  if (!parsed.success) {
    res
      .status(400)
      .json({
        success: false,
        message: "Validation failed",
        errors: parsed.error.flatten().fieldErrors,
      });
    return;
  }
  const student = await updateStudent(
    Number(req.params.id),
    parsed.data,
    req.file,
  );
  if (!student) {
    res.status(404).json({ success: false, message: "Student not found" });
    return;
  }
  res.json({
    success: true,
    data: student,
    message: "Student updated successfully",
  });
}
export async function remove(req: Request, res: Response) {
  const deleted = await deleteStudent(Number(req.params.id));
  if (!deleted) {
    res.status(404).json({ success: false, message: "Student not found" });
    return;
  }
  res.json({ success: true, message: "Student deleted successfully" });
}
