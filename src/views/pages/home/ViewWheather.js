import { TextField, Typography, InputAdornment, Button, Container, Grid, IconButton } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import ApiConfig from 'src/config/APIConfig';
import { toast } from "react-toastify";
import moment from 'moment';
import { useLocation, useNavigate } from 'react-router-dom';
import DataLoader from 'src/component/DataLoader';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

const useStyles = makeStyles((theme) => ({
    viewWheatherContainer: {
        "& .backgroundImageContainer": {
            backgroundColor: 'coral',


            "& .textContainer": {
                padding: '50px 0',
                maxWidth: '900px',
                margin: '0 auto',

                "& h2 , h4": {
                    textAlign: 'center',
                    color: '#FFF',
                    fontWeight: 700,
                },

                "& h4": {
                    maxWidth: '500px',
                    margin: '20px auto',
                },
            },

        },

        "& .filtersContainer": {
            marginTop: '30px',
            padding: '0 30px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '50px',

            "& .go-back": {
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
            },

            "& .textfield": {
                maxWidth: '500px',

                "& .MuiOutlinedInput-root": {
                    paddingRight: '0px',
                    backgroundColor: '#efe9e9',
                },

                "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: 'transparent',
                },

                "& .searchBtn": {
                    height: '55px',
                    borderRadius: '0 5px 5px 0',
                }

            },

            "& .buttonGroup": {
                padding: '5px',
                background: '#e8e8e8',
                display: 'flex',
                alignItems: 'center',
                gap: '15px',
                cursor: 'pointer',


                "& .active": {
                    padding: '10px',
                    background: "white",
                    borderRadius: '5px',
                    transition: 'background 0.3s, padding 0.3s'
                },

            }


        },

        "& .contentContainer": {

            padding: '30px 24px',

            "& .wheatherData": {

                "& .date-time": {
                    color: '#eb6e4b',
                },

                "& .city-country": {
                    fontWeight: 700,
                },

                "& .city-temp": {
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                },

                "& .feels_like": {
                    fontWeight: 600,
                },


            },
        }


    },
}));

export default function ViewWheather() {
    const classes = useStyles();
    const location = useLocation();
    const navigate = useNavigate();
    const cityName = new URLSearchParams(location.search).get('cityName');
    const [searchQuery, setSearchQuery] = useState("");
    const [wheatherData, setWheatherData] = useState({})
    const [selectedUnit, setSelectedUnit] = useState("metric");
    const [loading, setLoading] = useState(false);

    let appid = "ef1440ee7691cf3ea549aedc8bf7551c"
    let currentDateTime = moment();

    const getWheatherOfCity = async () => {
        try {
            setLoading(true);
            const response = await axios({
                method: "GET",
                url: ApiConfig.viewCityWheather,
                params: {
                    q: searchQuery ? searchQuery : cityName,
                    appid: appid,
                    units: selectedUnit ? selectedUnit : null,
                }
            });

            if (response.status === 200) {
                setLoading(false);
                setWheatherData(response?.data);
            }
        } catch (error) {
            if (error.response) {
                setLoading(false);
                toast.error(error.response?.data?.responseMessage);
            }
        }
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    }

    const handleUnitChange = (unit) => {
        setSelectedUnit(unit);
    }

    console.log("suggestedCities", wheatherData)


    useEffect(() => {
        getWheatherOfCity();
    }, [selectedUnit]);

    useEffect(() => {
        const timer = setTimeout(() => {
            getWheatherOfCity();
        }, 300);

        return () => clearTimeout(timer);
    }, [searchQuery]);


    return (
        <div className={classes.viewWheatherContainer}>
            <div className='backgroundImageContainer'>
                <div className='textContainer'>
                    <Typography variant='h2'>Beat the weather!</Typography>
                    <Typography variant='h4'>Search the name of the city and know about its wheather</Typography>
                </div>
            </div>

            <div className='filtersContainer'>
                <div className='go-back'>
                    <IconButton onClick={() => navigate(-1)}>
                        <KeyboardBackspaceIcon />
                    </IconButton>

                    <Typography variant='h4'>Go Back</Typography>
                </div>
                <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Search City"
                    className="textfield"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <Button
                                    variant="containedPrimary"
                                    className='searchBtn'
                                    onClick={getWheatherOfCity}
                                    disabled={!searchQuery}
                                >
                                    Search
                                </Button>
                            </InputAdornment>
                        ),
                    }}
                />

                <div className='buttonGroup'>
                    <div className={selectedUnit === "metric" ? "active" : ""} onClick={() => handleUnitChange("metric")}>
                        Metric: &deg;C , m/s
                    </div>

                    <div className={selectedUnit === "imperial" ? "active" : ""} onClick={() => handleUnitChange("imperial")}>
                        Imperial: &deg;F , mph
                    </div>
                </div>
            </div>

            {
                loading ? (<DataLoader />) : (

                    Object.keys(wheatherData).length > 0 && (
                        <Container maxWidth='lg'>
                            <Grid container spacing={2} className='contentContainer'>
                                <Grid item xs={12} sm={12} md={6}>

                                    <div className='wheatherData'>
                                        <Typography variant='body2' className='date-time'>{currentDateTime.format("YYYY-MM-DD HH:mm a")}</Typography>

                                        <Typography variant='h2' className='city-country'>{wheatherData?.name ?? "N/A"} {","}{wheatherData?.sys?.country ?? "N/A"}</Typography>

                                        <div className='city-temp'>
                                            <img src={`https://openweathermap.org/img/wn/${wheatherData?.weather[0]?.icon}.png`} alt="" />


                                            {
                                                selectedUnit === "metric" && (
                                                    <Typography variant='h2'>{Math.floor(wheatherData?.main?.temp)}&deg;C</Typography>
                                                )
                                            }


                                            {
                                                selectedUnit === "imperial" && (

                                                    <Typography variant='h2'>{Math.floor(wheatherData?.main?.temp)}&deg;F</Typography>
                                                )
                                            }
                                        </div>

                                        <div className='wheather-metadata'>
                                            {
                                                selectedUnit === "metric" && (
                                                    <Typography varinat='h6' className='feels_like'>Feels Like {Math.floor(wheatherData?.main?.feels_like)}&deg;C {","} {wheatherData?.weather[0]?.description}</Typography>
                                                )
                                            }


                                            {
                                                selectedUnit === "imperial" && (
                                                    <Typography varinat='h6' className='feels_like'>Feels Like {Math.floor(wheatherData?.main?.feels_like)}&deg;F {","} {wheatherData?.weather[0]?.description}</Typography>
                                                )
                                            }


                                            <Typography variant='body2'>Humidity: {wheatherData?.main?.humidity}%</Typography>
                                            <Typography variant='body2'>Pressure: {wheatherData?.main?.pressure}hPa</Typography>

                                            <Typography variant='body2'>Maximum Tempreture: {wheatherData?.main?.temp_max}&deg;C</Typography>

                                            <Typography variant='body2'>Visibility: {(wheatherData?.visibility) / 1000} km</Typography>
                                        </div>

                                    </div>
                                </Grid>


                            </Grid>
                        </Container>
                    )

                )
            }
        </div>
    )
}
