import Header from "../Shared/Header";
import Offcanvas from "../Shared/Offcanvas";
import PageBannerStart from "../Component/Course/PageBannerStart";
import React, {useEffect, useState} from "react";
import http from "../interceptors/http";

export default function UserReferralList() {
    const [referralUsers, setReferralUsers] = useState([]);

    const fetchReferralUser = async () => {
        try {
            const email = localStorage.getItem('userEmail');
            const {data: data} = await http.get(`/frontend/fetch-referral-user/${email}`)
            setReferralUsers(data.data);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchReferralUser();
    }, []);

    return (
        <>
            <Header/>
            <Offcanvas/>
            <PageBannerStart name="Referrals Users"/>
            <div className="section section-padding">
                <div className="container">
                    <div className='row'>
                        <div class="col-lg-12">
                            <div class="main-box clearfix">
                                <div class="table-responsive">
                                    <table className="table user-list">
                                        <thead>
                                        <tr>
                                            <th><span>User</span></th>
                                            <th><span>Created</span></th>
                                            <th><span>Email</span></th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {referralUsers && referralUsers.map((user) => {
                                                return (
                                                    <tr>
                                                        <td>
                                                            <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
                                                                 style={{
                                                                     position: 'relative',
                                                                     maxWidth: ' 50px',
                                                                     float: 'left',
                                                                     marginRight: '15px',
                                                                 }} alt=""/>
                                                            <a href="#" className="user-link">{user.user.name}</a>
                                                        </td>
                                                        <td>
                                                            { new Date(user.user.createdAt).toDateString() }
                                                        </td>
                                                        <td>
                                                            <a href="#">{user.user.email}</a>
                                                        </td>
                                                    </tr>
                                                );
                                            }
                                        )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}