import { useState } from 'react'
import { Link } from 'react-router'
import { Card, Table, Button, Form } from 'react-bootstrap'
import { obtenerUsuarios, eliminarUsuario } from '../../data/adminDatos.js'

function UsuariosAdmin() {
  const [usuarios, setUsuarios] = useState(obtenerUsuarios)
  const [texto, setTexto] = useState('')

  // Dato derivado: busca en nombre, apellidos y correo
  const filtrados = usuarios.filter((u) => {
    const buscado = texto.toLowerCase()
    return (
      `${u.nombre} ${u.apellidos}`.toLowerCase().includes(buscado) ||
      u.correo.toLowerCase().includes(buscado)
    )
  })

  function eliminar(usuario) {
    if (window.confirm(`¿Seguro que quieres eliminar a "${usuario.nombre} ${usuario.apellidos}"?`)) {
      eliminarUsuario(usuario.id)
      setUsuarios(obtenerUsuarios())
    }
  }

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3 mb-0">Usuarios</h1>
        <Button as={Link} to="/admin/usuarios/nuevo" variant="success">
          + Nuevo usuario
        </Button>
      </div>

      <Card body className="shadow-sm">
        <Form.Control
          type="search"
          className="mb-3"
          placeholder="Buscar por nombre o correo..."
          value={texto}
          onChange={(evento) => setTexto(evento.target.value)}
        />

        <Table responsive hover align="middle" className="mb-0">
          <thead>
            <tr>
              <th>RUN</th>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Tipo</th>
              <th>Comuna</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filtrados.map((u) => (
              <tr key={u.id}>
                <td>{u.run}</td>
                <td>
                  {u.nombre} {u.apellidos}
                </td>
                <td>{u.correo}</td>
                <td>{u.tipo}</td>
                <td>{u.comuna}</td>
                <td>
                  <div className="d-flex gap-2">
                    <Button
                      as={Link}
                      to={`/admin/usuarios/editar/${u.id}`}
                      size="sm"
                      variant="outline-primary"
                    >
                      Editar
                    </Button>
                    <Button size="sm" variant="outline-danger" onClick={() => eliminar(u)}>
                      Eliminar
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
            {filtrados.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center text-muted">
                  No hay usuarios que coincidan.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </Card>
    </>
  )
}

export default UsuariosAdmin