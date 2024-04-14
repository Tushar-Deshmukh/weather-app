import React, { useEffect, useRef, useState } from "react";
import makeStyles from '@mui/styles/makeStyles';
import {
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import ApiConfig from "src/config/APIConfig";
import axios from "axios";
import { toast } from "react-toastify";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useNavigate } from "react-router-dom";


const useStyles = makeStyles((theme) => ({
  wheaterAppContaier: {
    height: '100%',

    "& .backgroundContainer": {
      height: '400px',
      background: "cadetblue",

      "& h2": {
        textAlign: 'center',
        fontWeight: '700',
        fontFamily: 'Poppins',
        textTransform: 'capitalize',
        paddingTop: '50px',

        "& span": {
          color: '#fff',
        }
      },

      "& h5": {
        margin: '30px auto',
        fontWeight: 500,
        textAlign: 'center',
        maxWidth: '900px',
        color: '#fff',
      },
    },
    "& .tableContainer": {
      display: 'flex',
      justifyContent: 'center',
      height: '100%',
      minHeight: '700px',
      marginTop: '30px',

      "& .MuiTableContainer-root": {
        maxWidth: "1200px",
        height: '650px',
      },

      "& .MuiTableHead-root": {
        position: 'sticky',
        top: 0,


        "& .MuiTableCell-root": {
          backgroundColor: '#EC1F24',
          color: '#fff',
        },
      },

      "& .tableBody": {
        "& .MuiTableRow-root": {
          background: "beige",
          borderTop: "3px solid white",
        }
      },

      "& .updownArrowContainer": {
        display: 'flex',
        flexDirection: 'column',

        "& button": {
          padding: '0'
        }
      },
    },
  },
}));


export default function WheatherApp() {
  const classes = useStyles();
  const [cityList, setCityList] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [sort, setSort] = useState("");
  const tableRef = useRef();
  const navigate = useNavigate();


  const fetchCityData = async () => {
    try {
      const response = await axios({
        method: 'GET',
        url: ApiConfig.cities,
        params: {
          page: page,
          rows: 40,
          sort: sort,
          start: 0,
          fields: "geoname_id,name,cou_name_en,ascii_name,alternate_names,population,dem,timezone,country_code,coordinates",
          dataset: "geonames-all-cities-with-a-population-1000",
          timezone: "Asia/Kolkata",
          lang: "en",
        }
      });

      if (response.status === 200) {
        const newCityList = response.data.records;
        setCityList(prevCityList => [...prevCityList, ...newCityList]);
        setPage(prevPage => prevPage + 1);
        setHasMore(newCityList.length > 0);
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response?.data?.responseMessage);
      }
    }
  }

  useEffect(() => {
    fetchCityData();
  }, [sort, hasMore])


  useEffect(() => {
    const handleScroll = () => {
      console.log("Scrolling detected");
      const tableContainer = tableRef.current;

      if (tableContainer) {
        const isScrolledToBottom = tableContainer.scrollTop + tableContainer.clientHeight >= tableContainer.scrollHeight;

        console.log("isScrolledToBottom", isScrolledToBottom)
        if (isScrolledToBottom && hasMore) {
          fetchCityData();
        }
      }
    };

    const tableContainer = tableRef.current;
    if (tableContainer) {
      tableContainer.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (tableContainer) {
        tableContainer.removeEventListener('scroll', handleScroll);
      }
    };
  }, [hasMore]);


  const ascendingSortingHandler = (header) => {
    let sortCriteria = header === "Name" ? "-name" : header === "Population" ? "-population" : header === "Digital Elevation Model" ? "-dem" : "";
    setSort(sortCriteria);
  };

  const descendingSortingHandler = (header) => {
    let sortCriteria = header === "Name" ? "name" : header === "Population" ? "population" : header === "Digital Elevation Model" ? "dem" : "";
    setSort(sortCriteria);
  };

  const handleViewBtnClick = (cityName) => {
    navigate({
      pathname: '/view-wheather',
      search: `?cityName=${encodeURIComponent(cityName)}`
    })
  }


  return (
    <div className={classes.wheaterAppContaier}>
      <div className="backgroundContainer">
        <Typography variant="h2">Welcome to , <span>Infinite scroll - Weather Forecast Web Application</span></Typography>

        <Typography variant="h5">
          To view the weather forecast for a specific city, simply click on the "View" button corresponding to that city's row. Upon clicking, you'll be presented with the weather information for the selected city.
        </Typography>
      </div>

      <div className="tableContainer">
        <TableContainer ref={tableRef}>
          <Table>
            <TableHead>
              <TableRow>
                {[
                  "Sr no",
                  "Geoname Id",
                  "Name",
                  "Country Name EN",
                  "ASCII Name",
                  "Alternate Name",
                  "Population",
                  "Digital Elevation Model",
                  "Timezone",
                  "Country Code",
                  "Co-ordinates",
                  "Action"
                ].map((header, index) => (
                  <TableCell key={index} align="center" style={{ whiteSpace: 'nowrap', }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div>
                        {header}
                      </div>

                      {
                        (header === "Name" ||
                          header === "Digital Elevation Model" ||
                          header === "Population") && (
                          <div className="updownArrowContainer">
                            <IconButton onClick={() => ascendingSortingHandler(header)}>
                              <KeyboardArrowUpIcon fontSize="small" />
                            </IconButton>

                            <IconButton onClick={() => descendingSortingHandler(header)}>
                              <KeyboardArrowDownIcon fontSize="small" />
                            </IconButton>
                          </div>
                        )
                      }
                    </div>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody className='tableBody'>
              {cityList.map((city, index) => (
                <TableRow key={index}>
                  <TableCell align="center">{index + 1}</TableCell>

                  <TableCell align="center">
                    {city?.fields?.geoname_id ? city?.fields?.geoname_id : "N/A"}
                  </TableCell>

                  <TableCell align="center">
                    {city?.fields?.name ? city?.fields?.name : "N/A"}
                  </TableCell>

                  <TableCell align="center">
                    {city?.fields?.cou_name_en ? city?.fields?.cou_name_en : "N/A"}
                  </TableCell>


                  <TableCell align="center">
                    {city?.fields?.ascii_name ? city?.fields?.ascii_name : "N/A"}
                  </TableCell>

                  <TableCell align="center">
                    {city?.fields?.alternate_names &&
                      city?.fields?.alternate_names.length > 20 ? `${city?.fields?.alternate_names.substring(0, 20)}...` : city?.fields?.alternate_names}
                  </TableCell>

                  <TableCell align="center">
                    {city?.fields?.population ? city?.fields?.population : "N/A"}
                  </TableCell>

                  <TableCell align="center">
                    {city?.fields?.dem ? city?.fields?.dem : "N/A"}
                  </TableCell>

                  <TableCell align="center">
                    {city?.fields?.timezone ? city?.fields?.timezone : "N/A"}
                  </TableCell>

                  <TableCell align="center">
                    {city?.fields?.country_code ? city?.fields.country_code : "N/A"}
                  </TableCell>

                  <TableCell align="center">
                    {city?.fields?.coordinates && city.fields.coordinates.map((item, index) => (
                      <span key={index}>
                        {item}{index < city.fields.coordinates.length - 1 ? ',' : ''}
                      </span>
                    ))}
                  </TableCell>
                  <TableCell
                    align="center"

                  >
                    <Button variant='outlined' onClick={() => handleViewBtnClick(city?.fields?.ascii_name)}>View</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>

          </Table>
        </TableContainer>
      </div>

    </div>
  );
}

