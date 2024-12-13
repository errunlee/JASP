import React from "react";

const Homepage: React.FC = () => {
  return (
    <div className="bg-gray-100 font-sans text-gray-800 -mt-20">
      <section
        className="bg-cover bg-center h-screen flex items-center justify-center text-center relative"
        style={{ backgroundImage: "url('/world-environment.png')" }}
      >
        {/* Black Overlay */}
        <div className="absolute inset-0 bg-black opacity-50"></div>

        {/* Text Content */}
        <div className="relative z-10 text-slate-50 p-10 rounded-lg shadow-lg">
          <h1 className="text-6xl font-bold mb-4 font-openSans shadow-sm">
            Turn Waste into Wonders
          </h1>
          <p className="text-slate-50 text-xl mb-6 font-openSans">
            Join the movement to reduce waste and create a cleaner, greener
            planet with Trashformers.
          </p>
          <a
            href="#join"
            className="bg-primary text-slate-50 px-6 py-2 text-lg hover:bg-green-600 transition"
          >
            Get Started
          </a>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-background  px-8">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-10 text-foreground">
            Key Features
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 ">
            <div className="bg-green-100 p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold mb-4 font-openSans">
                Smart Waste Notifications
              </h3>
              <p className="font-parkinsans">
                Receive real-time updates on waste collection schedules and
                recycling initiatives.
              </p>
            </div>
            <div className="bg-green-100 p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold mb-4 font-openSans">
                Donation Hub
              </h3>
              <p className="font-parkinsans">
                Donate clothes, books, and other items directly to people or
                NGOs in need.
              </p>
            </div>
            <div className="bg-green-100 p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold mb-4 font-openSans">
                Crowdfunding for Clean Initiatives
              </h3>
              <p className="font-parkinsans">
                Support local community-driven projects to clean and manage
                waste efficiently.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Statement */}
      <section
        id="impact"
        className="py-20 bg-secondary dark:bg-background dark:border-t dark:border-t-primary text-foreground px-8"
      >
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-6 font-roboto tracking-wide">
            Our Impact
          </h2>
          <p className="text-xl mb-6">
            By joining *Trashformers*, you help reduce waste in your community
            and support sustainable practices. Together, we can minimize waste
            to landfills and create a greener future.
          </p>
          <p className="text-xl font-bold text-emerald-400">
            Join us today, and let's transform the world, one piece of trash at
            a time.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-emerald-800 text-white py-8 ">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 Trashformers. All Rights Reserved.</p>
          <div className="space-x-4 mt-4">
            <a href="https://facebook.com" className="hover:text-green-300">
              Facebook
            </a>
            <a href="https://twitter.com" className="hover:text-green-300">
              Twitter
            </a>
            <a href="https://instagram.com" className="hover:text-green-300">
              Instagram
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;
