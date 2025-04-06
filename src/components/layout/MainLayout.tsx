
import { ReactNode } from "react";
import Navbar from "./Navbar";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">{children}</main>
      <footer className="bg-primary text-primary-foreground py-4 text-center">
        <div className="container">
          <p>© 2023 Safe Home Guardian. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
