import React from 'react';
import styled from "styled-components";
import axios from "axios";

const ChuckContainer = styled.div `
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const Quote = styled.div `
  margin: 24px auto;
  max-width: 400px;
  text-align: center;
`

export class ChuckNorrisApi extends React.Component {
  state = {
    jokesList: [],
    randomJoke: "",
    loading: false
  };

  componentDidMount = () => {
    this.getCategories()
  }

  getCategories = async () => {
    try {
      const response = await axios.get("https://api.chucknorris.io/jokes/categories");
      this.setState({ jokesList: response.data });
    } catch (err) {
      console.log(err.message);
    }
  }

  onChangeCategory = event => {
    const jokeCategory = event.target.value;

    axios.get(`https://api.chucknorris.io/jokes/random?category=${jokeCategory}`).then( response => {
      this.setState({ randomJoke: response.data, loading: true });
    }).catch(err => {
        alert('Ai que loucura! O só esse erro: ' + err.message)
        console.log(err.message)
    })
  }


  render() {
      const loader = <p>loading...</p>
      const joke = <Quote>
          <p>{this.state.randomJoke.value}</p>
      </Quote>
    return (
      <ChuckContainer>
        <select onChange={this.onChangeCategory}>
          <option value="">Selecione uma categoria</option>
          {this.state.jokesList.map(joke => {
             console.log(joke === "")
            if(joke === "") {
                return "<p>...loading</p>"
            }
            return <option key={joke} value={joke}>{joke}</option>
          })}
        </select>
        <div>
          {!this.state.randomJoke && this.state.loading && loader}
          {this.state.randomJoke && joke}
        </div>
      </ChuckContainer>
    );
  }
}

export default ChuckNorrisApi;
