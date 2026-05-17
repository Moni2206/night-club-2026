const Footer = () => {
  const pinkText = "text-[oklch(65.35%_0.242_9.27)]";

  return (
    <footer
      className="relative py-20 px-6 md:px-24 text-[ var(--headlines)] overflow-hidden"
      style={{
        backgroundImage: "url('/assets/bg/footerbg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-[var(--background)]/90"></div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          {" "}
          <div className="flex flex-col items-center text-center md:items-start md:text-left">
            <img src="/assets/icon/Logo_main.svg" alt="Logo" className="h-12 w-auto mb-8" />

            <h3 className={`${pinkText} font-bold uppercase mb-2`}>Location</h3>
            <p className="text-sm leading-relaxed mb-8">
              Kompagnistræde 278 <br />
              1265 København K
            </p>

            <h3 className={`${pinkText} font-bold uppercase mb-2`}>Opening Hours</h3>
            <p className="text-sm uppercase leading-relaxed">Wed - Thu: 10:30 PM to 3 AM</p>
            <p className="text-sm uppercase leading-relaxed">Sat - Sun: 11 PM to 5 AM</p>
          </div>
          {/* Column 2 - News */}
          <div className="hidden md:block">
            <h3 className={`${pinkText} font-bold uppercase mb-10`}>News</h3>

            {/* Item */}
            <div className="flex gap-6 mb-8 items-center">
              <img src="/assets/content-img/recent_post1.jpg" alt="" className="h-[110px] w-[110px] object-cover" />
              <div className="max-w-[260px]">
                <p className="text-sm leading-relaxed opacity-90">Lorem Ipsum is simply dummy text of the printing and typesetting.</p>
                <p className={`${pinkText} text-xs mt-2`}>April 17, 2026</p>
              </div>
            </div>

            {/* Item */}
            <div className="flex gap-6 items-center">
              <img src="/assets/content-img/recent_post2.jpg" alt="" className="h-[110px] w-[110px] object-cover" />
              <div className="max-w-[260px]">
                <p className="text-sm leading-relaxed opacity-90">Lorem Ipsum is simply dummy text of the printing and typesetting.</p>
                <p className={`${pinkText} text-xs mt-2`}>April 17, 2026</p>
              </div>
            </div>
          </div>
          {/* Column 3 - Recent Posts */}
          <div className="hidden md:block">
            <h3 className={`${pinkText} font-bold uppercase mb-10`}>Recent Posts</h3>

            {/* Item */}
            <div className="flex gap-6 mb-6 items-start">
              <img src="/assets/icon/x.png" alt="icon" className="h-4 w-4 mt-[6px]" />
              <div className="max-w-[260px]">
                <p className="text-sm opacity-90 leading-relaxed">It is a long established fact that a reader will be distracted by the readable...</p>
                <p className={`${pinkText} text-xs mt-2`}>5 hours ago</p>
              </div>
            </div>

            {/* Item */}
            <div className="flex gap-6 items-start">
              <img src="/assets/icon/x.png" alt="icon" className="h-4 w-4 mt-[6px]" />
              <div className="max-w-[260px]">
                <p className="text-sm opacity-90 leading-relaxed">It is a long established fact that a reader will be distracted by the readable...</p>
                <p className={`${pinkText} text-xs mt-2`}>5 hours ago</p>
              </div>
            </div>
          </div>
        </div>

        {/* Social Section */}
        <div className="text-center mt-20 md:mt-32">
          <p className="text-sm mb-4 opacity-80">Stay Connected With Us</p>
          <div className="flex justify-center gap-4">
            <div className="w-10 h-10 border border[ var(--headlines)]-/30 flex items-center justify-center">
              <img src="/assets/icon/facebook.png" alt="icon" />
            </div>
            <div className="w-10 h-10 border border[ var(--headlines)]-/30 flex items-center justify-center">
              <img src="/assets/icon/snapchat.png" alt="icon" />
            </div>
            <div className="w-10 h-10 border border[ var(--headlines)]-/30 flex items-center justify-center">
              <img src="/assets/icon/instagram.png" alt="icon" />
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-10  flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs opacity-50 italic">Night Club - All Rights Reserved</p>

          <p className="text-xs opacity-50">Copyright © NightClub</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
