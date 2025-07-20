import Link from "next/link";
import CategoryPage from './category/page';

const Home = () => {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-4">Welcome to TabLaunch</h1>
      <p className="text-lg mb-6">
        Launch your favorite websites and tools from one place.
      </p>
      <CategoryPage />
    </div>
  );
};

export default Home;
