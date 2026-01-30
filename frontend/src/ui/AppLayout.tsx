import Sidebar from './Sidebar';

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen w-full bg-[#0F172A]">
      <Sidebar />
      <main className="flex-1 overflow-auto bg-white rounded-tl-[32px] my-2 mr-2 shadow-xl border border-gray-200">
        <div className="container mx-auto p-8">{children}</div>
      </main>
    </div>
  );
};

export default AppLayout;
