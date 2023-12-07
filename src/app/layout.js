import "./globals.css";
import Provider from "@/app/providers/CredentialsProvider";
export const metadata = {
  title: "Tickets | Dashboard",
  description: "Create and manage tickets here.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-900">
        <Provider>
          {children}
        </Provider>
      </body>
    </html>
  );
}
