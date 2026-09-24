function CartaoIdeia({ ideia, aoAlternar, aoEditar, aoExcluir }) {
  return (
    <li>
      <span className={ideia.completed ? 'executada' : ''}>
        {ideia.title} ({ideia.completed ? 'executada' : 'pendente'})
      </span>
      <span>
        <button onClick={() => aoAlternar(ideia)}>
          {ideia.completed ? 'Reabrir' : 'Marcar executada'}
        </button>
        <button onClick={() => aoEditar(ideia)}>Edits</button>
        <button onClick={() => aoExcluir(ideia.id)}>Exclói</button>
      </span>
    </li>
  )
}

export default CartaoIdeia