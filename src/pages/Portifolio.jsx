import React, { useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
import DeleteIcon from "@material-ui/icons/Delete";
// import TextField from "@material-ui/core/TextField";
// import InputLabel from "@material-ui/core/InputLabel";
import {
  Select,
  TextField,
  InputLabel,
  MenuItem,
  Slider,
} from "@material-ui/core";
// import MenuItem from "@material-ui/core/MenuItem";

import {
  Container,
  Title,
  DataGridContainer,
  Painel,
  RightPainel,
  LeftPainel,
  Submit,
  Image,
  Results,
} from "./Components";

const stocks = [
  "MSFT",
  "NVDA",
  "PYPL",
  "NFLX",
  "VALE3.SA",
  "MGLU3.SA",
  "BIDI11.SA",
  "AAPL",
];

const Portifolio = () => {
  const columns = [
    {
      field: "name",
      headerName: "Ação",
      type: "string",
      flex: 0.5,
    },
    // {
    //   field: "risk",
    //   headerName: "Risco",
    //   flex: 0.2,
    // },
    // {
    //   field: "dateInit",
    //   headerName: "Início",
    //   type: "string",
    //   flex: 0.2,
    // },
    // {
    //   field: "dateEnd",
    //   headerName: "Fim",
    //   type: "string",
    //   flex: 0.2,
    // },
    {
      field: "weight",
      headerName: "% Alocada",
      type: "string",
      flex: 0.5,
    },
  ];
  const [rows, setRows] = useState([]);
  const [selectionModel, setSelectionModel] = useState([]);
  const [checkInDay, setCheckInDay] = useState("");
  const [checkOutDay, setCheckOutDay] = useState("");
  const [risk, setRisk] = useState(0);
  const [acao, setAcao] = useState("");
  const [id, setId] = useState(1);
  const [portifolioResult, setPortifolioResult] = useState({
    show: false,
    url: "",
    expectedReturn: "",
    volatility: "",
  });

  const handleClickCheckIn = (e) => {
    setCheckInDay(e.target.value);
  };

  const handleClickCheckOut = (e) => {
    setCheckOutDay(e.target.value);
  };

  const handleChangeAcao = (e) => {
    setAcao(e.target.value);
  };

  const handleChangeRisk = (e, value) => {
    setRisk(value);
  };

  const addStock = () => {
    setRows([
      ...rows,
      {
        id: id,
        name: acao,
        // dateInit: checkInDay, dateEnd: checkOutDay
      },
    ]);
    setId(id + 1);
  };

  const addWeights = (weights) => {
    let i = 0;
    setRows(
      rows.map((row) => {
        row["weight"] = weights[i];
        i = i + 1;
        return row;
      })
    );
  };

  const deleteStocks = () => {
    setRows(
      rows.filter(({ id }) => {
        let keep = true;
        selectionModel.forEach((row) => {
          if (row === id) {
            keep = false;
          }
        });
        return keep;
      })
    );
  };

  const portifolio = async () => {
    const choosedStock = rows.map((row) => {
      return { nome: row.name };
    });
    const data = {
      vlRisco: risk / 100,
      dtInicio: checkInDay,
      dtFim: checkOutDay,
      lstAcoes: choosedStock,
    };

    try {
      let response = await fetch("https://lucasapi.pythonanywhere.com/acao/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(data),
      });

      let result = await response.json();
      console.log(result);

      // setImage({show: true, url: result.imgUrl});
      let expectedReturn = result.resultado.shift();
      let volatility = result.resultado.shift();
      setPortifolioResult({
        show: true,
        url: result.imgUrl,
        expectedReturn: expectedReturn,
        volatility: volatility,
      });
      addWeights(result.resultado);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <Title>Markov Portifolio</Title>
      <DataGridContainer>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          checkboxSelection
          onSelectionModelChange={(newSelection) => {
            setSelectionModel(newSelection.selectionModel);
          }}
          selectionModel={selectionModel}
        />
      </DataGridContainer>
      <Painel>
        <LeftPainel>
          <DeleteIcon
            // style={{ margin: "auto unset" }}
            onClick={deleteStocks}
          />

          <InputLabel
            style={{ marginLeft: "15px" }}
            id="demo-simple-select-label"
          >
            Ação
          </InputLabel>
          <Select
            style={{ marginLeft: "15px", minWidth: "160px" }}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={acao}
            onChange={handleChangeAcao}
          >
            {/* <MenuItem value={"Ten"}>Ten</MenuItem>
            <MenuItem value={"Twenty"}>Twenty</MenuItem>
            <MenuItem value={"Thirty"}>Thirty</MenuItem> */}
            {stocks &&
              stocks.map((stock) => {
                return (
                  <MenuItem id={stock} value={stock}>
                    {stock}
                  </MenuItem>
                );
              })}
          </Select>
          <Submit onClick={addStock}>Adicionar</Submit>
        </LeftPainel>
        <RightPainel>
          <TextField
            id="date-inicio"
            label="Início"
            type="date"
            value={checkInDay}
            onChange={handleClickCheckIn}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            style={{ marginLeft: "15px" }}
            id="date-fim"
            label="Fim"
            type="date"
            value={checkOutDay}
            onChange={handleClickCheckOut}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <div style={{ marginLeft: "15px" }}>
            <p>Risco:</p>
            <Slider
              value={risk}
              onChange={handleChangeRisk}
              valueLabelDisplay="on"
              style={{ width: "160px" }}
              min={-100}
              max={100}
            />
          </div>
          <Submit onClick={portifolio}>Ver Portifólio</Submit>
        </RightPainel>
      </Painel>
      <Results>
        <p>
          {"Retorno do Esperado Portifolio" + portifolioResult.expectedReturn}
        </p>
        <p>{"Volatidade Portifolio" + portifolioResult.volatility}</p>
        <Image hidden={portifolioResult.show} src={portifolioResult.url} />
      </Results>
    </Container>
  );
};

export default Portifolio;
