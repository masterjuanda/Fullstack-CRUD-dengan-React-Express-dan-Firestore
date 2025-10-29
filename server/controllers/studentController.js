import { db } from "../config/firebase.js";

const studentsCollection = db.collection("students");

// GET all students
export const getAllStudents = async (req, res) => {
  try {
    const snapshot = await studentsCollection.orderBy("name").get();
    const students = [];

    // snapshot.forEach mengubah setiap dokumen Firestore menjadi objek JavaScript, sambil menambahkan id dokumen.

    snapshot.forEach((doc) => {
      students.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    res.json(students);
  } catch (error) {
    console.error("Error getting students:", error);
    res.status(500).json({ error: "Failed to fetch students" });
  }
};

// POST create new student
export const createStudent = async (req, res) => {
  try {
    const { name, nim, major, email } = req.body;

    // Validation
    if (!name || !nim || !major || !email) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newStudent = {
      name,
      nim,
      major,
      email,
      createdAt: new Date().toISOString(),
    };

    const docRef = await studentsCollection.add(newStudent);

    res.status(201).json({
      id: docRef.id,
      ...newStudent,
    });
  } catch (error) {
    console.error("Error creating student:", error);
    res.status(500).json({ error: "Failed to create student" });
  }
};

// PUT update student
export const updateStudent = async (req, res) => {
  try {
    const { name, nim, major, email } = req.body;
    const { id } = req.params;

    // Check if student exists
    const doc = await studentsCollection.doc(id).get();
    if (!doc.exists) {
      return res.status(404).json({ error: "Student not found" });
    }

    const updatedData = {
      name,
      nim,
      major,
      email,
      updatedAt: new Date().toISOString(),
    };

    await studentsCollection.doc(id).update(updatedData);

    res.json({
      id,
      ...updatedData,
    });
  } catch (error) {
    console.error("Error updating student:", error);
    res.status(500).json({ error: "Failed to update student" });
  }
};

// DELETE student
export const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if student exists
    const doc = await studentsCollection.doc(id).get();
    if (!doc.exists) {
      return res.status(404).json({ error: "Student not found" });
    }

    await studentsCollection.doc(id).delete();

    res.json({ message: "Student deleted successfully" });
  } catch (error) {
    console.error("Error deleting student:", error);
    res.status(500).json({ error: "Failed to delete student" });
  }
};
