import React, { useState, useEffect } from "react";
import StudentsForm from "./components/StudentsForm";
import StudentItem from "./components/StudentsItem";
import './App.css';

function App() {
  const [students, setStudents] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("students");
    if (stored && JSON.parse(stored).length > 0) {
      setStudents(JSON.parse(stored));
    } else {
      const defaultData = [
        {
          maSV: "2251162037",
          name: "Huyền",
          fullName: "Đào Khánh",
          email: "2251162037@e.edu.vn",
          date: "2004-03-24",
        },
        {
          maSV: "2251162009",
          name: "Hòa",
          fullName: "Trần Thị Khánh",
          email: "2251162009@e.edu.vn",
          date: "2004-12-04",
        },
      ];
      setStudents(defaultData);
      localStorage.setItem("students", JSON.stringify(defaultData));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("students", JSON.stringify(students));
  }, [students]);

  const handleAddStudent = (newStudent) => {
    setStudents((prev) => [...prev, newStudent]);
    setShowForm(false);
  };

  const handleUpdateStudent = (updatedStudent) => {
    setStudents((prev) =>
      prev.map((s) => (s.maSV === updatedStudent.maSV ? updatedStudent : s))
    );
    setEditingStudent(null);
    setShowForm(false);
  };

  const handleDeleteStudent = (maSV) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa?")) {
      setStudents((prev) => prev.filter((s) => s.maSV !== maSV));
    }
  };

  return (
    <div className="container">
      <h1>Quản Lý Sinh Viên</h1>

      {!showForm && (
        <button
          className="add-btn"
          onClick={() => {
            setEditingStudent(null);
            setShowForm(true);
          }}
        >
          + Thêm Sinh viên
        </button>
      )}

      {/* Popup Form */}
      {showForm && (
        <div className="modal-overlay">
          <div className="modal">
            <StudentsForm
              onAdd={handleAddStudent}
              onUpdate={handleUpdateStudent}
              editingStudent={editingStudent}
            />
          </div>
        </div>
      )}

      <h2>Danh sách Sinh viên</h2>
      {students.length > 0 ? (
        <table className="student-table">
          <thead>
            <tr>
              <th>Mã SV</th>
              <th>Họ đệm</th>
              <th>Tên</th>
              <th>Email</th>
              <th>Ngày sinh</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.maSV}>
                <td>{student.maSV}</td>
                <td>{student.fullName}</td>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>{student.date}</td>
                <td>
                  <button
                    className="edit-btn"
                    onClick={() => {
                      setEditingStudent(student);
                      setShowForm(true);
                    }}
                  >
                    Sửa
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDeleteStudent(student.maSV)}>
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Chưa có sinh viên nào</p>
      )}
    </div>
  );
}

export default App;