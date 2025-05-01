import { Link } from "react-router-dom";
import Particles from "../components/ui/particle";

function MainPage() {
  return (
    <>
      {/* Particle Background */}
      <div className="absolute top-0 left-0 w-full h-full -z-10 ">
        <Particles
          particleCount={300}
          particleSpread={15}
          speed={0.2}
          particleColors={["#ffffff", "#00bfff", "#1e90ff"]}
          moveParticlesOnHover={true}
          particleHoverFactor={1.5}
          alphaParticles={true}
          particleBaseSize={50}
          sizeRandomness={1}
          cameraDistance={30}
        />
      </div>

      {/* Main Content */}
      <div className="h-screen w-screen flex items-center justify-center">
        <div className="flex items-center justify-center flex-col">
          <p className="text-2xl text-white text-center p-[10px]">It's Time To Study</p>
          <h1 className="text-white text-center text-6xl p-[10px] animate-pulse font-bold">
            Edu<span className="text-blue-400">Mantra</span>
          </h1>
          <p className="text-white text-center p-[20px] mt-10 text-xl font-light max-w-xl m-3">
            Guidance, connection, and growth — all in one space. Where students find clarity and support, and mentors lead with purpose. A seamless journey toward academic excellence, crafted with care — welcome to{" "}
            <span className="animate-pulse text-2xl p-2">
              Edu<span className="text-blue-400">Mantra</span>.
            </span>
          </p>
          <Link to="/login">
            <button className="border-[2px] border-blue-500 text-3xl text-white p-[40px] blueShadow duration-150 rounded-2xl mt-[50px]">
              Get Started
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default MainPage;