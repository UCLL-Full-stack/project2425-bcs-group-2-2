import { useEffect, useState } from "react";
import Sidebar from "@/components/sidebar";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {


  return (
    <div className="flex">
      <Sidebar/> 
      <main className="ml-64 w-full p-4">
        <Component {...pageProps} />
      </main>
    </div>
  );
}
