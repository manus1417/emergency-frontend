import React, { useEffect, useState } from "react";
import Header from "../../Components/Header";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { IoMdSend } from "react-icons/io";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { MdOutlineNotStarted } from "react-icons/md";
import { FaStopCircle } from "react-icons/fa";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

const ChatbotPage = () => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();
  const [prompt, setPrompt] = useState("");
  const [text, setText] = useState("");
  const [text2, setText2] = useState("");
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [language, setLanguage] = useState("english"); // Default language is English

  const genAI = new GoogleGenerativeAI(
    "AIzaSyBgGC-V-QsWifrOG61I5uHlCFNOSyqx1r8"
  );

  const run = async () => {
    setLoading(true);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const result = await model.generateContent(prompt, { language });
    const response = await result.response;
    setText(response.text());
    setLoading(false);
  };

  const run2 = async () => {
    setLoading2(true);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const result = await model.generateContent(transcript, { language });
    const response = await result.response;
    setText2(response.text());

    setLoading2(false);
  };

  const toggleLanguage = () => {
    setLanguage(language === "english" ? "telegu" : "english");
  };

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  const handleClear = () => {
    console.log("clicked");
    setPrompt("");
    setText("");
  };
  const handleClear2 = () => {
    window.location.reload();
  };
  return (
    <div className="flex">
      <Header />
      <div className="bg-blue-200  flex justify-between p-4 w-full">
        <div className="content p-4 ">
          {/* English Input */}
          <div className="input mt-5 flex justify-center items-center gap-5">
            <textarea
              className="p-4 outline-none border-black border-2 rounded-xl"
              placeholder="Type your doubt!!"
              cols={50}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            ></textarea>
            <button
              className="bg-violet-500 p-4 cursor-pointer rounded-xl hover:bg-violet-400"
              onClick={run}
            >
              <IoMdSend size={40} />
            </button>
          </div>
          {text ? (
            <div className="flex justify-center items-center mt-5">
              <button
                className="bg-red-500 p-4 cursor-pointer rounded-xl hover:bg-red-400 font-bold"
                onClick={handleClear}
              >
                Clear
              </button>
            </div>
          ) : null}

          {/* Loading Spinner */}
          {loading ? (
            <div className="flex justify-center items-center mt-40 ">
              <AiOutlineLoading3Quarters className="animate-spin" size={80} />
            </div>
          ) : (
            /* English Response */
            <div
              className={`mt-10 flex justify-center items-center ${
                text === "" ? "hidden" : null
              }`}
            >
              <div className="flex flex-col items-center gap-10 bg-white p-6 rounded-xl shadow-xl min-h-fit max-h-[400px] w-[600px] overflow-auto  font-semibold">
                <h1 className="font-bold text-4xl">Response</h1>
                <h1>{text}</h1>
              </div>
            </div>
          )}
        </div>

        {/* Telugu Input */}
        <div className="content p-4">
          <div className="input mt-5 flex justify-center items-center gap-5">
            <textarea
              className="p-4 outline-none border-black border-2 rounded-xl"
              placeholder="Speak your doubt!!"
              cols={50}
              value={transcript}
              onChange={(e) => setPrompt(e.target.value)}
            ></textarea>
            <button
              className="bg-violet-500 p-4 cursor-pointer rounded-xl hover:bg-violet-400"
              onClick={run2}
            >
              <IoMdSend size={40} />
            </button>
          </div>

          {/* Recording Buttons */}
          <div className="button flex justify-center items-center mt-5 gap-5 font-bold text-lg">
            <button
              className="p-4 rounded-xl bg-green-500 hover:bg-green-400 cursor-pointer flex justify-center items-center gap-2"
              onClick={() =>
                SpeechRecognition.startListening({ continuous: true })
              }
            >
              <MdOutlineNotStarted />
              Start Recording
            </button>
            <button
              className="p-4 rounded-xl bg-red-500 hover:bg-red-400 cursor-pointer flex justify-center items-center gap-2"
              onClick={SpeechRecognition.stopListening}
            >
              <FaStopCircle />
              Stop Recording
            </button>
          </div>
          {text2 ? (
            <div className="flex justify-center items-center mt-5">
              <button
                className="bg-red-500 p-4 cursor-pointer rounded-xl hover:bg-red-400 font-bold"
                onClick={handleClear2}
              >
                Clear
              </button>
            </div>
          ) : null}
          {/* Loading Spinner */}
          {loading2 ? (
            <div className="flex justify-center items-center mt-40 ">
              <AiOutlineLoading3Quarters className="animate-spin" size={80} />
            </div>
          ) : (
            /* Telugu Response */
            <div
              className={`mt-10 flex justify-center items-center ${
                text2 === "" ? "hidden" : null
              }`}
            >
              <div className="flex flex-col items-center gap-10 bg-white p-6 rounded-xl shadow-xl min-h-fit max-h-[400px] w-[600px] overflow-auto  font-semibold">
                <h1 className="font-bold text-4xl">Response</h1>
                <h1>{text2}</h1>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatbotPage;
