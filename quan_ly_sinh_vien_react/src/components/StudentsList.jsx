import React from 'react';

function StudentsList({ Students, onEdit, onDelete }) {
    return (
        <div>
            <h2>Danh sách Sinh viên</h2>
            <ul>
                {Students.map(student => (
                    <li key={student.maSV}>
                        <strong>{student.name}</strong> - {student.fullName} ({student.email}) ({student.date})
                        {' '}
                        <button onClick={() => onEdit(student)}>Sửa</button>
                        {' '}
                        <button onClick={() => onDelete(student.maSV)}>Xóa</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default StudentsList;
