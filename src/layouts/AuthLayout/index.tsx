const img = require('src/assets/images/auth.svg').default;

function AuthLayout({ children }: any) {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="px-[12%] min-h-screen hidden md:flex items-center justify-center md:basis-8/12 bg-[#f8f8f8]">
        <img src={img} alt="Sign In" />
      </div>
      <main className="flex items-center justify-center min-h-screen grow md:basis-4/12">
        {children}
      </main>
    </div>
  );
}

export default AuthLayout;
