import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header"; 
import SendEmailApi from "../apis/sendEmailApi";

const EmailOtpForm = () => {
  const [email, setEmail] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState(Array(4).fill(""));
  const [otpResponse, setOtpResponse] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [response, setResponse] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    let timer;
    if (isSending && countdown > 0) {
      timer = setInterval(() => setCountdown((prev) => prev - 1), 1000);
    } else if (countdown === 0) {
      setIsSending(false);
    }
    return () => clearInterval(timer);
  }, [isSending, countdown]);

  const sendMail = (otp) => {
    try {
      const data = SendEmailApi.sendEmail({
        OTP: otp,
        recipient_email: email,
      })
      setResponse(data.data);
    }
    catch{
      console.error(error);
    }
  }

  const handleSendEmail = () => {
    if (email) {
      const OTP = Math.floor(Math.random() * 9000 + 1000);
      setOtpResponse(OTP);
      sendMail(OTP);
      setShowOtp(true);
      setIsSending(true);
      setCountdown(15);
    }
    else{
      alert("vui lòng nhập đúng email");
    }
  };

  const handleOtpSubmit = () => {
    const otpValue = parseInt(otp.join(""));
    if (otpValue === otpResponse) {
      navigate("/reset-password", {
        state: {
          email: email,
        }
      });
    } else {
      console.log("OTP is incorrect");
      alert("OTP is incorrect");
    }
  }

  const handleOtpChange = (index, value) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < otp.length - 1) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };
  
  return (
    <>
    <Header />
    <div className="text-center text-red-500 text-lg font-semibold mt-2">
      Nhập Email của bạn!
    </div>
    <div className="max-w-md mx-auto p-6 mt-5 bg-white border">
      <div className="flex items-center gap-4">
        <input
          type="email"
          placeholder="Nhập email của bạn"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSendEmail}
          disabled={isSending}
          className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-300"
        >
          {isSending ? `Gửi lại sau ${countdown}s` : "Gửi"}
        </button>
      </div>
    </div>
    {showOtp && (
      <div className="flex flex-col items-center justify-center space-y-6">
        <div className="flex justify-center gap-3 mt-10">
          {otp.map((value, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              type="text"
              value={value}
              onChange={(e) => handleOtpChange(index, e.target.value)}
              maxLength={1}
              className="w-20 h-20 text-center text-2xl font-bold border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500 transition-all shadow-md"
            />
          ))}
        </div>
        <button onClick={handleOtpSubmit} className="px-8 py-4 bg-green-500 text-white font-semibold rounded-xl hover:bg-green-600 transition-all duration-300 shadow-lg">
          Xác nhận
        </button>
      </div>
    )}
    </>
  );
};

export default EmailOtpForm;