import { Link } from "react-router-dom";
import Particles from "../animation/Particles"; // Corrected import

function MainPage() {
  return (
    <div className="relative w-screen h-screen overflow-hidden">
      {/* Particle background animation */}
      <Particles
        particleCount={300}
        particleSpread={10}
        speed={0.2}
        particleColors={["#4fc3f7", "#29b6f6", "#0288d1"]}
        moveParticlesOnHover={true}
        particleHoverFactor={1.2}
        alphaParticles={true}
        particleBaseSize={80}
        sizeRandomness={1.2}
        cameraDistance={25}
        disableRotation={false}
        className="absolute inset-0 z-0"
      />

      {/* Foreground content */}
      <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/90">
        <div className="flex items-center justify-center flex-col px-4 text-center">
          <p className="text-2xl text-white p-[10px]">It's Time To Study</p>
          <h1 className="text-white text-6xl p-[10px] animate-pulse font-bold">
            Edu<span className="text-blue-400">Mantra</span>
          </h1>
          <p className="text-white p-[20px] mt-10 text-xl font-light max-w-xl m-3">
            Guidance, connection, and growth — all in one space. Where students
            find clarity and support, and mentors lead with purpose. A seamless
            journey toward academic excellence, crafted with care — welcome to{" "}
            <span className="animate-pulse text-2xl p-2">
              Edu<span className="text-blue-400">Mantra</span>.
            </span>
          </p>
          <Link to="/login">
            <button className="border-2 border-blue-500 text-3xl text-white px-10 py-6 blueShadow duration-150 bg-slate-950 rounded-2xl mt-12">
              Get Started
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
