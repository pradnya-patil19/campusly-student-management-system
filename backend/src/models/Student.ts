import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/database";
export type Gender = "Male" | "Female" | "Other" | "Prefer not to say";
export interface StudentAttributes {
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
  createdAt?: Date;
  updatedAt?: Date;
}
type StudentCreation = Optional<
  StudentAttributes,
  | "id"
  | "admissionNumber"
  | "photoUrl"
  | "photoPublicId"
  | "createdAt"
  | "updatedAt"
>;
export class Student
  extends Model<StudentAttributes, StudentCreation>
  implements StudentAttributes
{
  declare id: number;
  declare admissionNumber: string;
  declare name: string;
  declare course: string;
  declare year: number;
  declare dob: string;
  declare email: string;
  declare mobileNumber: string;
  declare gender: Gender;
  declare address: string;
  declare photoUrl: string | null;
  declare photoPublicId: string | null;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}
Student.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    admissionNumber: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
      field: "admission_number",
    },
    name: { type: DataTypes.STRING(120), allowNull: false },
    course: { type: DataTypes.STRING(120), allowNull: false },
    year: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      validate: { min: 1, max: 10 },
    },
    dob: { type: DataTypes.DATEONLY, allowNull: false },
    email: {
      type: DataTypes.STRING(254),
      allowNull: false,
      unique: true,
      validate: { isEmail: true },
    },
    mobileNumber: {
      type: DataTypes.STRING(20),
      allowNull: false,
      field: "mobile_number",
    },
    gender: {
      type: DataTypes.ENUM("Male", "Female", "Other", "Prefer not to say"),
      allowNull: false,
    },
    address: { type: DataTypes.TEXT, allowNull: false },
    photoUrl: { type: DataTypes.TEXT, allowNull: true, field: "photo_url" },
    photoPublicId: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: "photo_public_id",
    },
  },
  { sequelize, tableName: "students", underscored: true, timestamps: true },
);
