// creating metadata in next js
export const metadata = {
  title: "Dashboard",
};

// You should not manually add <head> tags such as <title> and <meta> to root layouts. Instead, you should use the Metadata API

export default function DashboardLayout({
  children, // will be a page or nested layout
}) {
  return (
    <section className="p-5 m-5 bg-red-200 rounded-lg">
      <p className="text-black font-extrabold text-xl mb-5">
        Dashboard layout power, anything inside dashboard folder will maintain that
        red background
      </p>
      {/* Include shared UI here e.g. a header or sidebar */}
      {children}
    </section>
  );
}
