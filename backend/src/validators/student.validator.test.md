# Manual API verification checklist

Use the included API routes with the Postman collection (or curl):

1. Create a student with all required fields; expect HTTP 201 and an `STU-YYYY-NNNNN` admission number.
2. Omit `email`; expect HTTP 400 with field validation details.
3. Submit malformed email/mobile number; expect HTTP 400.
4. Create a duplicate email; expect HTTP 409 from the database unique constraint.
5. List with `?search=...`, `?course=...`, `?year=2`, and pagination; verify `meta` values.
6. Fetch a known ID; expect HTTP 200. Fetch a missing ID; expect HTTP 404.
7. Update a record and verify the admission number is unchanged.
8. Delete a record; expect HTTP 200. Fetch it again; expect HTTP 404.
9. Upload a JPG/PNG/WEBP with Cloudinary configured; verify the returned URL and public ID.
10. Upload a non-image or an image larger than the configured limit; expect HTTP 400.
