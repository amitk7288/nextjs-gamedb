import { HomeLayout } from "@/modules/home/ui/layouts/home-layout";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <HomeLayout>
      <div className="flex min-h-screen justify-center">{children}</div>
    </HomeLayout>
  );
};

export default Layout;
