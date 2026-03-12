import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useState, useEffect } from "react";

const Premium = () => {
    const [isUserPremium, setIsUserPremium] = useState(false);

    // const verifyPremiumUser = async () => {
    //     try {
    //         const res = await axios.get(`${BASE_URL}/premium/verify`, {
    //             withCredentials: true,
    //         });

    //         if (res.data.isPremium) {
    //             setIsUserPremium(true);
    //         } else {
    //             setIsUserPremium(false);
    //         }
    //     } catch (err) {
    //         console.error("Error verifying premium user:", err);
    //         setIsUserPremium(false); // fallback
    //     }
    // };


    useEffect(() => {
        const verifyPremiumUser = async () => {
            try {
                const res = await axios.get(`${BASE_URL}/premium/verify`, {
                    withCredentials: true,
                });

                setIsUserPremium(res.data.isPremium || false);
            } catch (err) {
                console.error("Error verifying premium user:", err);
                setIsUserPremium(false); // fallback
            }
        };

        verifyPremiumUser();
    }, []);


    const handleBuyClick = async (type) => {
        try {

            const createSession = await axios.post(
                BASE_URL + "/payment/create",
                {
                    membershipType: type,
                },
                { withCredentials: true }
            )

            window.location.href = createSession.data.url;

            // alert(saveBookingDetails.message)
        } catch (error) {
            console.log(error)
        }


    };


    return isUserPremium ? (
        "You're are already a premium user"
    ) : (
        <div className="m-10">
            <div className="flex w-full">
                <div className="card bg-base-300 rounded-box grid h-80 flex-grow place-items-center">
                    <h1 className="font-bold text-3xl">Silver Membership</h1>
                    <ul>
                        <li> - Chat with other people</li>
                        <li> - 100 connection Requests per day</li>
                        <li> - Blue Tick</li>
                        <li> - 3 months</li>
                    </ul>
                    <button
                        onClick={() => handleBuyClick("silver")}
                        className="btn btn-secondary"
                    >
                        Buy Silver
                    </button>
                </div>
                <div className="divider divider-horizontal">OR</div>
                <div className="card bg-base-300 rounded-box grid h-80 flex-grow place-items-center">
                    <h1 className="font-bold text-3xl">Gold Membership</h1>
                    <ul>
                        <li> - Chat with other people</li>
                        <li> - Inifiniye connection Requests per day</li>
                        <li> - Blue Tick</li>
                        <li> - 6 months</li>
                    </ul>
                    <button
                        onClick={() => handleBuyClick("gold")}
                        className="btn btn-primary"
                    >
                        Buy Gold
                    </button>
                </div>
            </div>
        </div>
    );
};
export default Premium;