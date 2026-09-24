function FormularioIdeia({ titulo, setTitulo, editando, aoEnviar, aoCancelar }) {
  return (
    <form onSubmit={aoEnviar}>
      <h2>{editando ? 'Editar ideia' : 'Nova ideia'}</h2>
      <input
        type="text"
        placeholder="Título da ideia"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
        required
      />
      <button type="submit">{editando ? 'Salvar' : 'Cadastrar'}</button>
      {editando && (
        <button type="button" onClick={aoCancelar}>
          Cancelar
        </button>
      )}
    </form>
  )
}

export default FormularioIdeia