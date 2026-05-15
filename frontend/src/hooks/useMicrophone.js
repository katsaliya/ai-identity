// Handles browser microphone recording and transcription via the backend Whisper endpoint.
// isRecording: true while the mic is active
// transcript: the transcribed text returned from the backend
// interimTranscript: live text from Web Speech API shown while recording
// start: begins recording
// stop: stops recording and sends audio to /api/transcribe

import { useState, useRef } from "react";
import { transcribeAudio } from "../api/transcribe";

// Map app language codes to BCP-47 for SpeechRecognition
const LANG_MAP = {
  en: "en-US", es: "es-ES", zh: "zh-CN",
  ar: "ar-SA", hi: "hi-IN", tl: "fil-PH",
};

export function useMicrophone(language) {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [interimTranscript, setInterimTranscript] = useState("");
  const [error, setError] = useState(null);
  const mediaRecorderRef = useRef(null);
  const recognitionRef = useRef(null);
  const chunksRef = useRef([]);

  async function start() {
    setError(null);
    setTranscript("");
    setInterimTranscript("");

    // Start Web Speech API for live interim display if browser supports it
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = LANG_MAP[language] || "en-US";
      recognition.onresult = (e) => {
        let interim = "";
        for (let i = e.resultIndex; i < e.results.length; i++) {
          interim += e.results[i][0].transcript;
        }
        setInterimTranscript(interim);
      };
      recognitionRef.current = recognition;
      recognition.start();
    }

    // Request mic permission from the browser
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorderRef.current = mediaRecorder;
    chunksRef.current = [];

    mediaRecorder.ondataavailable = (e) => chunksRef.current.push(e.data);

    mediaRecorder.onstop = async () => {
      const audioBlob = new Blob(chunksRef.current, { type: "audio/webm" });
      // Stop all mic tracks to release the browser mic indicator
      stream.getTracks().forEach((track) => track.stop());
      try {
        const text = await transcribeAudio(audioBlob, language);
        setTranscript(text);
        setInterimTranscript("");
      } catch (err) {
        setError(err.message);
        setInterimTranscript("");
      }
    };

    mediaRecorder.start();
    setIsRecording(true);
  }

  function stop() {
    recognitionRef.current?.stop();
    mediaRecorderRef.current?.stop();
    setIsRecording(false);
  }

  function clearTranscript() {
    setTranscript("");
    setInterimTranscript("");
  }

  return { isRecording, transcript, interimTranscript, error, start, stop, clearTranscript };
}
