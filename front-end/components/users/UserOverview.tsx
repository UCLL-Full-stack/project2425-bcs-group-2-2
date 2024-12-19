import { User } from "@/types";
import { useTranslation } from "next-i18next";

const formatDate = (isoDate: Date): string => {
  const date = new Date(isoDate);
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

type Props = {
  user: User;
  bio: String;
};

const UserOverview: React.FC<Props> = ({ user, bio }: Props) => {
  const { t } = useTranslation("common");

  return (
    <div className="bg-white p-4 rounded-lg shadow-md space-y-2">
      <p className="text-lg font-semibold text-gray-800">
        {t("users.UserOverview.username")}:{" "}
        <span className="text-blue-600">{user.username}</span>
      </p>
      <p className="text-lg font-semibold text-gray-800">
        {t("users.UserOverview.email")}:{" "}
        <span className="text-blue-600">{user.email}</span>
      </p>
      <p className="text-lg font-semibold text-gray-800">
        {t("users.UserOverview.age")}:{" "}
        <span className="text-blue-600">{user.age}</span>
      </p>
      <p className="text-lg font-semibold text-gray-800">
        {t("users.UserOverview.bio")}:{" "}
        <span className="text-blue-600">{bio}</span>
      </p>
      <p className="text-lg font-semibold text-gray-800">
        {t("users.UserOverview.createdOn")}:{" "}
        <span className="text-blue-600">{formatDate(user.creationDate)}</span>
      </p>
    </div>
  );
};

export default UserOverview;
