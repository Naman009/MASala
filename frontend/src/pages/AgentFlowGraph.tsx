import React from "react";

export default function AgentWorkflowVideo() {
  return (
    <div className="flex flex-col items-center py-10 px-6">
      <h1 className="text-3xl font-bold mb-8 text-center">AI Agents Recursive Workflow</h1>

      <div className="flex flex-col md:flex-row items-center gap-8">
        <video
          src="/AIFlow.mp4"
          className="w-full max-w-md rounded-lg shadow-md"
          autoPlay
          muted
          loop
          playsInline
        />

        <p className="text-gray-600 max-w-md text-sm">
          This animation illustrates a recursive sequence between four specialized AI agents: Analyzer, Nutritionist, Chef, and Presenter. Each agent processes information and passes it forward, with Presenter sending feedback to Analyzer for iterative refinement.
        </p>
      </div>
    </div>
  );
}