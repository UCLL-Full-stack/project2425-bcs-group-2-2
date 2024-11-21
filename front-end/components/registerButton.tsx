import { useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { Button } from "./ui/button";
import { X } from "lucide-react";

function LoginAlert() {
  const [showAlert, setShowAlert] = useState(true);

  const closeAlert = () => setShowAlert(false);

  return (
    <>
      {showAlert && (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-gray-800 bg-opacity-80">
          <div className="rounded-md shadow-none max-w-[600px] w-[90%]">
            <Alert className="bg-background dark:bg-colorquaternary p-5 border border-stone-500 shadow-lg">
              <div className="flex justify-between items-start">
                <AlertTitle className="font-semibold text-lg text-colortertiarie dark:text-background">
                  Heads up!
                </AlertTitle>
                <X
                  className="h-6 w-6 cursor-pointer text-foreground hover:scale-110  dark:text-background"
                  onClick={closeAlert}
                />
              </div>
              <AlertDescription className="mb-5 mt-2 text-colortertiarie dark:text-background">
                You don't have an account yet. Registering now will simplify
                your access and enhance your experience!
              </AlertDescription>

              <div className="flex justify-end">
                <a href="/register">
                  <Button
                    variant="default"
                    className="rounded-md shadow-md hover:bg-foreground dark:bg-colortertiarie dark:hover:color transition bg-foreground text-white"
                  >
                    Register
                  </Button>
                </a>
              </div>
            </Alert>
          </div>
        </div>
      )}
    </>
  );
}

export default LoginAlert;
