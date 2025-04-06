
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="w-full py-6 px-6 md:px-10 flex justify-between items-center">
      <div className="flex items-center gap-2">
        <h1 className="text-3xl font-heading text-primary">FRIDGE to <span className="text-secondary">FORK</span></h1>
      </div>
      <div className="flex gap-3">
        <Button variant="outline" className="rounded-full px-6">Sign in</Button>
        <Button className="rounded-full px-6 bg-primary text-white hover:bg-primary/90">Sign up</Button>
      </div>
    </header>
  );
};

export default Header;
