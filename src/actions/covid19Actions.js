import axios from "axios";
import moment from "moment";
export const SET_INITIAL_DATA = "SET_INITIAL_DATA";

const csv = require("csv/lib/sync");

export const setInitialData = () => dispatch => {
  const currentDate = moment().format("MM-DD-YYYY")
  getCovidCSV(currentDate);
  function getCovidCSV(date){
    axios
      .get(
        `https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/${date}.csv`
      )
      .then(res => {
        let obj = {};
        csv
          .parse(res.data, {
            columns: true,
            skip_empty_lines: true
          })
          .filter(item => item.Country_Region === "US")
          .forEach(item => {
            obj = {
              ...obj,
              [item.Province_State]: {
                fips: item.FIPS.substring(0, 2),
                confirmed:
                  obj[item.Province_State] && obj[item.Province_State].confirmed
                    ? obj[item.Province_State].confirmed +
                      Number(item.Confirmed)
                    : Number(item.Confirmed),
                deaths:
                  obj[item.Province_State] && obj[item.Province_State].deaths
                    ? obj[item.Province_State].deaths + Number(item.Deaths)
                    : Number(item.Deaths),
                recovered:
                  obj[item.Province_State] && obj[item.Province_State].recovered
                    ? obj[item.Province_State].recovered +
                      Number(item.Recovered)
                    : Number(item.Recovered)
              }
            };
          });
        console.log(obj);
        dispatch({
          type: SET_INITIAL_DATA,
          payload: obj
        });
      })
      .catch(err => {
        console.error(err.message);
        let daysFromNow = Number(moment().format('DD')) - Number(moment(date).format('DD'));
        if(daysFromNow < 10){
          getCovidCSV(moment(date).subtract(1, "days").format("MM-DD-YYYY"));
        }
      });
  };
};

export const setDeaths = obj => dispatch => {};

export const setRecovered = obj => dispatch => {};
