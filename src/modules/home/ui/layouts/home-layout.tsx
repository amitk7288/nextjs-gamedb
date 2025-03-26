import Header from "../components/header/Header";

interface HomeLayoutProps {
  children: React.ReactNode;
}

export const HomeLayout = ({ children }: HomeLayoutProps) => {
  return (
    <div>
      <Header />
      <div>{children}</div>
    </div>
  );
};


