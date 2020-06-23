import React from 'react'
import styled from 'styled-components'
import './styles.css'

const TarefaList = styled.ul`
  padding: 24px;
  max-width: 800px;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;

  @media screen (max-width: 550px) {
    display: block;
  }
`

const TarefaFiltrada = styled.ul`
  padding: 0;
  margin: 0 40px;
  width: 200px;
  min-height: 300px;
`

const Tarefa = styled.li`
  text-align: left;
  text-decoration: ${({completa}) => (completa ? 'line-through' : 'none')};
`

const InputsContainer = styled.div`
  display: grid;
  grid-auto-flow: column;
  gap: 10px;
`

const FiltroTarefa = styled.div`
  background-color: #f5f5f5;
`

class App extends React.Component {
    state = {
      tarefas: [
        {
          id: 123,
          texto: "Supermercado",
          completa: false,
          editar: false
        },
        {
          id: Date.now(),
          texto: "Ficar em casa",
          completa: true,
          editar: false
        }
      ],
      inputValue: '',
      buscar: false,
      inputBusca: '',
      inputAlteraValue: '',
      filter: '',
      order: true,
    }

  componentDidUpdate() {
    localStorage.setItem("tarefas", JSON.stringify(this.state.tarefas))
  };

  componentDidMount() {
    const tarefasString = localStorage.getItem("tarefa");
    const tarefasObjeto = JSON.parse(tarefasString);
  };

  onChangeInput = (event) => {
    this.setState({ inputValue: event.target.value })
  }

  onChangeAlteraTarefa = (event) => {
    this.setState({ inputAlteraValue: event.target.value })
  }

  criaTarefa = () => {
    const novaTarefa = {
      id: Date.now(),
      texto: this.state.inputValue,
      completa: false
    };

    const novoTarefas = [...this.state.tarefas, novaTarefa];

    this.setState({ tarefas: novoTarefas, id:"", texto:"", completa:"", inputValue:"" })
  }

  abreInputEditar = id => {

    const novasTarefas = this.state.tarefas.map( tarefa => {
      if ( id === tarefa.id) {
        const novaTarefa = {
          ...tarefa,
          editar: !tarefa.editar
        }
        return novaTarefa
      } else {
        return tarefa
      }
    });

    this.setState({ tarefas: novasTarefas })

  }

  alteraTarefa = id => {

    const novasTarefas = this.state.tarefas.map( tarefa => {
      if ( id === tarefa.id) {
        const novaTarefa = {
          ...tarefa,
          texto: this.state.inputAlteraValue,
          editar: false
        }
        return novaTarefa
      } else {
        return tarefa
      }
    });

    this.setState({ tarefas: novasTarefas })
  }

  selectTarefa = (id) => {
    
    const novaTarefa = this.state.tarefas.map( tarefa => {
      if (tarefa.id === id) {
        tarefa.completa = !tarefa.completa
      }
    });
    
    const novoTarefas = [...this.state.tarefas];
    
    this.setState({ tarefas: novoTarefas, id:"", texto:"", completa:"" });

  }

  onChangeFilter = (event) => {
    this.setState({ filter: event.target.value })
  }

  removeTarefa = tarefaParaRemover => {
    if (window.confirm("Você tem certeza que deseja remover essa tarefa?")) {
      const novoTarefas = this.state.tarefas.filter(tarefa => {
        return tarefa.id !== tarefaParaRemover;
      });
  
      this.setState({ tarefas: novoTarefas });
    }
  }

  onClickOrdenaCrescente = () => {
    const novoTarefas = this.state.tarefas.sort( (tarefa1, tarefa2) => {
      if (tarefa1.texto > tarefa2.texto) {
        return 1
      } else {
        return -1
      }
    })

    this.setState({ tarefas: novoTarefas });
  }

  onClickOrdenaDecrescente = () => {
    const novoTarefas = this.state.tarefas.sort( (tarefa1, tarefa2) => {
      if (tarefa1.texto > tarefa2.texto) {
        return -1
      } else {
        return 1
      }
    })

    this.setState({ tarefas: novoTarefas });
  }

  onClickBuscaTarefas = () => {
    this.setState({ buscar: !this.state.buscar });
  }

  apagaTodas = () => {
    const tarefasEmBranco = [
      {
        id: "",
        texto: "",
        completa: ""
      }
    ]

    this.setState({ tarefas: tarefasEmBranco, id:"", texto:"", completa:"", inputValue:"" })
  }

  onChangeInputPesquisaTarefa = event => {
    this.setState({ inputBusca: event.target.value })
  }

