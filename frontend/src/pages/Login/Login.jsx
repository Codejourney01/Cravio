
import { useState } from "react";
import { FiEye, FiEyeOff, FiMail, FiLock } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen w-full bg-white text-[#17233b] flex flex-col">

      {/* Header */}
      <header
        className="
          w-full
          h-[68px] md:h-[72px]
          flex items-center justify-between
          px-6 sm:px-8 md:px-12
        "
      >
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img
            src="/Images/logo.png"
            alt="Cravio"
            className="
              w-8 h-8
              md:w-9 md:h-9
              object-contain
              transition-transform
              duration-200
              hover:scale-105
            "
          />

          <h1
            className="
              text-[17px]
              md:text-[18px]
              font-semibold
              text-cravio
              tracking-tight
            "
          >
            Cravio
          </h1>
        </div>

        {/* Register */}
        <button
          type="button"
          onClick={() => navigate("/register")}
          className="
            text-[13px]
            md:text-[14px]
            font-medium
            text-heading
            transition-colors
            duration-200
            hover:text-cravio
          "
        >
          Create account
        </button>
      </header>

      {/* Main */}
      <main className="w-full flex-1 flex justify-center">

        <div
          className="
            w-full
            max-w-[430px]
            px-6
            sm:px-8
            pt-10
            sm:pt-12
            md:pt-[54px]
            pb-12
          "
        >

          {/* Heading */}
          <div
            className="
              w-full
              flex
              flex-col
              items-center
              text-center
              mb-7
            "
          >
            <h2
              className="
                text-[21px]
                sm:text-[23px]
                md:text-[27px]
                leading-tight
                tracking-[-0.5px]
                font-bold
                text-heading
              "
            >
              Welcome back to Cravio.
            </h2>

            <p
              className="
                mt-2.5
                text-[12px]
                sm:text-[13px]
                leading-5
                text-subheading
              "
            >
              Log in to continue discovering delicious food near you.
            </p>
          </div>

          {/* Login Form */}
          <form
            className="w-full"
            onSubmit={(e) => {
              e.preventDefault();

              // Login API will go here
              console.log("Login submitted");
            }}
          >

            {/* Email */}
            <div className="relative">

              <FiMail
                size={16}
                className="
                  absolute
                  right-3.5
                  top-1/2
                  -translate-y-1/2
                  text-gray-400
                  pointer-events-none
                "
              />

              <input
                type="email"
                placeholder="Email address"
                required
                className="
                  w-full
                  h-[44px]
                  pl-4
                  pr-10
                  rounded-lg
                  border
                  border-[#d5d8de]
                  bg-white
                  outline-none
                  text-[13px]
                  text-heading
                  placeholder:text-gray-400
                  transition-all
                  duration-200
                  hover:border-gray-400
                  focus:border-cravio
                  focus:ring-1
                  focus:ring-cravio
                "
              />

            </div>

            {/* Password */}
            <div className="relative mt-2.5">

            
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                required
                className="
                  w-full
                  h-[44px]
                  px-3.5
                  pr-10
                  rounded-lg
                  border
                  border-[#d5d8de]
                  bg-white
                  outline-none
                  text-[13px]
                  text-heading
                  placeholder:text-gray-400
                  transition-all
                  duration-200
                  hover:border-gray-400
                  focus:border-cravio
                  focus:ring-1
                  focus:ring-cravio
                "
              />

              {/* Password Toggle */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="
                  absolute
                  right-3.5
                  top-1/2
                  -translate-y-1/2
                  flex
                  items-center
                  justify-center
                  text-gray-400
                  hover:text-cravio
                  transition-colors
                  duration-200
                "
                aria-label={
                  showPassword
                    ? "Hide password"
                    : "Show password"
                }
              >
                {showPassword ? (
                  <FiEyeOff size={17} />
                ) : (
                  <FiEye size={17} />
                )}
              </button>

            </div>

            {/* Forgot Password */}
            <div className="flex justify-end mt-2.5">

              <button
                type="button"
                onClick={() => navigate("/forgot-password")}
                className="
                  text-[11px]
                  sm:text-[12px]
                  font-medium
                  text-cravio
                  hover:underline
                  underline-offset-2
                  transition-all
                  duration-200
                "
              >
                Forgot password?
              </button>

            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="
                group
                w-full
                h-[44px]
                mt-4
                rounded-lg
                bg-cravio
                hover:bg-orange-600
                hover:-translate-y-[1px]
                hover:shadow-lg
                hover:shadow-orange-200/60
                active:translate-y-0
                active:shadow-sm
                transition-all
                duration-200
                text-white
                text-[12px]
                font-semibold
              "
            >
              <span
                className="
                  transition-all
                  duration-200
                  group-hover:tracking-[0.1px]
                "
              >
                Log in
              </span>
            </button>

          </form>

          {/* Divider */}
          <div
            className="
              flex
              items-center
              gap-3
              my-5
            "
          >
            <div className="h-px flex-1 bg-gray-200" />

            <span className="text-[11px] text-gray-400">
              or
            </span>

            <div className="h-px flex-1 bg-gray-200" />
          </div>

          {/* Google Login */}
          <button
            type="button"
            className="
              group
              relative
              w-full
              h-[46px]
              rounded-full
              bg-[#f5f5f6]
              hover:bg-[#eeeeef]
              hover:-translate-y-[1px]
              active:translate-y-0
              transition-all
              duration-200
              flex
              items-center
              justify-center
              text-[13px]
              font-medium
              text-[#17233b]
            "
          >

            <span className="absolute left-5">

              <svg
                width="17"
                height="17"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#4285F4"
                  d="M21.35 12.27c0-.71-.06-1.4-.18-2.05H12v3.88h5.23a4.47 4.47 0 0 1-1.94 2.93v2.44h3.14c1.84-1.69 2.92-4.18 2.92-7.2Z"
                />

                <path
                  fill="#34A853"
                  d="M12 21.75c2.63 0 4.84-.87 6.45-2.35l-3.14-2.44c-.87.58-1.98.92-3.31.92-2.54 0-4.7-1.72-5.47-4.03H3.29v2.52A9.75 9.75 0 0 0 12 21.75Z"
                />

                <path
                  fill="#FBBC05"
                  d="M6.53 13.85A5.86 5.86 0 0 1 6.22 12c0-.64.11-1.26.31-1.85V7.63H3.29A9.74 9.74 0 0 0 2.25 12c0 1.57.38 3.06 1.04 4.37l3.24-2.52Z"
                />

                <path
                  fill="#EA4335"
                  d="M12 6.12c1.43 0 2.71.49 3.72 1.45l2.79-2.79C16.83 3.25 14.63 2.25 12 2.25a9.75 9.75 0 0 0-8.71 5.38l3.24 2.52C7.3 7.84 9.46 6.12 12 6.12Z"
                />
              </svg>

            </span>

            Continue with Google

          </button>

          {/* Signup */}
          <div className="text-center mt-5">

            <p
              className="
                text-[11px]
                md:text-[12px]
                text-subheading
              "
            >
              Don’t have an account?{" "}

              <button
                type="button"
                onClick={() => navigate("/register")}
                className="
                  font-medium
                  text-cravio
                  hover:underline
                  underline-offset-2
                  transition-all
                  duration-200
                "
              >
                Sign up
              </button>

            </p>

          </div>

        </div>
      </main>

      {/* Footer */}
      <footer
        className="
          w-full
          flex
          items-center
          justify-center
          gap-2
          pb-5
          px-5
        "
      >

        <div className="flex items-center gap-1.5">

          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-subheading"
          >
            <rect
              x="4"
              y="10"
              width="16"
              height="11"
              rx="2"
            />

            <path d="M8 10V7a4 4 0 0 1 8 0v3" />
          </svg>

          <span
            className="
              text-[9px]
              md:text-[10px]
              text-subheading
            "
          >
            Your information is{" "}

            <span
              className="
                underline
                underline-offset-2
                hover:text-cravio
                transition-colors
              "
            >
              safe and secure
            </span>
          </span>

        </div>

        <span className="text-subheading">
          •
        </span>

        <button
          type="button"
          className="
            flex
            items-center
            gap-1
            text-[9px]
            md:text-[10px]
            text-subheading
            hover:text-cravio
            transition-colors
            duration-200
          "
        >

          <span
            className="
              flex
              items-center
              justify-center
              w-[13px]
              h-[13px]
              rounded-full
              bg-subheading
              text-white
              text-[8px]
              font-semibold
              transition-all
              duration-200
              hover:bg-cravio
            "
          >
            ?
          </span>

          Help

        </button>

      </footer>

    </div>
  );
}

export default Login;
