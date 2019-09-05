import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FaArrowCircleLeft, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import api from '../../services/api';
import Container from '../../components/Container';

import {
  Loading,
  Owner,
  IssueList,
  SelectIssueFilter,
  Pagination,
} from './styles';

export default class Repository extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        repository: PropTypes.string,
      }),
    }).isRequired, // everything is required
  };

  state = {
    repository: {},
    issues: [],
    loading: 1,
    issueFilter: 'all',
    per_page: 5,
    page: 1, // current page
  };

  async componentDidMount() {
    // here we will get repo details
    const { match } = this.props;

    const { page, issueFilter, per_page } = this.state;

    const repoName = decodeURIComponent(match.params.repository);

    const [repository, issues] = await Promise.all([
      api.get(`/repos/${repoName}`),
      api.get(`/repos/${repoName}/issues?page=${page}`, {
        params: {
          // adding a querystring
          state: issueFilter, // only opened issues
          per_page, // retrieve 5 issues
        },
      }),
    ]);

    this.setState({
      repository: repository.data,
      issues: issues.data,
      loading: 0,
    });
  }

  // when page or filter change
  async componentDidUpdate(_, prevState) {
    const { page, filter, repository, per_page } = this.state;
    if (prevState.page !== page || prevState.filter !== filter) {
      const issues = await api.get(
        `/repos/${repository.full_name}/issues?page=${page}`,
        {
          params: {
            state: filter,
            per_page,
          },
        }
      );

      console.log(repository);

      this.setState({ issues: issues.data });
    }
  }

  handleIssueFilter = async e => {
    this.setState({ filter: e.currentTarget.value, page: 1 });
  };

  handlePrevPage = async e => {
    const goPage = this.state.page - 1;
    this.setState({ page: goPage });
  };

  handleNextPage = async e => {
    const goPage = this.state.page + 1;
    this.setState({ page: goPage });
  };

  render() {
    // we implemented it because ESLint is warning on state declaration
    const { repository, issues, loading, page } = this.state;

    if (loading) {
      // we need to understand that we are working with React
      // It is a reactive programming. So, when the
      // this.state.loading is false (or 0) this component is
      // Listening for new updates. This is one of the greatests
      // features of React
      return <Loading>Loading</Loading>;
    }

    return (
      <Container>
        <Owner>
          <Link to="/">
            <FaArrowCircleLeft /> Back to repositories
          </Link>
          <img src={repository.owner.avatar_url} alt={repository.owner.login} />
          <h1>{repository.name}</h1>
          <p>{repository.description}</p>
        </Owner>
        <SelectIssueFilter onChange={this.handleIssueFilter}>
          <option value="all">Show all issues</option>
          <option value="open">Show only opened issues</option>
          <option value="closed">Show only closed issues</option>
        </SelectIssueFilter>
        <Pagination>
          <button onClick={this.handlePrevPage} disabled={page === 1}>
            <FaArrowLeft />
            Previous
          </button>
          <span>Page {this.state.page}</span>
          <button onClick={this.handleNextPage}>
            Next <FaArrowRight />
          </button>
        </Pagination>
        <IssueList>
          {issues.map(issue => (
            <li key={String(issue.id)}>
              <img src={issue.user.avatar_url} alt={issue.user.login} />
              <div>
                <strong>
                  <a href={issue.html_url}>{issue.title}</a>
                  {issue.labels.map(label => (
                    <span key={label.id}>{label.name}</span>
                  ))}
                </strong>
                <p>{issue.user.login}</p>
              </div>
            </li>
          ))}
        </IssueList>
      </Container>
    );
  }
}
