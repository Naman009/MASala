import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";

interface AgentStatus {
  name: string;
  label: string;
  image: string;
  logs: string[];
}

interface AIAgentsProcessingProps {
  isVisible: boolean;
  onComplete: () => void;
}

const agentMap: Record<string, AgentStatus> = {
  analyzer: {
    name: "analyzer",
    label: "Analyzer",
    image: "/AnalyzerAgent.png",
    logs: [
      "Parsing user input...",
      "Identifying dietary restrictions...",
      "Asking Nutritionist for analysis...",
    ],
  },
  analyzer2: {
    name: "analyzer",
    label: "Analyzer",
    image: "/AnalyzerAgent.png",
    logs: [
      "Analyzing Presenter's data...",
      "Checking mode details...",
      "Asking Nutritionist for further analysis...",
    ],
  },
  nutritionist: {
    name: "nutritionist",
    label: "Nutritionist",
    image: "/nutritionistAgent.png",
    logs: [
      "Evaluating macros & allergens...",
      "Recommending ingredient swaps...",
      "Responding to Analyzer...",
    ],
  },
  nutritionist2: {
    name: "nutritionist",
    label: "Nutritionist",
    image: "/nutritionistAgent.png",
    logs: [
      "Evaluating more from Analyzer...",
      "Recommending ingredient swaps...",
      "Responding to Chef...",
    ],
  },
  chef: {
    name: "chef",
    label: "Chef",
    image: "/ChefAgent.png",
    logs: [
      "Designing recipe variations...",
      "Cross-checking with dietary goals...",
      "Sharing draft with Analyzer...",
    ],
  },
  chef2: {
    name: "chef",
    label: "Chef",
    image: "/ChefAgent.png",
    logs: [
      "Designing recipe variations...",
      "Cross-checking with dietary goals...",
      "Finalizing to Presenter...",
    ],
  },
  presenter: {
    name: "presenter",
    label: "Presenter",
    image: "/PrecenterAgent.png",
    logs: [
      "Polishing layout...",
      "Creating summary & visual cards...",
      "Need to give some feedback to Analyzer...",
    ],
  },
  presenter2: {
    name: "presenter",
    label: "Presenter",
    image: "/PrecenterAgent.png",
    logs: [
      "Reviewing layout...",
      "Creating summary & visual cards...",
      "Finalizing for user presentation...",
    ],
  },
};

const initialSequence = ["analyzer", "nutritionist", "chef", "presenter"];
const loopSequence = ["analyzer2", "nutritionist2", "chef2", "presenter2"];

const AIAgentsProcessing = ({ isVisible, onComplete }: AIAgentsProcessingProps) => {
  const [step, setStep] = useState(0);
  const [logIndex, setLogIndex] = useState(0);
  const [looping, setLooping] = useState(false);
  const [tick, setTick] = useState(0);

  const currentAgentName = looping
    ? loopSequence[step % loopSequence.length]
    : initialSequence[step];
  const currentAgent = agentMap[currentAgentName];

  const statusText = initialSequence.includes(currentAgentName) ? "Started" : "Working";

  useEffect(() => {
    if (!isVisible) return;

    const logInterval = setInterval(() => {
      setLogIndex((prev) => {
        if (prev < currentAgent.logs.length - 1) return prev + 1;
        return prev;
      });
    }, 1000);

    const stepDelay = setTimeout(() => {
      if (!looping && step < initialSequence.length - 1) {
        setStep((prev) => prev + 1);
        setLogIndex(0);
      } else {
        setLooping(true);
        setStep((prev) => prev + 1);
        setLogIndex(0);
        setTick((prev) => prev + 1);
      }
    }, 4000);

    return () => {
      clearTimeout(stepDelay);
      clearInterval(logInterval);
    };
  }, [step, isVisible, looping, tick]);

  if (!isVisible) return null;

  return (
    <div className="w-full flex flex-col items-center justify-center animate-fade-in space-y-6">
      <h2 className="text-2xl font-semibold text-center">
        👩‍🍳 Agents are collaborating to cook up something amazing...
      </h2>

      <Card className="w-full max-w-md p-6 shadow-xl flex flex-col items-center space-y-4 bg-white/90">
        <img
          src={currentAgent.image}
          alt={currentAgent.label}
          width={130}
          height={130}
          className="rounded-xl object-contain"
        />

        <h3 className="text-xl font-bold">{currentAgent.label}</h3>

        {/* Status with green dot */}
        <div className="flex items-center gap-2 text-green-700 font-semibold text-sm">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          {statusText}
        </div>

        {/* Logs */}
        <div className="w-full h-24 bg-muted rounded-md p-3 overflow-y-auto text-sm font-mono">
          {currentAgent.logs.slice(0, logIndex + 1).map((log, idx) => (
            <p key={idx}>• {log}</p>
          ))}
        </div>
      </Card>
      {/* 🌐 Open in New Tab Button */}
      <button
        onClick={() => window.open("https://smith.langchain.com/o/faef8860-9b0b-41f6-951c-902f1da8509d/projects/p/e894630e-fa25-4c78-acd1-d211b62e289b", "_blank")}
        className="mt-4 px-5 py-3 bg-blue-600 text-white font-semibold rounded-full shadow-md hover:bg-blue-700 transition-all"
      >
        Monitor us with real-time Stats!
      </button>
    </div>
  );
};

export default AIAgentsProcessing;
