import type { ReactNode } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

interface IProps {
    children: ReactNode
}
export default function CommonLayout({ children }: IProps) {
    return (
        <div className="min-h-screen flex flex-col">
            <div className="fixed top-0 left-0 right-0 z-50 ">
                <Navbar />
            </div>
            <div className="grow-1 pt-16">
                {children}
            </div>
            <Footer />
        </div>
    )
};