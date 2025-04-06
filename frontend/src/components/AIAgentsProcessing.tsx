
import { useState, useEffect } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { ChefHat, Search, BarChart, PieChart } from "lucide-react";

export interface AgentStatus {
  name: string;
  status: "waiting" | "processing" | "completed" | "error";
  message: string;
  progress: number;
}

interface AIAgentsProcessingProps {
  isVisible: boolean;
  onComplete: () => void;
}

const AIAgentsProcessing = ({ isVisible, onComplete }: AIAgentsProcessingProps) => {
  const [activeAgent, setActiveAgent] = useState<string>("analyzer");
  const [agents, setAgents] = useState<AgentStatus[]>([
    { name: "analyzer", status: "waiting", message: "Waiting to analyze your request...", progress: 0 },
    { name: "nutritionist", status: "waiting", message: "Waiting to assess nutritional needs...", progress: 0 },
    { name: "chef", status: "waiting", message: "Waiting to craft recipe suggestions...", progress: 0 },
    { name: "presenter", status: "waiting", message: "Waiting to prepare final presentation...", progress: 0 }
  ]);

  // Simulate AI agent processing
  useEffect(() => {
    if (!isVisible) return;
    
    const simulateAgentWork = (index: number, delay: number) => {
      setTimeout(() => {
        setAgents(current => {
          const updated = [...current];
          updated[index].status = "processing";
          updated[index].message = `${getProcessingMessage(updated[index].name)}`;
          return updated;
        });
        
        setActiveAgent(agents[index].name);
        
        // Simulate progress updates
        const progressInterval = setInterval(() => {
          setAgents(current => {
            const updated = [...current];
            if (updated[index].progress < 100) {
              updated[index].progress += Math.floor(Math.random() * 15) + 5;
              if (updated[index].progress > 100) updated[index].progress = 100;
            } else {
              clearInterval(progressInterval);
              updated[index].status = "completed";
              updated[index].message = `${getCompletedMessage(updated[index].name)}`;
              
              // Move to next agent or complete the process
              if (index < 3) {
                simulateAgentWork(index + 1, 300);
              } else {
                // All agents completed
                setTimeout(() => {
                  onComplete();
                }, 1000);
              }
            }
            return updated;
          });
        }, 300);
      }, delay);
    };
    
    // Start the first agent
    simulateAgentWork(0, 500);
  }, [isVisible]);

  const getAgentIcon = (agentName: string) => {
    switch(agentName) {
      case "analyzer": return <Search className="h-5 w-5" />;
      case "nutritionist": return <PieChart className="h-5 w-5" />;
      case "chef": return <ChefHat className="h-5 w-5" />;
      case "presenter": return <BarChart className="h-5 w-5" />;
      default: return <Search className="h-5 w-5" />;
    }
  };

  const getProcessingMessage = (agentName: string) => {
    switch(agentName) {
      case "analyzer": return "Analyzing your preferences and dietary needs...";
      case "nutritionist": return "Evaluating nutritional balance and health benefits...";
      case "chef": return "Creating and adjusting recipe combinations...";
      case "presenter": return "Arranging final presentation and details...";
      default: return "Processing your request...";
    }
  };

  const getCompletedMessage = (agentName: string) => {
    switch(agentName) {
      case "analyzer": return "Analysis complete! Preferences identified.";
      case "nutritionist": return "Nutritional assessment complete!";
      case "chef": return "Recipe creation complete!";
      case "presenter": return "Presentation ready!";
      default: return "Processing complete!";
    }
  };

  if (!isVisible) return null;

  return (
    <div className="w-full animate-fade-in">
      <Tabs value={activeAgent} className="w-full">
        <TabsList className="w-full grid grid-cols-4 mb-6">
          {agents.map((agent) => (
            <TabsTrigger 
              key={agent.name} 
              value={agent.name}
              onClick={() => setActiveAgent(agent.name)}
              className={`flex flex-col items-center gap-1 py-3 ${agent.status === "processing" ? "text-primary font-medium" : ""}`}
            >
              {getAgentIcon(agent.name)}
              <span className="capitalize text-xs md:text-sm whitespace-nowrap">{agent.name}</span>
              {agent.status === "processing" && <span className="pulse absolute top-1 right-1 h-2 w-2 rounded-full bg-primary"></span>}
            </TabsTrigger>
          ))}
        </TabsList>

        {agents.map((agent) => (
          <TabsContent key={agent.name} value={agent.name} className="border rounded-lg p-6 min-h-[250px] relative">
            <div className="flex items-center gap-3 mb-4">
              <div className={`p-2 rounded-full ${agent.status === "processing" ? "bg-primary/20 text-primary" : "bg-muted"}`}>
                {getAgentIcon(agent.name)}
              </div>
              <h3 className="text-xl font-semibold capitalize">{agent.name}</h3>
            </div>
            
            <div className="mb-6">
              <p className="text-lg mb-3">{agent.message}</p>
              <Progress value={agent.progress} className="h-2 mb-2" />
              <p className="text-sm text-muted-foreground text-right">{agent.progress}%</p>
            </div>
            
            {agent.status === "processing" && (
              <div className="mt-6 space-y-3">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-5/6" />
              </div>
            )}
            
            {agent.status === "completed" && (
              <div className="rounded-lg p-4 bg-primary/10 border border-primary/20 mt-4">
                <div className="flex items-center gap-2 text-primary font-medium">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                  <span>Task completed successfully</span>
                </div>
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default AIAgentsProcessing;
