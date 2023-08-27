import "@/styles/globals.css";
import { PostStateProvider } from "@/context/post-context";
import { Toaster } from "@/components/ui/toaster";
import { Inter, Poppins } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export default function App({ Component, pageProps }) {
  return (
    <PostStateProvider>
      <div className={`${poppins.className}`}>
        <Component {...pageProps} />;
        <Toaster />
      </div>
    </PostStateProvider>
  );
}
