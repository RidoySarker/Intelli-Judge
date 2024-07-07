import React, {useEffect, useState} from 'react';
import Header from "../Shared/Header";
import Offcanvas from "../Shared/Offcanvas";
import PageBannerStart from "../Component/Course/PageBannerStart";
import Chart from "react-apexcharts";
import CalendarHeatmap from 'react-calendar-heatmap';
import ReactTooltip from 'react-tooltip';
import 'react-calendar-heatmap/dist/styles.css';
import http from "../interceptors/http";

const today = new Date();
const Dashboard = () => {
    const [donutSeries, setDonutSeriesState] = useState([44, 55, 41]);

    const [donutOptions, setDonutOptionsState] = useState({
        chart: {
            type: 'radialBar',
        },
        legend: {
            show: true,
            labels: {
                useSeriesColors: true,
            },
            markers: {
                size: 0
            },
            itemMargin: {
                horizontal: 1,
            }
        },
        colors: ["#1cbaba", "#ffb700", "#f63737"],
        labels: ["Easy", "Medium", "Hard"],
        responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                    width: 200
                },
                legend: {
                    position: 'bottom'
                }
            }
        }]
    });

    const shiftDate = (date, numDays) => {
        const newDate = new Date(date);
        newDate.setDate(newDate.getDate() + numDays);
        return newDate;
    }

    const randomValues = getRange(200).map(index => {
        return {
            date: shiftDate(today, -index),
            count: getRandomInt(1, 3),
        };
    });

    function getRange(count) {
        return Array.from({length: count}, (_, i) => i);
    }

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const fetchDashboardData = async () => {
        try {
            let email = localStorage.getItem('userEmail');
            const {data: data} = await http.get(`/frontend/fetch-dashboard`, {
                params: {
                    email: email,
                }
            });
            console.log({data});
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchDashboardData();
    }, []);

    return (<>
        <Header/>
        <Offcanvas/>
        <PageBannerStart name="Dashboard"/>
        <div className="section section-padding">
            <div className="container">
                <div className='row'>
                    <div className="col-lg-2">
                        <div className="card"
                             style={{boxShadow: '0 4px 10px rgba(0,0,0,0.16), 0 4px 10px rgba(0,0,0,0.23)'}}>
                            <img src="https://h-o-m-e.org/wp-content/uploads/2022/04/Blank-Profile-Picture-3.jpg"
                                 style={{borderRadius: '50%'}}
                                 alt="Avatar"/>
                            <center><h3>Name</h3></center>
                        </div>
                    </div>
                    <div className="col-lg-10">
                        <div className="card">
                            <div className="row">
                                <div className="col-md-6">
                                    <Chart options={donutOptions} series={donutSeries} type="radialBar" height="200"/>
                                </div>
                                <div className="col-md-6 d-flex" style={{
                                    flexDirection: "row",
                                    justifyContent: "space-around",
                                    alignItems: "center"
                                }}>
                                    <div className="card">
                                        <div className="d-flex p-2"
                                             style={{
                                                 flexDirection: "column",
                                                 justifyContent: "center",
                                                 backgroundColor: "#00000005",
                                                 minWidth: "5vw",
                                             }}>
                                            <p style={{color: "#1cbaba"}}><strong>Easy</strong></p>
                                            <p>25/808</p>
                                        </div>
                                    </div>
                                    <div className="card">
                                        <div className="d-flex p-2"
                                             style={{
                                                 flexDirection: "column",
                                                 justifyContent: "center",
                                                 backgroundColor: "#00000005",
                                                 minWidth: "5vw",
                                             }}>
                                            <p style={{color: "#ffb700"}}><strong>Med</strong></p>
                                            <p>4/1682</p>
                                        </div>
                                    </div>
                                    <div className="card">
                                        <div className="d-flex p-2"
                                             style={{
                                                 flexDirection: "column",
                                                 justifyContent: "center",
                                                 backgroundColor: "#00000005",
                                                 minWidth: "5vw",
                                             }}>
                                            <p style={{color: "#f63737"}}><strong>Hard</strong></p>
                                            <p>0/714</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row mt-1">
                    <div className="col-lg-2"></div>
                    <div className="col-lg-10">
                        <div className="card" style={{height: "35vh"}}>
                            <h3 className="p-1">0 Submission last 150days</h3>
                            <CalendarHeatmap
                                startDate={shiftDate(today, -200)}
                                endDate={today}
                                values={randomValues}
                                classForValue={value => {
                                    if (!value) {
                                        return 'color-empty';
                                    }
                                    return `color-github-${value.count}`;
                                }}
                                tooltipDataAttrs={value => {
                                    return {
                                        'data-tip': `${value.date.toISOString().slice(0, 10)} has count: ${
                                            value.count
                                        }`,
                                    };
                                }}
                                showWeekdayLabels={true}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <ReactTooltip/>
        </div>
    </>);
}

export default Dashboard;