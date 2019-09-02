import styled, { keyframes, css } from 'styled-components';

export const Container = styled.div`
  max-width: 700px;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  padding: 30px;
  margin: 80px auto;

  h1 {
    font-size: 20px;
    display: flex;
    flex-direction: row;
    align-items: center;

    svg {
      /* for icon */
      margin-right: 10px;
    }
  }
`;

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
