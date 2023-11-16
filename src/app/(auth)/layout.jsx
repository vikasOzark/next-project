import { Toaster } from "react-hot-toast";

export default function RootLayout({ children }) {
  return (
    <div className="">
      <Toaster position="top-right" reverseOrder={false} />
      {children}
    </div>
  );
}
