import React, { Component } from 'react';
import api from '../../services/api';

export default class Repository extends Component {
  state = {
    repository: {},
    issues: [],
    loading: 1,
  };

  async componentDidMount() {
    // here we will get repo details
    const { match } = this.props;

    const repoName = decodeURIComponent(match.params.repository);

    const [repository, issues] = await Promise.all([
      api.get(`/repos/${repoName}`),
      api.get(`/repos/${repoName}/issues`, {
        params: {
          // adding a querystring
          state: 'open', // only opened issues
          per_page: 5, // retrieve 5 issues
        },
      }),
    ]);

    this.setState({
      repository: repository.data,
      issues: issues.data,
      loading: 0,
    });
  }

  render() {
    // we implemented it because ESLint is warning
    const { repository, issues, loading } = this.state;

    return <h1>Repository</h1>;
  }
}
