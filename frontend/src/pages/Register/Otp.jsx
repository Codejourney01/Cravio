
import { useEffect, useRef, useState } from "react";
import { FiArrowLeft, FiShield } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function OTP() {
  const navigate = useNavigate();
  const { verifyOTP, resendOTP, authError } = useAuth();

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [email, setEmail] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [message, setMessage] = useState("");

  const inputs = useRef([]);

  useEffect(() => {
    const storedEmail = sessionStorage.getItem("cravio_otp_email");

    if (!storedEmail) {
      navigate("/register");
      return;
    }

    setEmail(storedEmail);
  }, [navigate]);

  const handleChange = (value, index) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    if (value && index < 5) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();

    const pastedData = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);

    if (!pastedData) return;

    const newOtp = ["", "", "", "", "", ""];

    pastedData.split("").forEach((digit, index) => {
      newOtp[index] = digit;
    });

    setOtp(newOtp);

    inputs.current[Math.min(pastedData.length, 6) - 1]?.focus();
  };

  const handleVerify = async () => {
    const enteredOtp = otp.join("");

    if (enteredOtp.length !== 6 || !email) return;

    try {
      setIsVerifying(true);
      setMessage("");

      await verifyOTP(email, enteredOtp);

      sessionStorage.removeItem("cravio_otp_email");

      navigate("/login");
    } catch (error) {
      console.error("OTP verification failed:", error);
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResend = async () => {
    if (!email) return;

    try {
      setIsResending(true);
      setMessage("");

      const data = await resendOTP(email);

      setOtp(["", "", "", "", "", ""]);
      inputs.current[0]?.focus();

      setMessage(data.message || "New OTP sent successfully");
    } catch (error) {
      console.error("Resend OTP failed:", error);
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-white text-[#17233b] flex flex-col">
      <header className="w-full h-[68px] md:h-[72px] flex items-center justify-between px-6 sm:px-8 md:px-12">
        <div className="flex items-center gap-2">
          <img
            src="/Images/logo.png"
            alt="Cravio"
            className="w-8 h-8 md:w-9 md:h-9 object-contain transition-transform duration-200 hover:scale-105"
          />

          <h1 className="text-[17px] md:text-[18px] font-semibold text-cravio tracking-tight">
            Cravio
          </h1>
        </div>

        <button
          type="button"
          onClick={() => navigate("/login")}
          className="text-[13px] md:text-[14px] font-medium text-heading transition-colors duration-200 hover:text-cravio"
        >
          Log in
        </button>
      </header>

      <main className="w-full flex-1 flex justify-center">
        <div className="w-full max-w-[430px] px-6 sm:px-8 pt-8 sm:pt-12 md:pt-[54px] pb-12">
          <button
            type="button"
            onClick={() => navigate("/register")}
            className="mb-7 flex h-9 w-9 items-center justify-center rounded-full border border-[#e1e3e7] bg-white text-heading transition-all duration-200 hover:border-cravio hover:text-cravio hover:-translate-x-[1px] active:scale-95"
            aria-label="Go back"
          >
            <FiArrowLeft size={17} strokeWidth={1.8} />
          </button>

          <div className="w-full mb-8">
            <h2 className="text-[22px] sm:text-[24px] md:text-[27px] leading-tight tracking-[-0.5px] font-bold text-heading">
              Verify your email
            </h2>

            <p className="mt-2.5 max-w-[380px] text-[12px] sm:text-[13px] leading-5 text-subheading">
              We’ve sent a 6-digit verification code to your email. Enter the
              code below to continue.
            </p>

            {email && (
              <p className="mt-2 text-[11px] text-heading font-medium">
                {email}
              </p>
            )}
          </div>

          <div className="flex items-center justify-between gap-2 sm:gap-2.5">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputs.current[index] = el)}
                type="text"
                inputMode="numeric"
                autoComplete={index === 0 ? "one-time-code" : "off"}
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onPaste={handlePaste}
                className={`h-[48px] w-full min-w-0 rounded-lg border bg-white outline-none text-center text-[17px] font-semibold text-heading transition-all duration-200 hover:border-gray-400 focus:border-cravio focus:ring-1 focus:ring-cravio sm:h-[52px] sm:text-[18px] ${
                  authError
                    ? "border-red-400"
                    : "border-[#d5d8de]"
                }`}
                aria-label={`OTP digit ${index + 1}`}
              />
            ))}
          </div>

          {authError && (
            <p className="mt-3 text-[11px] text-red-500 text-center">
              {authError}
            </p>
          )}

          {message && (
            <p className="mt-3 text-[11px] text-green-600 text-center">
              {message}
            </p>
          )}

          <div className="mt-5 flex items-center justify-between">
            <span className="text-[11px] sm:text-[12px] text-subheading">
              Didn’t receive the code?
            </span>

            <button
              type="button"
              onClick={handleResend}
              disabled={isResending}
              className="text-[11px] sm:text-[12px] font-medium text-cravio hover:underline underline-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isResending ? "Sending..." : "Resend OTP"}
            </button>
          </div>

          <button
            type="button"
            onClick={handleVerify}
            disabled={otp.join("").length !== 6 || isVerifying}
            className="group w-full h-[44px] mt-5 rounded-lg bg-cravio hover:bg-orange-600 hover:-translate-y-[1px] hover:shadow-lg hover:shadow-orange-200/60 active:translate-y-0 active:shadow-sm transition-all duration-200 text-white text-[12px] font-semibold disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-none"
          >
            {isVerifying ? "Verifying..." : "Verify & Continue"}
          </button>

          <div className="mt-5 flex items-center justify-center gap-1.5">
            <FiShield
              size={12}
              strokeWidth={1.8}
              className="text-subheading"
            />

            <p className="text-[10px] sm:text-[11px] text-subheading">
              Your verification code is secure
            </p>
          </div>

          <p className="mt-6 text-center text-[10px] sm:text-[11px] leading-5 text-subheading">
            By continuing, you agree to Cravio’s{" "}
            <button
              type="button"
              className="font-medium text-heading hover:text-cravio hover:underline underline-offset-2"
            >
              Terms
            </button>{" "}
            &{" "}
            <button
              type="button"
              className="font-medium text-heading hover:text-cravio hover:underline underline-offset-2"
            >
              Privacy Policy
            </button>
            .
          </p>
        </div>
      </main>

      <footer className="w-full flex items-center justify-center gap-2 pb-5 px-5">
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
            <rect x="4" y="10" width="16" height="11" rx="2" />
            <path d="M8 10V7a4 4 0 0 1 8 0v3" />
          </svg>

          <span className="text-[9px] md:text-[10px] text-subheading">
            Your information is{" "}
            <span className="underline underline-offset-2 hover:text-cravio transition-colors">
              safe and secure
            </span>
          </span>
        </div>

        <span className="text-subheading">•</span>

        <button
          type="button"
          className="flex items-center gap-1 text-[9px] md:text-[10px] text-subheading hover:text-cravio transition-colors duration-200"
        >
          <span className="flex items-center justify-center w-[13px] h-[13px] rounded-full bg-subheading text-white text-[8px] font-semibold transition-all duration-200 hover:bg-cravio">
            ?
          </span>
          Help
        </button>
      </footer>
    </div>
  );
}

export default OTP;

