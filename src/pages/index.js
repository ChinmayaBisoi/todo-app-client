import { Inter, Poppins } from "next/font/google";
import Layout from "@/components/Layout";
import Posts from "@/components/posts/Posts";

const inter = Inter({ subsets: ["latin"] });
const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export default function Home() {
  return (
    <main className={`relative`}>
      <Layout>
        <Posts />
      </Layout>
    </main>
  );
}
