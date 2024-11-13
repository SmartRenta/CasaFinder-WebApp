import React, { useState } from "react";
import { List, Typography, Card, IconButton } from "@material-tailwind/react";

const Welcome = ({ userRole }) => {
    return (
    <div>
        <Typography variant="h2" className="ml-4 mt-4 text-black text-xl">
            Bienvenido a CasaFinder!
        </Typography>
        {userRole === "TENANT" ?
        <p className="ml-4 mt-4">Encuentra tu próxima propiedad para alquilar.</p>
        :
        <p className="ml-4 mt-4">Lista tus propiedades en alquiler.</p>
        }

    </div>
    );
}

export default Welcome;