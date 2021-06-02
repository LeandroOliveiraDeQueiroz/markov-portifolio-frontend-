import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 100%;
  text-align: center;
  padding: 20px;
  max-width: 1800px;
  box-sizing: border-box;
`;

const Title = styled.h2`
  margin: 0px 0px 20px 0px;
`;

const DataGridContainer = styled.div`
  width: 90%;
  margin: auto;
  height: 300px;
`;

const Painel = styled.div`
  text-align: left;
  width: 90%;
  margin: auto;
  display: flex;
`;

const LeftPainel = styled.div`
  display: flex; // painel em uma linha
  text-align: left;
  align-items: center;
  padding: 10px 0px 0px;
`;

const RightPainel = styled.div`
  display: flex;
  margin-left: auto; // painel em uma linha
  align-items: center;
  justify-content: flex-end;
`;

const Submit = styled.button`
   padding: 0.35em 1.2em;
   border: 0.1em solid #ffffff;
   border-radius: 0.12em;
   box-sizing: border-box;
   text-decoration: none;
   font-family: "Roboto", sans-serif;
   font-weight: 300;
   color: #ffffff;
  background: rgba(0, 0, 0, 0.7);
  height: 30px;
  /* margin: auto unset; */
  margin-left: 15px;
`;

const Image = styled.img`
  margin: auto;
  max-width: 500px;
  display: ${(props) => (props.show ? "block" : "none")};
`;

export {
  Container,
  Title,
  DataGridContainer,
  Painel,
  RightPainel,
  LeftPainel,
  Submit,
  Image,
};
