import styled from 'styled-components';

export const Loading = styled.div`
  color: #fff;
  font-size: 3-px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const Owner = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;

  a {
    color: black;
    font-size: 16px;
    text-decoration: none;
    margin-right: auto;
    display: flex;
    padding: 5px;
    border-radius: 5px;

    svg {
      margin-right: 10px;
    }

    &:hover {
      color: #eee;
      background: #333;
      transition: all 200ms;
    }
  }

  img {
    width: 120px;
    border-radius: 50%;
    margin-top: 20px;
  }

  h1 {
    font-size: 24px;
    margin-top: 10px;
  }

  p {
    margin-top: 5px;
    font-size: 14px;
    color: #555;
    line-height: 1.4;
    text-align: center;
    max-width: 400px;
  }
`;

export const Pagination = styled.div`
  margin: 25px auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  span {
    border: solid #eee;
    border-width: 1px 0;
    padding: 15px;
  }

  button {
    display: flex;
    border: none;
    padding: 0.5rem 2rem;
    margin: 0;
    text-decoration: none;
    background: #000;
    color: #ffffff;
    font-family: sans-serif;
    font-size: 1rem;
    cursor: pointer;
    text-align: center;
    transition: background 150ms ease-in-out, transform 150ms ease;
    -webkit-appearance: none;
    -moz-appearance: none;

    svg {
      margin: 0 10px;
    }

    &:hover {
      background: #555;
    }

    &[disabled] {
      background: #555;
      cursor: not-allowed;
    }
  }
`;

export const IssueList = styled.ul`
  padding-top: 30px;
  margin-top: 30px;
  border-top: 1px solid #eee;
  list-style: none;

  li {
    display: flex;
    padding: 15px 10px;
    border: 1px solid #eee;
    border-radius: 4px;
  }

  & + li {
    margin-top: 10px;
  }

  img {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    border: 2px solid #eee;
  }

  div {
    flex: 1;
    margin-left: 15px;

    strong {
      font-size: 16px;

      a {
        text-decoration: none;
        color: #333;

        &:hover {
          color: #000
        }
      }

      span {
        background: #eee;
        color: #333;
        border-radius: 2px;
        font-size: 12px;
        font-weight: 600;
        height: 20px;
        line-height: 15px;
        padding: 3px 4px;
        margin-left: 10px
      }
    }

    p {
      margin-top: 5px;
      font-size: 12px;
      color: #999
    }
  }
}
`;

export const SelectIssueFilter = styled.select`
  margin-top: 15px;
  width: 100%;
`;
