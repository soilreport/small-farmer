// src/components/layout/Layout.tsx
import React from "react";
import Navbar from "./Navbar/Navbar";
import "./Layout.css";

interface LayoutProps {
  children: React.ReactNode;
  showNavbar?: boolean;
}

export default function Layout({ children, showNavbar = true }: LayoutProps) {
  return (
    <div className="layout">
      {showNavbar && <Navbar />}
      <main className="main-content">{children}</main>
    </div>
  );
}