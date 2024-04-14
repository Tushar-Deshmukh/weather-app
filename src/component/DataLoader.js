import React from "react";
import Loader from "react-js-loader";
export default function DataLoader() {
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Loader
                type="bubble-spin"
                bgColor={"#ED2124"}
                title={"Loading..."}
                color={"#ED2124"}
                size={60}
            />
        </div>
    );
}
