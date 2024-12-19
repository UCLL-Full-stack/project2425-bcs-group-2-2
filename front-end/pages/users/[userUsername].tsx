import ChangeBioForm from "@/components/users/ChangeBioForm";
import DeleteButton from "@/components/users/DeleteButton";
import UserOverview from "@/components/users/UserOverview";
import UserService from "@/service/userService";
import { User } from "@/types";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import LanguageBox from "@/components/languageBox";

const Users: React.FC = () => {
  const { t } = useTranslation("common");
  const router = useRouter();
  const { userUsername } = router.query;
  const [hasSession, setHasSession] = useState(null);
  const [bio, setBio] = useState<string>("");

  const getUser = async () => {
    const response = await UserService.getUser(userUsername as string);

    if (!response.ok) {
      const errorResponse = await response.json();

      if (errorResponse.message === "jwt malformed") {
        throw new Error("You need to connect if you want to access this page.");
      }

      const error = new Error(errorResponse.message);
      throw error;
    }

    return await response.json();
  };

  const { data, isLoading, error } = useSWR(`user-${userUsername}`, getUser);

  useEffect(() => {
    setHasSession(sessionStorage.getItem("loggedInUser"));
  }, []);

  const handleBioUpdate = (updatedBio: string) => {
    setBio(updatedBio);
  };

  useEffect(() => {
    if (data && data.bio) {
      setBio(data.bio);
    }
  }, [data]);

  return (
    <>
      <Head>
        <title>{t("users.userDetails.title")}</title>
      </Head>
      {error && (
        <div className="bg-red-100 text-red-800 p-4 rounded-lg">
          <strong>{t("general.error")}:</strong> {error.message}
        </div>
      )}

      {data && (
        <main className="max-w-2xl mx-auto p-6 bg-gray-50 rounded-lg shadow-lg space-y-8">
          <div className="flex justify-between">
            <h1 className="text-2xl font-bold text-center text-gray-800">
              {t("users.userDetails.heading")}
            </h1>
            <LanguageBox />
          </div>
          {isLoading && (
            <p className="text-center text-gray-500">{t("users.loading")}</p>
          )}

          <UserOverview user={data} bio={bio} />

          <ChangeBioForm onBioUpdate={handleBioUpdate} />
          <DeleteButton />
        </main>
      )}
    </>
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

export default Users;
