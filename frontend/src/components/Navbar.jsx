import React from "react";

const Navbar = () => {
  return (
    <nav className="surface-bg fixed top-0 z-20 w-full border-soft">
      <div className="mx-auto max-w-7xl flex items-center justify-between p-4">
        <a href="/">
          <span className="text-2xl font-semibold text-main">DailyForge</span>
        </a>

        <div className="flex items-center gap-4">
          <a
            href="#"
            className="text-muted hover:text-main transition-colors font-medium"
          >
            Login
          </a>

          <a href="#" className="btn btn-primary">
            Signup
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
