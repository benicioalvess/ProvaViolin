function CartaoIdeia({ ideia, aoAlternar, aoEditar, aoExcluir }) {
  return (
    <li>
      <span className={ideia.completed ? 'executed' : ''}>
        {ideia.title} ({ideia.completed ? 'executed' : 'quase indo'})
      </span>
      <span>
        <button onClick={() => aoAlternar(ideia)}>
          {ideia.completed ? 'Reabrir' : ' executed'}
        </button>
        <button onClick={() => aoEditar(ideia)}>Edits</button>
        <button onClick={() => aoExcluir(ideia.id)}>Exclói</button>
      </span>
    </li>
  )
}

export default CartaoIdeia