  render() {
    const listaFiltradaPendentes = this.state.tarefas
      .filter(tarefa => {
        return !tarefa.completa
      });
      
    const listaFiltradaCompletas = this.state.tarefas
      .filter(tarefa => {
        return tarefa.completa
      });
      
    const listaFiltradaTarefa = this.state.tarefas
      .filter(tarefa => {
        if (tarefa.texto === this.state.inputBusca) {
          return tarefa.texto
        }
      });

    const mostrarResultado = () => {
      if (this.state.buscar) {
        return (
        <TarefaList>
            <TarefaFiltrada>
            <h3>Resultado da busca</h3>
              {listaFiltradaTarefa.map(tarefa => {
                if (tarefa.editar) {
                  return (
                    <div>
                      <Tarefa
                        completa={tarefa.completa}
                        editar={tarefa.editar}
                        key={tarefa.id}
                        onClick={() => this.selectTarefa(tarefa.id)}
                        onDoubleClick={() => this.removeTarefa(tarefa.id)}
                      >
                        {tarefa.texto}
                      </Tarefa>
                      <input onChange={this.onChangeAlteraTarefa}></input> 
                      <button onClick={() => this.alteraTarefa(tarefa.id)}>Alterar</button> 
                      <button onClick={() => this.abreInputEditar(tarefa.id)}>Editar</button>
                    </div>
                  )
                } else {
                  return (
                    <div>
                      <Tarefa
                        completa={tarefa.completa}
                        editar={tarefa.editar}
                        key={tarefa.id}
                        onClick={() => this.selectTarefa(tarefa.id)}
                        onDoubleClick={() => this.removeTarefa(tarefa.id)}
                      >
                        {tarefa.texto}
                      </Tarefa>
                      <button onClick={() => this.abreInputEditar(tarefa.id)}>Editar</button>
                    </div>
                  )
                }
              })}
            </TarefaFiltrada>
          </TarefaList>
        )
      }
    
    }


    return (
      <div className="App">
        <h1>Lista de tarefas</h1>
        <InputsContainer>
          <input value={this.state.inputValue} onChange={this.onChangeInput}/>
          <button onClick={this.criaTarefa}>Adicionar</button>
        </InputsContainer>
        <br/>
{/* 
        <InputsContainer>
          <label>Filtro</label>
          <select value={this.state.filter} onChange={this.onChangeFilter}>
            <option value="">Nenhum</option>
            <option value="pendentes">Pendentes</option>
            <option value="completas">Completas</option>
          </select>
        </InputsContainer>
         */}
        <FiltroTarefa>
          <label>Filtre por tarefa</label>
          <input value={this.state.filterTarefa} onChange={this.onChangeInputPesquisaTarefa}></input>
          <button onClick={this.onClickBuscaTarefas}>Filtrar</button>
          {mostrarResultado()}
        </FiltroTarefa>
        <TarefaList>
          <TarefaFiltrada>
          <h3>Tarefas pendentes</h3>
          {listaFiltradaPendentes.map(tarefa => {
            if (tarefa.editar) {
              return (
                <div>
                  <Tarefa
                    completa={tarefa.completa}
                    editar={tarefa.editar}
                    key={tarefa.id}
                    onClick={() => this.selectTarefa(tarefa.id)}
                    onDoubleClick={() => this.removeTarefa(tarefa.id)}
                  >
                    {tarefa.texto}
                  </Tarefa>
                  <input onChange={this.onChangeAlteraTarefa}></input> 
                  <button onClick={() => this.alteraTarefa(tarefa.id)}>Alterar</button> 
                  <button onClick={() => this.abreInputEditar(tarefa.id)}>Editar</button>
                </div>
              )
            } else {
              return (
                <div>
                  <Tarefa
                    completa={tarefa.completa}
                    editar={tarefa.editar}
                    key={tarefa.id}
                    onClick={() => this.selectTarefa(tarefa.id)}
                    onDoubleClick={() => this.removeTarefa(tarefa.id)}
                  >
                    {tarefa.texto}
                  </Tarefa>
                  <button onClick={() => this.abreInputEditar(tarefa.id)}>Editar</button>
                </div>
              )
            }
          })}
          </TarefaFiltrada>
          <TarefaFiltrada>
          <h3>Tarefas completas</h3>
          {listaFiltradaCompletas.map(tarefa => {
            if (tarefa.editar) {
              return (
                <div>
                  <Tarefa
                    completa={tarefa.completa}
                    editar={tarefa.editar}
                    key={tarefa.id}
                    onClick={() => this.selectTarefa(tarefa.id)}
                    onDoubleClick={() => this.removeTarefa(tarefa.id)}
                  >
                    {tarefa.texto}
                  </Tarefa>
                  <input onChange={this.onChangeAlteraTarefa}></input> 
                  <button onClick={() => this.alteraTarefa(tarefa.id)}>Alterar</button> 
                  <button onClick={() => this.abreInputEditar(tarefa.id)}>Editar</button>
                </div>
              )
            } else {
              return (
                <div>
                  <Tarefa
                    completa={tarefa.completa}
                    editar={tarefa.editar}
                    key={tarefa.id}
                    onClick={() => this.selectTarefa(tarefa.id)}
                    onDoubleClick={() => this.removeTarefa(tarefa.id)}
                  >
                    {tarefa.texto}
                  </Tarefa>
                  <button onClick={() => this.abreInputEditar(tarefa.id)}>Editar</button>
                </div>
              )
            }
          })}
          </TarefaFiltrada>
        </TarefaList>
        <p>Clique duas vezes para deletar a tarefa.</p>
        <div>
          <button onClick={this.onClickOrdenaCrescente}>Ordenar de forma crescente</button>
          <button onClick={this.onClickOrdenaDecrescente}>Ordenar de forma decrescente</button>
        </div>
        <button onClick={this.apagaTodas}>Apagar todas as tarefas</button>
      </div>
    )
  }
}

export default App
