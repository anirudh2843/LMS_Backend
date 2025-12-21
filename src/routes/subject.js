// src/routes/subject.js
router.post("/", auth, authorizeRoles("admin", "teacher"), createSubject);

router.get(
  "/class/:classLevel",
  auth,
  authorizeRoles("student", "teacher", "admin"),
  getSubjectsByClass
);
