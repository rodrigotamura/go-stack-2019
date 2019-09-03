import React, { Component } from 'react';
import { FaGitAlt, FaPlus, FaSpinner } from 'react-icons/fa';
// In this case we are importing FontAwesome (react-icons/fa)
// react-icons/<icon-package-desired>
// And inside {} we put the name of desired icon
import api from '../../services/api';

import { Container, Form, SubmitButton, List } from './styles';

export default class Main extends Component {
  state = {
    newRepo: '',
    repositories: [],
    loading: 0,
  };

  handleInputChange = e => {
    this.setState({ newRepo: e.target.value });
  };

  handleSubmit = async e => {
    e.preventDefault();

    // showing loading
    this.setState({ loading: 1 });

    const { newRepo, repositories } = this.state;

    const response = await api.get(`/repos/${newRepo}`);

    // storing somewhere this repo
    const data = {
      name: response.data.full_name,
    };
    // attaching into this.state.repositories
    this.setState({
      repositories: [...repositories, data],
      newRepo: '',
      loading: 0,
    });
  };

  render() {
    const { newRepo, loading, repositories } = this.state;

    return (
      <Container>
        <h1>
          <FaGitAlt />
          Repositories
        </h1>

        <Form onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="Add repository (<user>/<repo-name>)"
            value={newRepo}
            onChange={this.handleInputChange}
          />
          {/* We are creating a new styled component for SubmitButton because we will apply some self behaviors */}
          {/* Whe a user press this button in order to find a repository, this button will be disabled while requesting */}
          <SubmitButton loading={loading}>
            {/* Let's put one spinner rounding while is requesting */}
            {loading ? (
              <FaSpinner color="#FFF" size={14} />
            ) : (
              <FaPlus color="#FFF" size={14} />
            )}
          </SubmitButton>
        </Form>

        <List>
          {repositories.map(repository => (
            <li key={repository.name}>
              <span>{repository.name}</span>
              <a href="">Details</a>
            </li>
          ))}
        </List>
      </Container>
    );
  }
}
