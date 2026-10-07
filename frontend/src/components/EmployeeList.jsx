export default function EmployeeList({ employees, loading, onEdit, onDelete }) {
  if (loading) return <p className="muted">Loading employees...</p>;
  if (employees.length === 0) return <p className="muted">No employees found.</p>;

  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>S.No</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Department</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp, index) => (
            <tr key={emp.id}>
              <td>{index + 1}</td>
              <td>{emp.name}</td>
              <td>{emp.email}</td>
              <td>{emp.phone}</td>
              <td>{emp.department}</td>
              <td className="row-actions">
                <button className="btn small" onClick={() => onEdit(emp)}>Edit</button>
                <button className="btn small danger" onClick={() => onDelete(emp.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}