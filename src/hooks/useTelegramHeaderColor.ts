import WebApp from "@twa-dev/sdk";
import {useEffect} from "react";

/**
 * Hook, that allows to set the app's header color.
 * @param color - hex color, don't pass the color to set to default.
 */
export default function useTelegramHeaderColor(color?: `#${string}`) {
    useEffect(() => {
        WebApp.setHeaderColor(color ?? "bg_color")

        return () => {
            WebApp.setHeaderColor("bg_color");
        }
    }, [color]);
}