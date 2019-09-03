import styled, { keyframes, css } from 'styled-components';

export const Form = styled.form`
  margin-top: 30px;
  display: flex;
  flex-direction: row;

  input {
    flex: 1;
    border: 1px solid #eee;
    padding: 10px 15px;
    border-radius: 4px;
    font-size: 16px;
  }
`;

// rotating animation
const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const SubmitButton = styled.button.attrs(props => ({
  /* Here we can set the traditional HTML tag`s properties */
  type: 'submit',
  disabled: props.loading,
}))`
  background: #000;
  border: 0;
  padding: 0 15px;
  margin-left: 10px;
  border-radius: 4px;

  /* centering text */
  display: flex;
  justify-content: center;
  align-items: center;

  /* & means the element itself, we can use like &:hover */
  &[disabled] {
    cursor: not-allowed;
    opacity: 0.6;
  }

  /* applying rotation when is requesting */
  ${props =>
    props.loading &&
    css`
      svg {
        animation: ${rotate} 2s linear infinite;
      }
    `}
`;

export const List = styled.ul`
  list-style: none;
  margin-top: 30px;

  li {
    padding: 15px 0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    /* & + li means that the style will be applyied since the second sequence of <li> */
    & + li {
      border-top: 1px solid #eee;
    }

    a {
      color: #000;
      text-decoration: none;
      transition: all 200ms;
    }

    a:hover {
      background: #000;
      color: white;
    }
  }
`;
