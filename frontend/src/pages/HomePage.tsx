import { useEffect } from "react";
import Background from "../components/Background";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import useSound from "use-sound";

type CategorySpine = {
  name: string;
  image: string;
  link: string;
};

const bookCategorySpines: CategorySpine[] = [
  {
    name: "Beginner",
    image: "/home_page/green_spine.png",
    link: "/book_category/BEGINNER",
  },
  {
    name: "Intermediate",
    image: "/home_page/orange_spine.png",
    link: "/book_category/INTERMEDIATE",
  },
  {
    name: "Advanced",
    image: "/home_page/purple_spine.png",
    link: "/book_category/ADVANCED",
  },
];

function CategoryPreview({ category }: { category: CategorySpine }) {
  return (
    <div className="h-[150px] w-[600px] relative">
      <a href={category.link}>
        <div className="h-[150px] w-[600px] hover:shadow-2xl rounded-2xl hover:-translate-y-1">
          <img
            src={category.image}
            height={150}
            width={600}
            alt={`Book Background`}
            className="absolute"
          />
          <div className="relative top-4 left-16 w-9/12 h-3/4 flex-col justify-center flex items-center p-2 text-center">
            <h1 className="text-black text-4xl font-medium">{category.name}</h1>
          </div>
        </div>
      </a>
    </div>
  );
}

export default function HomePage() {
  const [playSound] = useSound("/sounds/low-click.mp3", { volume: 0.5 });
  useEffect(() => {
    playSound();
  }, [playSound]);
  return (
    <>
      <Background />
      <Navbar />
      <div className="flex flex-col items-center container mx-auto z-10 min-h-screen">
        <div>
          <img
            src="/background.png"
            alt="KIDATA"
            width={250}
            height={150}
            className="mx-auto"
          />
          <div className="card p-2 text-center mx-auto max-w-lg">
            <h1 className="text-2xl font-bold">Welcome to CodeKids!</h1>
          </div>
          <div className="card p-2 text-center mx-auto w-1/2">
            <h1 className="text-l">
              CodeKids offers a wide range of engaging coding activities for
              students of all levels, Teachers will find activities that match
              their lesson plans and teaching materials to make coding education
              exciting in the classroom.
            </h1>
          </div>
        </div>
        <div className="flex flex-col justify-center">
          {bookCategorySpines.map((category, i) => (
            <div key={`category-${i}`}>
              <CategoryPreview category={category} />
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
