import { Inter } from "next/font/google";
import Layout from "@/components/Layout";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className={`relative ${inter.className}`}>
      <Layout>Hi</Layout>
    </main>
  );
}
