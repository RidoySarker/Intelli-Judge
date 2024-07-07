import { ToastContainer } from "react-toastify";
import ContestList from "./contestList";

const Contest = () => {
    return (
        <>
            <div className="row mt-5">
                <ToastContainer/>
                <div className="col-lg-12">
                    <ContestList/>
                </div>
            </div>
        </>
    )
}

export default Contest;