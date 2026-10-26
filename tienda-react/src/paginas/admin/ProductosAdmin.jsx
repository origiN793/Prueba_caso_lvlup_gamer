import { useState } from 'react'
import { Link } from 'react-router'
import { Card, Table, Button, Form, Badge } from 'react-bootstrap'
import { obtenerProductos, eliminarProducto } from '../../data/adminDatos.js'
import { formatearPrecio } from '../../utils/formato.js'

function ProductosAdmin() {
  // Pasamos la función (sin paréntesis): localStorage se lee solo la primera vez
  const [productos, setProductos] = useState(obtenerProductos)
  const [texto, setTexto] = useState('')

  // Dato derivado: se calcula en cada render, no se guarda
  const filtrados = productos.filter((p) => {
    const buscado = texto.toLowerCase()
    return p.nombre.toLowerCase().includes(buscado) || p.codigo.toLowerCase().includes(buscado)
  })

  function eliminar(producto) {
    if (window.confirm(`¿Seguro que quieres eliminar "${producto.nombre}"?`)) {
      eliminarProducto(producto.id)
      // Volvemos a leer la lista guardada para actualizar la pantalla
      setProductos(obtenerProductos())
    }
  }

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3 mb-0">Productos</h1>
        <Button as={Link} to="/admin/productos/nuevo" variant="success">
          + Nuevo producto
        </Button>
      </div>

      <Card body className="shadow-sm">
        <Form.Control
          type="search"
          className="mb-3"
          placeholder="Buscar por nombre o código..."
          value={texto}
          onChange={(evento) => setTexto(evento.target.value)}
        />

        {/* responsive: en pantallas chicas la tabla se desplaza hacia el costado */}
        <Table responsive hover align="middle" className="mb-0">
          <thead>
            <tr>
              <th>Imagen</th>
              <th>Código</th>
              <th>Nombre</th>
              <th>Categoría</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filtrados.map((p) => (
              <tr key={p.id}>
                <td>
                  <img src={p.imagen} alt={p.nombre} className="miniatura-producto" />
                </td>
                <td>{p.codigo}</td>
                <td>{p.nombre}</td>
                <td>{p.categoria}</td>
                <td>{formatearPrecio(p.precio)}</td>
                <td>
                  {p.stock}{' '}
                  {p.stock <= p.stockCritico && <Badge bg="warning" text="dark">Crítico</Badge>}
                </td>
                <td>
                  <div className="d-flex gap-2">
                    <Button
                      as={Link}
                      to={`/admin/productos/editar/${p.id}`}
                      size="sm"
                      variant="outline-primary"
                    >
                      Editar
                    </Button>
                    <Button size="sm" variant="outline-danger" onClick={() => eliminar(p)}>
                      Eliminar
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
            {filtrados.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center text-muted">
                  No hay productos que coincidan.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </Card>
    </>
  )
}

export default ProductosAdmin