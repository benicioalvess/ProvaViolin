import { useEffect, useState } from 'react'
import FormularioIdeia from './components/FormularioIdeia.jsx'
import ListaIdeias from './components/ListaIdeias.jsx'

const API_URL = 'https://jsonplaceholder.typicode.com/todos'

function App() {
  const [ideias, setIdeias] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState(null)

  const [titulo, setTitulo] = useState('')
  const [editando, setEditando] = useState(null)

  useEffect(() => {
    const controle = new AbortController()
    const signal = controle.signal

    async function buscar() {
      try {
        setCarregando(true)
        setErro(null)
        const resp = await fetch(`${API_URL}?_limit=15`, { signal })
        if (!resp.ok) throw new Error(`HTTP ${resp.status}`)
        const data = await resp.json()
        setIdeias(data)
      } catch (e) {
        if (e.name !== 'AbortError') {
          setErro(e.message)
        }
      } finally {
        setCarregando(false)
      }
    }

    buscar()

    return () => controle.abort()
  }, [])

  function limparFormulario() {
    setEditando(null)
    setTitulo('')
  }

  function comecarEdicao(ideia) {
    setEditando(ideia)
    setTitulo(ideia.title)
  }

  async function excluir(id) {
    const listaAntiga = ideias
    setIdeias(ideias.filter((i) => i.id !== id))

    try {
      const resp = await fetch(`${API_URL}/${id}`, { method: 'DELETE' })
      if (!resp.ok) throw new Error(`HTTP ${resp.status}`)
    } catch (e) {
      setErro(e.message)
      setIdeias(listaAntiga)
    }
  }

  async function alternarStatus(ideia) {
    const listaAntiga = ideias
    const atualizada = { ...ideia, completed: !ideia.completed }
    setIdeias(ideias.map((i) => (i.id === ideia.id ? atualizada : i)))

    try {
      const resp = await fetch(`${API_URL}/${ideia.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(atualizada),
      })
      if (!resp.ok) throw new Error(`HTTP ${resp.status}`)
    } catch (e) {
      setErro(e.message)
      setIdeias(listaAntiga)
    }
  }

  async function enviarFormulario(e) {
    e.preventDefault()

    try {
      if (editando) {
        // PUT
        const dados = { ...editando, title: titulo.trim() }

        const resp = await fetch(`${API_URL}/${editando.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(dados),
        })
        if (!resp.ok) throw new Error(`HTTP ${resp.status}`)
        const atualizada = await resp.json()

        setIdeias(
          ideias.map((i) => (i.id === atualizada.id ? atualizada : i))
        )
      } else {
        // POST
        const dados = { userId: 1, title: titulo.trim(), completed: false }

        const resp = await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(dados),
        })
        if (!resp.ok) throw new Error(`HTTP ${resp.status}`)
        const nova = await resp.json()

        setIdeias([nova, ...ideias])
      }

      limparFormulario()
    } catch (e) {
      setErro(e.message)
    }
  }

  return (
    <div className="App">
      <h1>Banco de Ideias</h1>

      {erro && <p className="erro">Erro: {erro}</p>}

      <FormularioIdeia
        titulo={titulo}
        setTitulo={setTitulo}
        editando={editando}
        aoEnviar={enviarFormulario}
        aoCancelar={limparFormulario}
      />

      <ListaIdeias
        ideias={ideias}
        carregando={carregando}
        aoAlternar={alternarStatus}
        aoEditar={comecarEdicao}
        aoExcluir={excluir}
      />
    </div>
  )
}

export default App
