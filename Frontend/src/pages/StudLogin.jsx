import { useState } from "react";
import { Link } from "react-router-dom";
import { User, Mail, Lock, Eye, EyeOff, Loader } from "lucide-react";
import { studentAuthStore } from "../store/studentAuthStore";
function StudLogin() {
  const [showP, setShowP] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  function handleSubmit(e) {
    e.preventDefault();

    Login(formData);
  }
  const { Login, isLogin } = studentAuthStore();
  return (
    <>
      <div
        className="min-h-screen pt-[50px] w-screen bg-gradient-to-r from-slate-900 to-slate-950 flex
          items-center justify-center"
      >
        <div className="flex  flex-col items-center gap-10  justify-center bg-slate-950  w-[650px] h-[680px] rounded-2xl border-[2px]  text-white">
          <h1 className=" text-5xl  animate-pulse font-bold text-green-500">
            {" "}
            Student <span className="text-blue-500">Login</span>
          </h1>

          <form
            onSubmit={handleSubmit}
            className="flex gap-6  flex-col w-full p-6"
          >
            <label className="text-2xl flex items-center gap-x-3 ">
              {" "}
              Name <User className="text-green-500" />
            </label>

            <input
              type="text"
              name=""
              id=""
              className=" input p-3 w-full bg-slate-800  rounded-2xl outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter your name"
              value={formData.name}
              onChange={(e) => {
                setFormData({ ...formData, name: e.target.value });
              }}
            />

            <label className="text-2xl flex items-center gap-x-3 ">
              {" "}
              Email <Mail className="text-green-500" />
            </label>

            <input
              type="email"
              name=""
              id=""
              className=" input p-3 w-full bg-slate-800  rounded-2xl outline-none focus:ring-2 focus:ring-green-500"
              placeholder="example@gmail.com"
              value={formData.email}
              onChange={(e) => {
                setFormData({ ...formData, email: e.target.value });
              }}
            />

            <label className="text-2xl flex items-center gap-x-3 ">
              {" "}
              Password <Lock className="text-green-500" />
            </label>

            <div className="relative w-full">
              <input
                type={showP ? "text" : "password"}
                className=" input p-3 pr-12 w-full bg-slate-800  rounded-2xl outline-none focus:ring-2 focus:ring-green-500"
                placeholder="*********"
                value={formData.password}
                onChange={(e) => {
                  setFormData({ ...formData, password: e.target.value });
                }}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-4 flex items-center"
                onClick={() => {
                  setShowP(!showP);
                }}
              >
                {showP ? (
                  <EyeOff className="size-5 text-green-500" />
                ) : (
                  <Eye className="size-5 text-green-500" />
                )}
              </button>
            </div>

            <div className="flex items-center w-full justify-center ">
              <button
                className="text-2xl bg-green-500   w-[80%] rounded-2xl py-3 px-3  p-4  border-[2px]  hover:bg-green-700 transition-all duration-300 "
                disabled={isLogin}
              >
                {isLogin ? (
                  <>
                    <Loader className="size-5 animate-spin inline-block mr-2" />
                    Loading...
                  </>
                ) : (
                  "Login"
                )}
              </button>
            </div>
          </form>

          <p>
            Create Account 👉{" "}
            <Link to="/stusignup">
              <span className="text-green-500 text-lg">Signup</span>
            </Link>{" "}
          </p>
        </div>
      </div>
    </>
  );
}

export default StudLogin;
