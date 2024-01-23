import { Toaster } from "react-hot-toast";
import "./globals.css";
import Provider from "@/app/providers/CredentialsProvider";
export const metadata = {
  title: "Tickets | Dashboard",
  description: "Create and manage tickets here.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="globle-bg">
        <Provider>{children}</Provider>
        <div id="modal-portal" />
      </body>
    </html>
  );
}
