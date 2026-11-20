import { Op } from "sequelize";
import { Student } from "../models/Student";
import { StudentInput } from "../validators/student.validator";
import cloudinary, { cloudinaryConfigured } from "../config/cloudinary";
import { Readable } from "stream";

async function uploadPhoto(
  file?: Express.Multer.File,
): Promise<{ url: string; publicId: string } | null> {
  if (!file) return null;
  if (!cloudinaryConfigured) {
    const error = new Error(
      "Photo upload is not configured. Add Cloudinary credentials to backend/.env",
    );
    (error as any).status = 503;
    throw error;
  }
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "student-management/students", resource_type: "image" },
      (error, result) => {
        if (error || !result)
          return reject(error || new Error("Image upload failed"));
        resolve({ url: result.secure_url, publicId: result.public_id });
      },
    );
    Readable.from(file.buffer).pipe(stream);
  });
}
async function removePhoto(publicId?: string | null) {
  if (publicId && cloudinaryConfigured)
    await cloudinary.uploader.destroy(publicId).catch(() => undefined);
}
async function nextAdmissionNumber(): Promise<string> {
  const [rows] = await Student.sequelize!.query(
    "SELECT nextval('student_admission_seq') AS value",
  );
  const value = Number((rows as any[])[0].value);
  return `STU-${new Date().getFullYear()}-${String(value).padStart(5, "0")}`;
}
export async function listStudents(params: {
  page: number;
  limit: number;
  search?: string;
  course?: string;
  year?: number;
}) {
  const where: any = {};
  if (params.search)
    where[Op.or] = [
      { name: { [Op.iLike]: `%${params.search}%` } },
      { email: { [Op.iLike]: `%${params.search}%` } },
      { admissionNumber: { [Op.iLike]: `%${params.search}%` } },
      { mobileNumber: { [Op.iLike]: `%${params.search}%` } },
    ];
  if (params.course) where.course = { [Op.iLike]: `%${params.course}%` };
  if (params.year) where.year = params.year;
  const { rows, count } = await Student.findAndCountAll({
    where,
    limit: params.limit,
    offset: (params.page - 1) * params.limit,
    order: [["createdAt", "DESC"]],
  });
  return { rows, count };
}
export const getStudent = (id: number) => Student.findByPk(id);
export async function createStudent(
  input: StudentInput,
  file?: Express.Multer.File,
) {
  const photo = await uploadPhoto(file);
  try {
    return await Student.create({
      ...input,
      admissionNumber: await nextAdmissionNumber(),
      photoUrl: photo?.url || null,
      photoPublicId: photo?.publicId || null,
    });
  } catch (error) {
    await removePhoto(photo?.publicId);
    throw error;
  }
}
export async function updateStudent(
  id: number,
  input: StudentInput,
  file?: Express.Multer.File,
) {
  const student = await Student.findByPk(id);
  if (!student) return null;
  const photo = await uploadPhoto(file);
  const oldPublicId = student.photoPublicId;
  try {
    await student.update({
      ...input,
      ...(photo ? { photoUrl: photo.url, photoPublicId: photo.publicId } : {}),
    });
    if (photo && oldPublicId) await removePhoto(oldPublicId);
    return student;
  } catch (error) {
    await removePhoto(photo?.publicId);
    throw error;
  }
}
export async function deleteStudent(id: number) {
  const student = await Student.findByPk(id);
  if (!student) return false;
  const publicId = student.photoPublicId;
  await student.destroy();
  await removePhoto(publicId);
  return true;
}
