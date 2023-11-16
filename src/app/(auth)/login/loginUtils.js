import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import formValidator from "@/utils/formValidator";

export const loginHandler = async (event, setLoading, setErrorResponseData) => {
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
        if (!response.ok) {
          setErrorResponseData(response);
          setLoading(false);
          return;
        }
        toast.success("Successfully signed in.");
        setTimeout(() => {
          window.location.href = "/dashboard";
        }, 500);
      });
    }
  } catch (error) {
    toast.error("Something went wrong, Please try again.");
  } finally {
    setLoading(false);
  }
};
