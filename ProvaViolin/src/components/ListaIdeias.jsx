import CartaoIdeia from './CartaoIdeia.jsx'

function ListaIdeias({ ideias, carregando, aoAlternar, aoEditar, aoExcluir }) {
  return (
    <div>
      <h2>Lista de ideias ({ideias.length})</h2>

      {carregando && <p>Carregando...</p>}

      {!carregando && ideias.length === 0 && <p>Nenhuma ideia encontrada.</p>}

      <ul>
        {ideias.map((i) => (
          <CartaoIdeia
            key={i.id}
            ideia={i}
            aoAlternar={aoAlternar}
            aoEditar={aoEditar}
            aoExcluir={aoExcluir}
          />
        ))}
      </ul>
    </div>
  )
}

export default ListaIdeias
