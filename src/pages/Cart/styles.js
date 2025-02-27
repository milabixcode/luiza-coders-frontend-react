import styled from "styled-components";

import { darken } from "polished";

export const Container = styled.div`

  
    @import url('https://kit.fontawesome.com/249b1afbd0.js');
  
  .op{
    margin-bottom: 30px;
  }

  padding: 30px;
  background: #fff;
  border-radius: 4px;
  max-width: 70vw;
  margin: auto;

  .shipping{
    margin-top: 40px;
    display: flex;
    width: 100%;
    justify-content: space-between;

    select{
      width: 250px;
      height: 40px;
    }

    img{
      width: 120px;
      height: auto;
    }
  }
  .checkout {
    margin-top: 30px;
    display: flex;
    justify-content: space-between;

    align-items: center;

    button {
      background: #5960c1;
      color: #fff;
      border: 0;

      border-radius: 4px;
      padding: 12px 20px;
      font-weight: bold;
      text-transform: uppercase;

      transition: background 0.2s;

      &:hover {
        background: ${darken(0.1, "#5960c1")};
      }
    }
  }
`;

export const TableProducts = styled.table`
  width: 100%;

  thead th {
    color: #999;
    text-align: left;
    padding: 12px;
  }

  tbody td {
    padding: 12px;
    vertical-align: middle;
    border-bottom: 1px solid #eee;

    div.image {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  img {
    height: 100px;
  }

  strong {
    color: #333;
    display: block;
  }

  span {
    /* display: block; */
    margin-top: 5px;
    font-size: 18px;
    font-weight: bold;
  }

  div {
    display: flex;
    align-items: center;

    input {
      border: 1px solid #ddd;
      border-radius: 4px;
      color: #666;
      padding: 6px;
      width: 50px;
    }
  }

  button {
    background: none;
    border: 0;
    padding: 8px;
  }
`;

export const Total = styled.div`
  display: flex;
  flex-direction: column;

  align-items: center;

  span {
    color: #999;
    font-weight: bold;
  }

  strong {
    font-size: 28px;
    margin-left: 5px;
  }
`;
