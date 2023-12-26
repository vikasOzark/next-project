import "./globals.css";
import Provider from "@/app/providers/CredentialsProvider";
export const metadata = {
  title: "Tickets | Dashboard",
  description: "Create and manage tickets here.",
};

export default function RootLayout({ children, team }) {
  return (
    <html lang="en">
      <body className="globle-bg">
        <Provider>{children}</Provider>
        {team}
        <div id="modal-portal" />
      </body>
    </html>
  );
}
