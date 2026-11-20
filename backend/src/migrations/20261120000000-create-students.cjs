module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(
      "CREATE SEQUENCE IF NOT EXISTS student_admission_seq START 1",
    );
    await queryInterface.createTable("students", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      admission_number: {
        type: Sequelize.STRING(20),
        allowNull: false,
        unique: true,
      },
      name: { type: Sequelize.STRING(120), allowNull: false },
      course: { type: Sequelize.STRING(120), allowNull: false },
      year: { type: Sequelize.SMALLINT, allowNull: false },
      dob: { type: Sequelize.DATEONLY, allowNull: false },
      email: { type: Sequelize.STRING(254), allowNull: false, unique: true },
      mobile_number: { type: Sequelize.STRING(20), allowNull: false },
      gender: {
        type: Sequelize.ENUM("Male", "Female", "Other", "Prefer not to say"),
        allowNull: false,
      },
      address: { type: Sequelize.TEXT, allowNull: false },
      photo_url: { type: Sequelize.TEXT, allowNull: true },
      photo_public_id: { type: Sequelize.STRING(255), allowNull: true },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn("NOW"),
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn("NOW"),
      },
    });
    await queryInterface.addIndex("students", ["course"]);
    await queryInterface.addIndex("students", ["year"]);
  },
  async down(queryInterface) {
    await queryInterface.dropTable("students");
    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS "enum_students_gender"',
    );
    await queryInterface.sequelize.query(
      "DROP SEQUENCE IF EXISTS student_admission_seq",
    );
  },
};
