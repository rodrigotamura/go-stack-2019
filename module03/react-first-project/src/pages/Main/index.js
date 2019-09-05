import React, { Component } from 'react';
import { FaGitAlt, FaPlus, FaSpinner } from 'react-icons/fa';
// In this case we are importing FontAwesome (react-icons/fa)
// react-icons/<icon-package-desired>
// And inside {} we put the name of desired icon
import { Link } from 'react-router-dom';
import Container from '../../components/Container';
import api from '../../services/api';

// for routes navigation

import { Form, ErrorMsg, SubmitButton, List } from './styles';

export default class Main extends Component {
  state = {
    newRepo: '',
    repositories: [],
    loading: 0,
    error: 0,
    errorMessage: '',
  };

  // loading repositories from local storage
  componentDidMount() {
    const repositories = localStorage.getItem('repositories');

    if (repositories) {
      this.setState({ repositories: JSON.parse(repositories) });
    }
  }

  // saving repository in local storage
  componentDidUpdate(_, prevState) {
    const { repositories } = this.state;

    if (prevState.repositories !== repositories) {
      localStorage.setItem('repositories', JSON.stringify(repositories));
    }
  }

  handleInputChange = e => {
    this.setState({ newRepo: e.target.value });
  };

  handleSubmit = async e => {
    e.preventDefault();

    this.setState({
      loading: 1, // showing loading
      error: 0, // removing errors
    });

    const { newRepo, repositories } = this.state;

    try {
      // checking if field is empty
      if (newRepo === '') {
        throw new Error('Plese, type something');
      }

      // check if given repo already exists
      const repoExists = repositories.find(repo => repo.name === newRepo);

      if (repoExists) {
        throw new Error('The given repository already exists');
      }

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
        error: 0,
      });
    } catch (err) {
      this.setState({ error: 1, loading: 0, errorMessage: err.message });
    }
  };

  render() {
    const { newRepo, loading, repositories, error, errorMessage } = this.state;

    return (
      <Container>
        <h1>
          <FaGitAlt />
          Repositories
        </h1>
        <Form onSubmit={this.handleSubmit} error={error}>
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

        {error === 1 && <ErrorMsg>{errorMessage}</ErrorMsg>}

        <List>
          {repositories.map(repository => (
            <li key={repository.name}>
              <span>{repository.name}</span>
              <Link to={`/repository/${encodeURIComponent(repository.name)}`}>
                {/*
                using encodeURIComponent() we will convert / into encodedURL
                in order to prevent wrong routing
                */}
                Details
              </Link>
            </li>
          ))}
        </List>
      </Container>
    );
  }
}
