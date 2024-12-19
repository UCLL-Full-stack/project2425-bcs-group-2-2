import React, { useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

const LanguageBox: React.FC = () => {
  const [language, setLanguage] = useState("English"); // Default language is English

  const handleLanguageChange = (lang: string) => {
    setLanguage(lang);
  };

  return (
    <>
      <Collapsible>
        <CollapsibleTrigger className="px-4 py-2 bg-gray-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none">
          Language: {language}
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-2 space-y-2">
          <button
            onClick={() => handleLanguageChange("English")}
            className={`px-4 py-2 w-full text-left text-black rounded-lg border focus:outline-none hover:bg-gray-100 transition ${
              language === "English" ? "bg-gray-200" : "bg-white"
            }`}
          >
            English
          </button>
          <button
            onClick={() => handleLanguageChange("French")}
            className={`px-4 py-2 w-full text-left text-black rounded-lg border focus:outline-none hover:bg-gray-100 transition ${
              language === "French" ? "bg-gray-200" : "bg-white"
            }`}
          >
            French
          </button>
        </CollapsibleContent>
      </Collapsible>
    </>
  );
};

export { LanguageBox };
