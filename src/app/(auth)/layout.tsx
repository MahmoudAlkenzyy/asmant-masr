export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <div className="flex  h-screen overflow-hidden  ">
        <div className="w-1/2  relative overflow-hidden">
          {" "}
          <div className="bg-gradient-to-tr from-[#EDF2F700] to-[#F7FAFC99] from-40% rounded-full absolute top-0 start-0 z-10 w-250 h-250 -translate-1/2"></div>
          <img src="/images/auth/authbg.png" className="w-full " alt="" />
          <img
            src="/images/auth/Cement Egypt-03 1.png"
            className=" top-1/2 left-1/2 absolute -translate-1/2  "
            alt=""
          />
        </div>
        <div className="w-1/2 ">{children}</div>
      </div>
    </section>
  );
}
