import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { http } from "../../services/http";

interface User {
  id: number;
  name: string;
  email: string;
}

export function deleteUser(id: number) {
  http.delete(`/users/${id}`).then((data) => {
    console.log(data);
  });
}

export function UserList() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    http.get("/users/all").then((data) => {
      setUsers(data);
    });
  }, []);

  return (
    <div className="table-responsive">
      <table
        className="table table-striped
      table-hover	
      table-borderless
      table-primary
      align-middle"
      >
        <thead className="table-light">
          <span>Lista de usuários</span>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody className="table-group-divider">
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <Button variant="warning" onClick={() => deleteUser(user.id)}>
                Editar
              </Button>
            </tr>
          ))}
        </tbody>
        <tfoot></tfoot>
      </table>
    </div>
  );
}
