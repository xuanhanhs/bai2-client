import Header from '../components/Header';

function CommonLayout({ children }: any) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="fixed top-0 left-0 right-0 h-[80px] z-[1] bg-[#f8f8f8]" />
      <main className="bg-[#f8f8f8] flex flex-col grow px-[24px] pt-[98px]">
        {children}
      </main>
    </div>
  );
}

export default CommonLayout;
