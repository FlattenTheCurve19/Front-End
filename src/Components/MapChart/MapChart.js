import React, { useEffect, isValidElement, memo, useState } from "react";
import { useSelector } from "react-redux";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { scaleLinear } from "d3-scale";
import CircularProgress from "@material-ui/core/CircularProgress";
import styled from "styled-components";
import {Typography, Button} from '@material-ui/core';

const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

function MapChart({ setTooltipContent }) {
  const data = useSelector(state => state.covid19Reducer.countries);
  const [total, setTotal] = useState({
    Confirmed: 0,
    Deaths: 0,
    Recovered: 0
  });
  const [max, setMax] = useState(6000);

  useEffect(() => {
    if (data) {
      let largestValue;
      for (const state in data) {
        if (!largestValue || largestValue < data[state].confirmed) {
          largestValue = data[state].confirmed;
        }
      }
      setMax(largestValue);
      totalCount();
    }
  }, [data]);

  const totalCount = () => {
    const obj = {
      Deaths: 0,
      Confirmed: 0,
      Recovered: 0
    };

    for (const state in data) {
      obj.Deaths += data[state].deaths;
      obj.Confirmed += data[state].confirmed;
      obj.Recovered += data[state].recovered;
    }

    setTotal(obj);
  };

  const colorScale = value => {
    const color = scaleLinear()
      .domain([0, max ? max : 5000])
      .range(["#5fd4d8", "#1173d6"]);
    return color(value);
    // console.log(value);
    //   if(0 <= value && value <= max*(1/5)){
    //     return '#5fd4d8'
    //   } else if(max*(1/5) < value && value <= max*(2/5)){
    //     return '#5fb6d8';
    //   } else if(max*(2/5) < value && value <= max*(3/5)){
    //     return '#5f9cd8';
    //   } else if(max*(3/5) < value && value <= max*(4/5)){
    //     return '#3687d8';
    //   } else if(max*(4/5) < value && value <= max*(5/5)){
    //     return '#1173d6';
    //   } else {
    //     return '#eee';
    //   }
  };

  return (
    <>
    <Typography variant="h3" style={{textAlign: 'center'}}>View COVID-19 Cases in the US</Typography>
    <ChartWrapper >
      <DataChart>
        <Typography variant="h5">Total Confirmed Cases</Typography>
        <Typography variant="body2">There are a total of {total.Confirmed} cases in the U.S.</Typography>
        <ChartButton>Learn More</ChartButton>
        <br/>
        <br/>
        <Typography variant="h5">Total Recovered Cases</Typography>
        <Typography variant="body2">There are a total of {total.Recovered} cases that are confirmed in the U.S.</Typography>
        <ChartButton>Learn More</ChartButton>
        <br/>
        <br/>
        <Typography variant="h5">Total Deaths</Typography>
        <Typography variant="body2">At this time, there are {total.Deaths} deaths in the U.S.</Typography>
        <ChartButton>Learn More</ChartButton>
        
      </DataChart>
      {data ? (
        <USMapChart>
          <ComposableMap data-tip="" projection="geoAlbersUsa">
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map(geo => {
                  let cur = null;
                  for (const prop in data) {
                    if (geo.id === data[prop].fips) {
                      cur = {
                        ...data[prop],
                        state: prop
                      };
                    }
                  }
                  return (
                    <>
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        fill={
                          cur && cur.confirmed
                            ? colorScale(cur ? cur.confirmed : 0)
                            : "#eee"
                        }
                        onMouseEnter={e => {
                          setTooltipContent({
                            state: cur && cur.state,
                            confirmed: cur && cur.confirmed,
                            deaths: cur && cur.deaths,
                            recovered: cur && cur.recovered,
                            isVisible: true
                          });
                        }}
                        onMouseLeave={e => {
                          setTooltipContent({
                            state: null,
                            confirmed: null,
                            deaths: null,
                            recovered: null,
                            isVisible: false
                          });
                        }}
                        style={{
                          hover: {
                            opacity: 0.5,
                            outline: "none"
                          }
                        }}
                      />
                    </>
                  );
                })
              }
            </Geographies>
          </ComposableMap>
          <ScaleAndColorWrapper>
            <TitleWrapper>
              <Typography variant='h5'>Scale</Typography>
            </TitleWrapper>
            <div>
              <ScaleWrapper>
                <Typography variant="body2">0</Typography>
                <Typography variant="body2">{max}+</Typography>
              </ScaleWrapper>
              <FlexWrapper>
                <ColorSquare color={colorScale(max * (1 / 5))} />
                <ColorSquare color={colorScale(max * (2 / 5))} />
                <ColorSquare color={colorScale(max * (3 / 5))} />
                <ColorSquare color={colorScale(max * (4 / 5))} />
                <ColorSquare color={colorScale(max * (5 / 5))} />
              </FlexWrapper>
            </div>
          </ScaleAndColorWrapper>
        </USMapChart>
      ) : (
        <>
          <CircularProgress
            style={{
              width: "5%",
              height: "auto",
              position: "absolute",
              top: "40%"
            }}
          />
          <h1>Total Confirmed Cases of COVID-19 in the US</h1>

          <ComposableMap data-tip="" projection="geoAlbersUsa">
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map(geo => {
                  return (
                    <Geography key={geo.rsmKey} geography={geo} fill={"#eee"} />
                  );
                })
              }
            </Geographies>
          </ComposableMap>
          <ScaleAndColorWrapper>
            <TitleWrapper>
              <h3>Scale</h3>
            </TitleWrapper>
            <div>
              <ScaleWrapper>
                <p>0</p>
                <p>5000+</p>
              </ScaleWrapper>
              <FlexWrapper>
                <ColorSquare color={colorScale(100)} />
                <ColorSquare color={colorScale(500)} />
                <ColorSquare color={colorScale(1000)} />
                <ColorSquare color={colorScale(2000)} />
                <ColorSquare color={colorScale(5000)} />
              </FlexWrapper>
            </div>
          </ScaleAndColorWrapper>
        </>
      )}
    </ChartWrapper>
    </>
  );
}

const FlexWrapper = styled.div`
  display: flex;
`;

const ScaleAndColorWrapper = styled(FlexWrapper)`
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h5 {
    font-size: 16px;
    margin-bottom: 5px;
  }

  p {
    font-size: 14px;
  }
  
`;

const ScaleWrapper = styled(FlexWrapper)`
  width: 90px;
  justify-content: space-between;
`;

const ColorSquare = styled.div`
  width: 18px;
  height: 18px;
  background-color: ${props => props.color};
`;

const TitleWrapper = styled.div`
  width: 90px;
  text-align: left;
`;

const ChartWrapper = styled.div`
  display: flex; 
  width: 100%; 
  flex-wrap: nowrap; 
  flex-direction: row-reverse; 
  padding: 0 20px; 
  justify-content: center;
`;

const DataChart = styled.div`
  margin-top: 100px;
  width: 45%;
  padding: 0 25px;
  margin-left: 40px;

`;

const USMapChart = styled.div`
  width: 45%;
  padding 0 25px;
`;

const ChartButton = styled(Button)`
  border: 1px solid #5fd4d8;
  border-radius: 3px;
  background: transparent;
  padding: 4px 10px;
  color: #5fd4d8;
  font-size: 10px;
`;

export default memo(MapChart);
