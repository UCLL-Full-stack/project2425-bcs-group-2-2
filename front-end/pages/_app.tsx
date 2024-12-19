import { useEffect, useState } from "react";
import Sidebar from "@/components/sidebar";
import "@/styles/globals.css";
import { appWithTranslation } from "next-i18next";
import type { AppProps } from "next/app";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <div className="flex">
      <Sidebar />
      <main className="ml-64 w-full p-4">
        <Component {...pageProps} />
      </main>
    </div>
  );
};
export const getServerSideProps = async (context) => {
  const { locale } = context;
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "en", ["common"])),
    },
  };
};

export default appWithTranslation(App);
