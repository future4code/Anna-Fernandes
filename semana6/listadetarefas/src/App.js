import React from 'react'
import styled from 'styled-components'
import './styles.css'

import iconeEdita from './images/edit.svg'
import iconeDeleta from './images/delete.svg'

const HeaderTitle = styled.h1 `
  display: block;
  width: 100%;
  padding: 24px 8px;
  margin: 0;
  background-color: #5086F2;
  color: #F2F2F2;
  font-size: 3rem;
`

const TarefaList = styled.ul`
  margin: 0 auto 24px auto;
  padding: 0;
  max-width: 800px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
    flex-wrap: wrap;

  @media screen (max-width: 550px) {
    display: block;
  }
`

const TarefaFiltrada = styled.div`
  width: calc(100%/2 - 48px);
  padding: 16px 8px;
  margin: 16px!important;
  min-height: 200px;
  margin: 0 8px;
  border-radius: 5px;
  background-color: #F2EEB6;
  list-style: none;
`

const ResultadoBusca = styled.div`
  min-width: 300px;
  padding: 16px 8px;
  margin-top: 24px!important;
  min-height: 200px;
  margin: 0 8px;
  border-radius: 5px;
  background-color: #F2EEB6;
  list-style: none;
`
const TarefasContainer = styled.div`
  display: flex;
  align-items: space-between;
  flex-wrap: wrap;
`

const Tarefa = styled.li`
  width: calc(100% - 60px);
  text-align: left;
  text-decoration: ${({completa}) => (completa ? 'line-through' : 'none')};
`

const InputsContainer = styled.div`
  margin: 32px auto;
  max-width: 600px;
`

const InputLarge = styled.input `
  min-width: 360px;
  margin: 0 8px;
  padding: 8px;
  border-radius: 5px;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.25);
  border: none;

  @media screen and (max-width: 400px) {
    min-width: 300px;
  }
`

const InputSmall = styled.input `
  height: 24px;
  margin: 4px 0px;
  border-radius: 5px;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.25);
  border: none;
`

const Btn = styled.button `
  font-weight: 700;
  margin: 0 8px;
  padding: 8px;
  border-radius: 5px;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.25);
  border: none;
  background-color: #5086F2;
  color: #F2F2F2;
  cursor: pointer;
`

const BtnSmall = styled.button `
  height: 26px;
  font-weight: 700;
  margin: 4px;
  border-radius: 5px;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.25);
  border: none;
  background-color: #5086F2;
  color: #F2F2F2;
  cursor: pointer;
`

const BtnDelete = styled.button `
  font-weight: 700;
  margin: 24px 0;
  padding: 8px;
  border-radius: 5px;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.25);
  border: none;
  background-color: #F28585;
  color: #F2F2F2;
  cursor: pointer;
`

const BtnTransparent = styled.button `
  background-color: transparent;
  border: none;
  cursor: pointer;
`

const Icone = styled.img `
  height: 16px;
`

const FiltroTarefa = styled.div`
  background-color: #f5f5f5;
  padding: 24px 8px;
`

