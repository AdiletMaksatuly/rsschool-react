import { render } from "@testing-library/react";
import React, { ReactElement } from "react";
import { MemoryRouter } from "react-router-dom";
import AppRouter from "../components/AppRouter";
import Navbar from "../components/Navbar";


export const renderWithRouter = (component: React.ReactNode, initialRoute: string = '/') => {
   
    return render(
        <MemoryRouter initialEntries={[initialRoute]}>
            {component}
        </MemoryRouter>
    )
}
