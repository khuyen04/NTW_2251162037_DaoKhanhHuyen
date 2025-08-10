import React, { useState } from 'react';
import { Edit, Trash2 } from 'lucide-react';

export default function StudentItem({ student, onEdit, onDelete }) {
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDelete() {
    if (window.confirm(`Bạn có chắc chắn muốn xóa sinh viên "${student?.fullName || ''}"?`)) {
      setIsDeleting(true);
      await new Promise(r => setTimeout(r, 300));
      onDelete(student?.maSV);
    }
  }

  return (
    <div className={`student-card ${isDeleting ? 'deleting' : ''}`}>
      <div className="student-info">
        <h4>
          {student?.maSV ? `(${student.maSV})` : ''} {student?.fullName || ''}
        </h4>
        <p><strong>Email:</strong> {student?.email || 'Chưa có'}</p>
        <p><strong>Ngày sinh:</strong> {student?.date || 'Chưa có'}</p>
      </div>
      <div className="student-actions">
        <button className="btn-edit" onClick={() => onEdit(student)}>
          <Edit size={16} /> Sửa
        </button>
        <button 
          className="btn-delete" 
          onClick={handleDelete} 
          disabled={isDeleting}
        >
          {isDeleting ? '...' : <><Trash2 size={16} /> Xóa</>}
        </button>
      </div>
    </div>
  );
}
