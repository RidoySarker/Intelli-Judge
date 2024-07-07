import { toast, ToastContainer } from "react-toastify";
import ContestList from "./contestList";
import http from "../../../../interceptors/http";
import { useEffect, useState } from "react";

const Contest = () => {
    const [contests, setContests] = useState([]);

    const getContests = async () => {
        try {
            const {data: data} = await http.get(`/contest`)
            setContests(data.data);
        } catch (error) {
            console.log(error)
        }
    }

    const deleteContest = async (id) => {
        try {
            await http.delete(`/contest/${id}`);
            toast.success("Contest Deleted Successfully");
            return getContests();
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getContests();
    }, []);

    return (
        <>
            <div className="row mt-5">
                <ToastContainer/>
                <div className="col-lg-12">
                    <ContestList
                        contests={contests}
                        deleteContest={deleteContest}
                    />
                </div>
            </div>
        </>
    )
}

export default Contest;