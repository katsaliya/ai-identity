import { useState, useEffect, useRef } from "react";
import "./InputBar.css";

export default function InputBar({ onSend, onMicToggle, isRecording, transcript, interimTranscript, t, centered }) {
  const [text, setText] = useState("");
  const lastTranscriptRef = useRef("");

  useEffect(() => {
    if (isRecording) setText(interimTranscript || "");
  }, [interimTranscript, isRecording]);

  useEffect(() => {
    if (transcript && transcript !== lastTranscriptRef.current) {
      lastTranscriptRef.current = transcript;
      setText(transcript);
    }
  }, [transcript]);

  function handleSend() {
    const trimmed = text.trim();
    if (!trimmed) return;
    onSend(trimmed);
    setText("");
    lastTranscriptRef.current = "";
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <div className={`input-bar ${centered ? "centered" : ""}`}>
      <textarea
        className="input-field"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={t("placeholder")}
        rows={1}
      />

      <button
        className={`input-btn mic-btn ${isRecording ? "recording" : ""}`}
        onClick={onMicToggle}
        aria-label={isRecording ? "Stop recording" : "Start recording"}
      >
        🎙️
      </button>

      <button
        className="input-btn send-btn"
        onClick={handleSend}
        aria-label="Send message"
        disabled={!text.trim()}
      >
        ➤
      </button>
    </div>
  );
}
