import React, { useState, useEffect } from "react";

function StudentsForm({ onAdd, onUpdate, editingStudent, onClose }) {
  const [maSV, setMaSV] = useState("");
  const [name, setName] = useState("");
  const [fullName, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    if (editingStudent) {
      setMaSV(editingStudent.maSV);
      setName(editingStudent.name);
      setFullname(editingStudent.fullName);
      setEmail(editingStudent.email);
      setDate(editingStudent.date);
    } else {
      setMaSV("");
      setName("");
      setFullname("");
      setEmail("");
      setDate("");
    }
  }, [editingStudent]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !fullName || !email || !date) {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    const studentData = {
      maSV: editingStudent ? maSV : Date.now().toString(),
      name,
      fullName,
      email,
      date,
    };

    if (editingStudent) {
      onUpdate(studentData);
    } else {
      onAdd(studentData);
    }

    setMaSV("");
    setName("");
    setFullname("");
    setEmail("");
    setDate("");
  };

  return (
    <div className="form-overlay">
      <div className="form-container">
        <h2>{editingStudent ? "Sửa Sinh viên" : "Thêm Sinh viên"}</h2>
        <form onSubmit={handleSubmit}>
          <label>Tên Sinh viên:</label>
          <input value={name} onChange={(e) => setName(e.target.value)} />

          <label>Họ đệm:</label>
          <input value={fullName} onChange={(e) => setFullname(e.target.value)} />

          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />

          <label>Ngày sinh:</label>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />

          <div className="form-actions">
            <button type="submit" className="save-btn">
              {editingStudent ? "Cập nhật" : "Thêm"}
            </button>
            <button type="button" className="close-btn" onClick={onClose}>
              Hủy
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default StudentsForm;