const LabelInput = styled.label`
  opacity: 0.8;
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
    
    // const listaFiltrada = this.state.tarefas
    //   .filter(tarefa => {
    //     switch (this.state.filter) {
    //       case 'pendentes':
    //         return !tarefa.completa
    //       case 'completas':
    //         return tarefa.completa
    //       default:
    //         return true
    //     }
    //   })

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
        if ((tarefa.texto.includes(this.state.inputBusca)) && (this.state.inputBusca !== "" )) {
          return tarefa.texto
        } 
      });

    const mostrarResultado = () => {
      if (this.state.buscar) {
        return (
        <TarefaList>
            <ResultadoBusca>
              {listaFiltradaTarefa.map(tarefa => {
                if (tarefa.editar) {
                  return (
                    <TarefasContainer>
                      <Tarefa
                        completa={tarefa.completa}
                        editar={tarefa.editar}
                        key={tarefa.id}
                        onClick={() => this.selectTarefa(tarefa.id)}
                        onDoubleClick={() => this.removeTarefa(tarefa.id)}
                      >
                        {tarefa.texto}
                      </Tarefa>
                      <BtnTransparent onClick={() => this.abreInputEditar(tarefa.id)}><Icone src={iconeEdita} /></BtnTransparent>
                      <BtnTransparent onClick={() => this.removeTarefa(tarefa.id)}><Icone src={iconeDeleta} /></BtnTransparent>
                      <InputSmall onChange={this.onChangeAlteraTarefa}></InputSmall> 
                      <BtnSmall onClick={() => this.alteraTarefa(tarefa.id)}>Alterar</BtnSmall> 
                    </TarefasContainer>
                  )
                } else {
                  return (
                    <TarefasContainer>
                      <Tarefa
                        completa={tarefa.completa}
                        editar={tarefa.editar}
                        key={tarefa.id}
                        onClick={() => this.selectTarefa(tarefa.id)}
                      >
                        {tarefa.texto}
                      </Tarefa>
                      <BtnTransparent onClick={() => this.abreInputEditar(tarefa.id)}><Icone src={iconeEdita} /></BtnTransparent>
                    </TarefasContainer>
                  )
                }
              })}
            </ResultadoBusca>
          </TarefaList>
        )
      }
    
    }


    return (
      <div className="App">
        <HeaderTitle>Lista de tarefas</HeaderTitle>
        <InputsContainer>
          <InputLarge value={this.state.inputValue} onChange={this.onChangeInput}/>
          <Btn onClick={this.criaTarefa}>Adicionar</Btn>
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
        <TarefaList>
          <TarefaFiltrada>
          <h3>Tarefas pendentes</h3>
          {listaFiltradaPendentes.map(tarefa => {
            if (tarefa.editar) {
              return (
                <TarefasContainer>
                  <Tarefa
                    completa={tarefa.completa}
                    editar={tarefa.editar}
                    key={tarefa.id}
                    onClick={() => this.selectTarefa(tarefa.id)}
                    onDoubleClick={() => this.removeTarefa(tarefa.id)}
                  >
                    {tarefa.texto}
                  </Tarefa>
                  <BtnTransparent onClick={() => this.abreInputEditar(tarefa.id)}><Icone src={iconeEdita} /></BtnTransparent>
                  <BtnTransparent onClick={() => this.removeTarefa(tarefa.id)}><Icone src={iconeDeleta} /></BtnTransparent>
                  <InputSmall onChange={this.onChangeAlteraTarefa}></InputSmall> 
                  <BtnSmall onClick={() => this.alteraTarefa(tarefa.id)}>Alterar</BtnSmall> 
                </TarefasContainer>
              )
            } else {
              return (
                <TarefasContainer>
                  <Tarefa
                    completa={tarefa.completa}
                    editar={tarefa.editar}
                    key={tarefa.id}
                    onClick={() => this.selectTarefa(tarefa.id)}
                  >
                    {tarefa.texto}
                  </Tarefa>
                  <BtnTransparent onClick={() => this.abreInputEditar(tarefa.id)}><Icone src={iconeEdita} /></BtnTransparent>
                  <BtnTransparent onClick={() => this.removeTarefa(tarefa.id)}><Icone src={iconeDeleta} /></BtnTransparent>
                </TarefasContainer>
              )
            }
          })}
          </TarefaFiltrada>
          <TarefaFiltrada>
          <h3>Tarefas completas</h3>
          {listaFiltradaCompletas.map(tarefa => {
            if (tarefa.editar) {
              return (
                <TarefasContainer>
                  <Tarefa
                    completa={tarefa.completa}
                    editar={tarefa.editar}
                    key={tarefa.id}
                    onClick={() => this.selectTarefa(tarefa.id)}
                    onDoubleClick={() => this.removeTarefa(tarefa.id)}
                  >
                    {tarefa.texto}
                  </Tarefa>
                  <BtnTransparent onClick={() => this.abreInputEditar(tarefa.id)}><Icone src={iconeEdita} /></BtnTransparent>
                  <BtnTransparent onClick={() => this.removeTarefa(tarefa.id)}><Icone src={iconeDeleta} /></BtnTransparent>
                  <InputSmall onChange={this.onChangeAlteraTarefa}></InputSmall> 
                  <BtnSmall onClick={() => this.alteraTarefa(tarefa.id)}>Alterar</BtnSmall> 
                </TarefasContainer>
              )
            } else {
              return (
                <TarefasContainer>
                  <Tarefa
                    completa={tarefa.completa}
                    editar={tarefa.editar}
                    key={tarefa.id}
                    onClick={() => this.selectTarefa(tarefa.id)}
                    onDoubleClick={() => this.removeTarefa(tarefa.id)}
                  >
                    {tarefa.texto}
                  </Tarefa>
                  <BtnTransparent onClick={() => this.abreInputEditar(tarefa.id)}><Icone src={iconeEdita} /></BtnTransparent>
                  <BtnTransparent onClick={() => this.removeTarefa(tarefa.id)}><Icone src={iconeDeleta} /></BtnTransparent>
                </TarefasContainer>
              )
            }
          })}
          </TarefaFiltrada>
        </TarefaList>
        <div>
          <Btn onClick={this.onClickOrdenaCrescente}>Ordenar de forma crescente</Btn>
          <Btn onClick={this.onClickOrdenaDecrescente}>Ordenar de forma decrescente</Btn>
        </div>
        <BtnDelete onClick={this.apagaTodas}>Apagar todas as tarefas</BtnDelete>
        <FiltroTarefa>
          <LabelInput>Filtre por tarefa</LabelInput>
          <InputLarge value={this.state.filterTarefa} onChange={this.onChangeInputPesquisaTarefa}></InputLarge>
          <Btn onClick={this.onClickBuscaTarefas}>Filtrar</Btn>
          {mostrarResultado()}
        </FiltroTarefa>
      </div>
    )
  }
}

export default App
