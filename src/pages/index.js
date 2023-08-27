import Layout from "@/components/Layout";
import Posts from "@/components/posts/Posts";

export default function Home() {
  return (
    <main className={`relative`}>
      <Layout>
        <Posts />
      </Layout>
    </main>
  );
}
