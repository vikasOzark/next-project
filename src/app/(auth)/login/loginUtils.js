import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import formValidator from "@/utils/formValidator";
import { urlRoutes } from "@/utils/urlRoutes";

export const loginHandler = async (event, config) => {
  const { setLoading, setErrorResponseData, router, params } = config;

  setLoading(true);
  event.preventDefault();
  setErrorResponseData({});

  try {
    const email = event.target.email.value;
    const password = event.target.password.value;

    const payload = {
      email: email,
      password: password,
    };

    const isError = formValidator(payload);
    setErrorResponseData(isError);

    if (!isError) {
      await signIn("credentials", {
        callbackUrl: "/dashboard",
        redirect: false,
        email,
        password,
      }).then((response) => {
        console.log(response);
        if (!response.ok) {
          setErrorResponseData(response);
          setLoading(false);
          return;
        }
        toast.success("Successfully signed in.");
        setTimeout(() => {
          router.push(urlRoutes.DASHBOARD);
        }, 500);
      });
    }
  } catch (error) {
    toast.error("Something went wrong, Please try again.");
  } finally {
    setLoading(false);
  }
};
