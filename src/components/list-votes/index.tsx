import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { http } from "../../services/http";

interface Vote {
  id: number;
  userId: number;
  topicId: number;
  vote: number;
}

export function deleteVoto(id: number) {
  http.delete(`/votos/${id}`).then((data) => {
    console.log(data);
  });
}

export function VotosList() {
  const [votos, setVotos] = useState<Vote[]>([]);

  useEffect(() => {
    http.get("/temas/").then((data) => {
      setVotos(data);
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
          <span>Lista de Votos</span>
          <tr>
            <th>Usuário</th>
            <th>Tema</th>
            <th>Voto</th>
          </tr>
        </thead>
        <tbody className="table-group-divider">
          {votos.map((tema) => (
            <tr key={tema.id}>
              <td>{tema.userId}</td>
              <td>{tema.topicId}</td>
              <td>{tema.vote}</td>
              <Button variant="warning">Editar</Button>
            </tr>
          ))}
        </tbody>
        <tfoot></tfoot>
      </table>
    </div>
  );
}
