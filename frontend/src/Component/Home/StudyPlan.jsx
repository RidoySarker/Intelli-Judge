import React, {useEffect, useState} from "react";
import Header from "../../Shared/Header";
import Offcanvas from "../../Shared/Offcanvas";
import Footer from "../../Shared/Footer";
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin, {Draggable} from '@fullcalendar/interaction'
import {INITIAL_EVENTS, createEventId} from '../../event-utils'
import {v4 as uuid} from "uuid";
import 'react-responsive-modal/styles.css';
import {Modal} from 'react-responsive-modal';
import {useFormik} from "formik";
import * as Yup from "yup";
import http from "../../interceptors/http";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PageBannerStart from "../Course/PageBannerStart";

const styles = {
    fontFamily: "sans-serif", textAlign: "center"
};

const EventItem = ({info}) => {
    const {event} = info;
    return (<div>
        <p>{event.title}</p>
    </div>);
};
export default function StudyPlan() {
    const [events, setEvents] = useState([]);
    const [open, setOpen] = useState(false);
    const [getColor, setColor] = useState(null);

    const handleSelect = (info) => {
        const {start, end} = info;
        // console.log(start)
        // console.log(end)
        // console.log(new Date().toString())
        // setOpen(true)
        const eventNamePrompt = prompt("Enter, event name");
        if (eventNamePrompt) {
            setEvents([...events, {
                start, end, title: eventNamePrompt, id: uuid()
            }]);
        }
    };

    const studyPlanForm = useFormik({
        initialValues: {
            start_date: '', end_date: '', title: '', status: '', email: '',color:''
        },
        validationSchema: Yup.object({
            start_date: Yup.string().required('Start Date Is Required'),
            end_date: Yup.string().required('End Date Is Required'),
            color: Yup.string().required('Color Is Required'),
            title: Yup.string().required('Title Is Required'),
        }),
        onSubmit: (values, {resetForm}) => {
            onCloseModal();
            values['email'] = localStorage.getItem('userEmail');
            values['start_date'] = new Date(values.start_date);
            values['end_date'] = values.end_date ? new Date(values.end_date) : null;
            values['status'] = 1;
            http.post(`/create-study-plan`, values)
                .then(() => {
                    toast.success('Create Successfully !', {
                        position: toast.POSITION.TOP_RIGHT
                    });
                    resetForm();
                    return fetchStudyPlan();
                })
                .catch(({error}) => {
                    console.log(error)
                });
        },
    });

    const fetchStudyPlan = async () => {
        try {
            const email = localStorage.getItem('userEmail');
            const {data: data} = await http.get(`/fetch-study-plan/${email}`);
            setEvents(data.data)
        } catch (error) {
            console.log(error)
        }
    }

    const handleEventClick = (clickInfo) => {
        // console.log(clickInfo)
        // clickInfo.event.remove()
    }

    const newEvent = (click) => {
        console.log(click);
    }

    const handleEventReceive = (eventClick) => {
        const values = {
            'start_date': new Date(eventClick.event.start),
            'end_date': eventClick.event.end ? new Date(eventClick.event.end) : null
        }
        http.post(`/update-study-plan/${eventClick.event.id}`, values)
            .then(() => {
                toast.success('Update Successfully !', {
                    position: toast.POSITION.TOP_RIGHT
                });
                return fetchStudyPlan();
            })
            .catch(({error}) => {
                console.log(error)
            });
    }


    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);

    useEffect(() => {
        fetchStudyPlan();
    }, []);

    return (<>
        <Header/>
        <Offcanvas/>
        <PageBannerStart name="Study Plan"/>
        <div className="section section-padding">
            <div className="container">
                <div className="course-list-wrapper">
                    <div className='row' style={{marginTop: '70px'}}>
                        <div className='col-md-10'></div>
                        <div className='col-md-2' style={styles}>
                            <button className='btn btn-sm btn-info'
                                    style={{float: "right"}}
                                    onClick={onOpenModal}>New Plan
                            </button>
                            <Modal open={open} onClose={onCloseModal} center style={styles}>
                                <h6 style={{marginTop: '10px'}}>New Plan</h6>
                                <form className="row g-3 needs-validation" noValidate
                                      onSubmit={studyPlanForm.handleSubmit} style={{marginTop: '10px'}}>
                                    {/*<p style={{ width:'500px'}}>*/}
                                    {/*    <input type='text' className='form-control' name='name'/>*/}
                                    {/*</p>*/}
                                    <div className="col-md-6">
                                        <label id='start_date'>Start Date</label>
                                        <input type="date"
                                               className="form-control form-control-sm"
                                               id='start_date'
                                               onChange={studyPlanForm.handleChange}
                                            // onBlur={studyPlanForm.handleBlur}
                                               value={studyPlanForm.values.start_date}
                                        />
                                        <div className="text-danger">
                                            {
                                                studyPlanForm.touched.start_date &&
                                                studyPlanForm.errors.start_date &&
                                                (<div>{studyPlanForm.errors.start_date}</div>)
                                            }
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <label id='end_date'>End Date</label>
                                        <input type="date"
                                               className="form-control form-control-sm"
                                               id='end_date'
                                               onChange={studyPlanForm.handleChange}
                                               onBlur={studyPlanForm.handleBlur}
                                               value={studyPlanForm.values.end_date}
                                        />
                                        <div className="text-danger">
                                            {
                                                studyPlanForm.touched.end_date &&
                                                studyPlanForm.errors.end_date &&
                                                (<div>{studyPlanForm.errors.end_date}</div>)
                                            }
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <label id='title'>Title</label>
                                        <input type="text"
                                               className="form-control form-control-sm"
                                               id='title'
                                               onChange={studyPlanForm.handleChange}
                                               onBlur={studyPlanForm.handleBlur}
                                               value={studyPlanForm.values.title}
                                        />
                                        <div className="text-danger">
                                            {
                                                studyPlanForm.touched.title &&
                                                studyPlanForm.errors.title &&
                                                (<div>{studyPlanForm.errors.title}</div>)
                                            }
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <label id='color'>Color</label>
                                        <input type="color"
                                               name="color"
                                               id='color'
                                               onChange={studyPlanForm.handleChange}
                                               onBlur={studyPlanForm.handleBlur}
                                               value={studyPlanForm.values.color}
                                        />
                                        <div className="text-danger">
                                            {
                                                studyPlanForm.touched.color &&
                                                studyPlanForm.errors.color &&
                                                (<div>{studyPlanForm.errors.color}</div>)
                                            }
                                        </div>
                                    </div>
                                    <div className="mt-5">
                                        <button type='submit' className='btn btn-info btn-sm'
                                                style={{marginTop: '10px'}}>
                                            <i className='fa fa-save'></i>
                                        </button>
                                    </div>
                                </form>
                            </Modal>
                        </div>
                    </div>
                    <div className="row card mt-1">
                        <div className="col-md-12" style={{marginTop: '50px'}}>
                            <FullCalendar
                                editable={true}
                                selectable={true}
                                events={events}
                                // select={handleSelect}
                                headerToolbar={{
                                    start: "today prev next",
                                    center: 'title',
                                    end: "dayGridMonth dayGridWeek dayGridDay"
                                }}
                                eventContent={(info) => <EventItem info={info}/>}
                                eventClick={handleEventClick}
                                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                                views={["dayGridMonth", "dayGridWeek", "dayGridDay"]}
                                eventDrop={handleEventReceive}
                                // eventTextColor={'red'}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Footer/>
        <ToastContainer/>
    </>)
}