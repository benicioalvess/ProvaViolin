function FormularioIdeia({ titulo, setTitulo, editando, aoEnviar, aoCancelar }) {
  return (
    <form onSubmit={aoEnviar}>
      <h2>{editando ? 'Edits na ideia' : 'New ideia'}</h2>
      <input
        type="text"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
        required
      />
      <button type="submit">{editando ? 'Salve' : 'login'}</button>
      {editando && (
        <button type="button" onClick={aoCancelar}>
          Cancelar
        </button>
      )}
    </form>
  )
}

export default FormularioIdeia
