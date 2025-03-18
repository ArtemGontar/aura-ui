import {useLocation, useNavigate} from "react-router-dom";
import {useCallback, useEffect} from "react";
import WebApp from "@twa-dev/sdk";

/**
 * This hook sends a request to telegram to display button to navigate back in history.
 * It is used only once in Root. tsx. This hook automatically shows the button if the current route is not root (/).
 * To navigate back, useNavigate(-1) hook from React Router is used.
 */
export default function useTelegramBackButton() {
    const navigate = useNavigate();
    const location = useLocation();
    const goBack = useCallback(() => {
        navigate(-1);
    }, [navigate]);

    useEffect(() => {
        WebApp.BackButton.onClick(goBack);

        return () => {
            WebApp.BackButton.offClick(goBack);
        }
    }, [goBack]);

    useEffect(()=>{
        if(location.key != "default" && location.pathname !== "/") {
            WebApp.BackButton.show();
        } else {
            WebApp.BackButton.hide();
        }
    }, [location]);
}