import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Timer } from '../components/Timer';
import AgentFlowGraph from "./AgentFlowGraph";

import { 
  Dialog,
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogClose
} from '@/components/ui/dialog';

const mockData = {
  agentTimes: {
    analyzer: 25,
    nutritionist: 40,
    chef: 55,
    documenter: 35
  },
  logs: [
    {
      user_input: "choice1, choice2, choice3, choice4, choice5, choice6",
      summary: {
        Analyzer: "Multiple analysis tasks completed for menu items and ingredients",
        Nutritionist: "Nutritional assessment and labeling for menu items",
        Chef: "Recipe development and kitchen workflow optimization",
        Documenter: "Documentation created for recipes, allergens, and training"
      },
      entries: `Analyzed ingredient compatibility for spring menu\nEvaluated nutritional balance of proposed dishes\nIdentified potential allergens in seafood selection\nCompleted flavor profile analysis for new dessert menu\nReviewed cooking time estimates for accuracy...`
    }
  ]
};

const agentImages = {
  analyzer: "/lovable-uploads/8f445958-3066-4b8d-8e06-8fe39db7f6e9.png",
  nutritionist: "/lovable-uploads/94168bd6-6ec8-4039-8af6-55f0bf8188cd.png",
  chef: "/lovable-uploads/afd835c9-6f99-4e21-92d3-0b1f3f48dc4c.png",
  documenter: "/lovable-uploads/93cc5b21-ae3d-4bd3-a542-8bab50284bb9.png"
};

const Dashboard = () => {
  const [data, setData] = useState(mockData);
  const [selectedLog, setSelectedLog] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 500));
        setData(mockData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const openLogDialog = (index: number) => {
    setSelectedLog(index);
  };

  const closeLogDialog = () => {
    setSelectedLog(null);
  };

  const navigate = useNavigate();

  const handleH1Click = () => {
    navigate("/"); // Navigate to the root path "/" (home page)
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="min-h-screen flex flex-col">
        <div className="food-pattern-header py-1">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-7xl md:text-7xl font-extrabold mb-2 tracking-wide cursor-pointer"
                style={{
                  fontFamily: 'Regad',
                  color: 'rgb(82, 52, 0)',
                  textShadow: '2px 2px 6px rgba(0, 0, 0, 0.2)',
                }} onClick={handleH1Click}
              >
                MASala
              </h1>
            </div>
          </div>
        </div>

        <main className="flex-grow">
        <div className="p-6">
          <h2 className="text-2xl font-semibold mb-4">AI Agent Workflow</h2>
          <AgentFlowGraph />
        </div>
          <div className="max-w-7xl mx-auto py-4 px-4">
            <div className="flex flex-col lg:flex-row gap-8">

              {/* Agent Times - 50% */}
              <section className="lg:w-1/2 w-full">
                <h2 className="text-2xl font-bold text-food-brown mb-4 text-center">Total Time Spent by Each Agent</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <AgentTimeCard title="Analyzer" time={data.agentTimes.analyzer} imageSrc={agentImages.analyzer} />
                  <AgentTimeCard title="Nutritionist" time={data.agentTimes.nutritionist} imageSrc={agentImages.nutritionist} />
                  <AgentTimeCard title="Chef" time={data.agentTimes.chef} imageSrc={agentImages.chef} />
                  <AgentTimeCard title="Documenter" time={data.agentTimes.documenter} imageSrc={agentImages.documenter} />
                </div>
              </section>

              {/* Logs - 50% */}
              <section className="lg:w-1/2 w-full">
                <h2 className="text-2xl font-bold text-food-brown mb-6 text-center">Log</h2>
                <div className="space-y-6">
                  {data.logs.map((log, index) => (
                    <LogCard 
                      key={index} 
                      user_input={log.user_input} 
                      summary={log.summary} 
                      onClick={() => openLogDialog(index)} 
                    />
                  ))}
                </div>
              </section>
            </div>
          </div>
        </main>

        <Dialog open={selectedLog !== null} onOpenChange={closeLogDialog}>
          {selectedLog !== null && (
            <DialogContent className="bg-food-cream border-food-cream-dark max-w-3xl">
              <DialogHeader>
                <DialogTitle className="text-xl font-bold text-food-brown"> User input: <span className='font-normal'>{data.logs[selectedLog].user_input}</span></DialogTitle>
                <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 hover:opacity-100 focus:outline-none">
                </DialogClose>
              </DialogHeader>
              <ScrollArea className="h-72 w-full pr-4">
                <div className="bg-black text-green-400 font-mono p-4 rounded whitespace-pre-wrap">
                  {data.logs[selectedLog].entries}
                </div>
              </ScrollArea>
            </DialogContent>
          )}
        </Dialog>
      </div>
    </div>
  );
};

const AgentTimeCard = ({ title, time, imageSrc }: { title: string, time: number, imageSrc: string }) => {
  return (
    <Card className="relative h-[225px] w-[275px] bg-food-cream shadow-md border border-food-cream-dark overflow-hidden">
      <div 
        className="absolute top-[20%] left-0 w-full h-[80%] bg-no-repeat bg-contain bg-center opacity-50 z-0"
        style={{ backgroundImage: `url(${imageSrc})` }}
      />
      <div className="relative z-10 h-full flex flex-col">
        <CardHeader className="pb-0 pt-3 bg-food-cream">
          <CardTitle className="text-xl font-bold text-food-brown text-center m-0">{title}</CardTitle>
        </CardHeader>
        <div className="flex-grow" />
        <CardContent className="flex justify-center mb-5">
          <Timer initialTime={time} />
        </CardContent>
      </div>
    </Card>
  );
};

const LogCard = ({ user_input, summary, onClick }: { user_input: string, summary: Record<string, string>, onClick: () => void }) => {
  return (
    <Card 
      className="bg-food-cream shadow-md border border-food-cream-dark hover:bg-food-cream-dark transition-colors cursor-pointer"
      onClick={onClick}
    >
      <CardHeader className="pb-4">
      <p className="text-lg font-bold text-food-brown">
        User inputs: <span className="font-normal">{user_input}</span>
      </p>

        <ul className="list-disc pl-5 space-y-1">
          {Object.entries(summary).map(([key, value], i) => (
            <li key={i}>
              <span className="font-semibold text-food-brown">{key}:</span> <span className="text-food-brown">{value}</span>
            </li>
          ))}
        </ul>
      </CardHeader>
    </Card>
  );
};

export default Dashboard;