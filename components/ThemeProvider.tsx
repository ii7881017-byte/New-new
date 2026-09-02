"use client";import{useEffect}from"react";
export default function ThemeProvider({children}:{children:React.ReactNode}){useEffect(()=>{document.body.classList.toggle("dark",localStorage.getItem("Atoolsmart-theme")==="dark")},[]);return <>{children}</>}
