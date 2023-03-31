import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { http } from "../../services/http";

interface Tema {
  nome: string;
  descricao: string;
  ordem: number;
}

export function deleteUser(id: number) {
  http.delete(`/temas/${id}`).then((data) => {
    console.log(data);
  });
}

export function TemaList() {
  const [temas, setTemas] = useState<Tema[]>([]);

  useEffect(() => {
    http.get("/temas/").then((data) => {
      setTemas(data);
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
          <span>Lista de Temas</span>
          <tr>
            <th>Nome</th>
            <th>Descrição</th>
            <th>Ordem</th>
          </tr>
        </thead>
        <tbody className="table-group-divider">
          {temas.map((tema) => (
            <tr key={tema.nome}>
              <td>{tema.nome}</td>
              <td>{tema.descricao}</td>
              <td>{tema.ordem}</td>
              <Button variant="warning">Editar</Button>
            </tr>
          ))}
        </tbody>
        <tfoot></tfoot>
      </table>
    </div>
  );
}
