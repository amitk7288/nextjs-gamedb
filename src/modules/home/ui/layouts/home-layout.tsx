import Header from "../components/header/Header";
import Sidebar from "../components/sidebar/Sidebar";

interface HomeLayoutProps {
  children: React.ReactNode;
}

export const HomeLayout = ({ children }: HomeLayoutProps) => {
  return (
    <div>
      <Header />
      <main className="3xl:w-[calc(100%_-_12vw)] h-full w-full lg:w-[calc(100%_-_20vw)] xl:w-[calc(100%_-_18vw)] 2xl:w-[calc(100%_-_15vw)]">
        <div className=" no-scrollbar 3xl:w-[calc(100%_-_12vw)] dark:bg-drkbg dark:text-drkcol fixed right-0 top-[80px] z-[-1] h-[calc(100%_-_80px)] w-full overflow-y-scroll px-4 pb-4 pt-4 sm:px-5 sm:pt-5 lg:w-[calc(100%_-_20vw)] xl:w-[calc(100%_-_18vw)] 2xl:w-[calc(100%_-_15vw)]">{children}</div>
      </main>
      <Sidebar />
    </div>
  );
};


