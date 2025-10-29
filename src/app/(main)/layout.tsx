import { Footer } from "../components/shared/Footer";
import NavBar from "../components/shared/NavBar";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // <html lang="en">
    <div className="">
      {/* <body> */}
      {/* <main> */}
      <NavBar />

      {children}
      <Footer />
      {/* </main> */}
      {/* </body> */}
      {/* </html> */}
    </div>
  );
}
