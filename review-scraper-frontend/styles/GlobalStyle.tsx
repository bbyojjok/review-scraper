import { Global, css } from '@emotion/react';

const globals = css`
  html,
  body {
    padding: 0;
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
      Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    background: #1a1a1a;
    color: #eee;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  * {
    box-sizing: border-box;
  }

  /*
  @media (prefers-color-scheme: dark) {
    html {
      color-scheme: dark;
    }
    body {
      color: white;
      background: black;
    }
  }
  */

  /* reset */
  body,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  ul,
  ol,
  li,
  dl,
  dt,
  dd,
  p,
  form,
  fieldset,
  input,
  table,
  tr,
  th,
  td {
    margin: 0;
    padding: 0;
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-weight: normal;
    font-size: 1rem;
  }
  ol,
  ul {
    list-style: none;
  }
  fieldset,
  img {
    border: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
`;

const GlobalStyle = () => {
  return <Global styles={globals} />;
};

export default GlobalStyle;
