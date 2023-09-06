import "@/styles/globals.css";
import { PostStateProvider } from "@/context/post-context";
import { Toaster } from "@/components/ui/toaster";
import { Inter, Poppins } from "next/font/google";
import { useEffect } from "react";
import wakeServer from "./api/wake-server";
import { LoginStateProvider } from "@/context/login-context";

const inter = Inter({ subsets: ["latin"] });
const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export default function App({ Component, pageProps }) {
  useEffect(() => {
    wakeServer();
  }, []);

  return (
    <LoginStateProvider>
      <PostStateProvider>
        <div className={`${poppins.className}`}>
          <Component {...pageProps} />;
          <Toaster />
        </div>
      </PostStateProvider>
    </LoginStateProvider>
  );
}
