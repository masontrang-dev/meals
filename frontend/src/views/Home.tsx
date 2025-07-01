import { Button } from "@/components/ui/button";

const Home = () => {
  return (
    <div>
      <div className="flex flex-col items-center justify-center min-h-[30vh] bg-blue-50 rounded-lg shadow-md p-8 mt-2">
        <img
          src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80"
          alt="Healthy meal"
          className="w-32 h-32 rounded-full mb-6 shadow"
        />
        <h1 className="text-3xl font-bold text-blue-700 mb-2 text-center">
          Welcome to Meals App!
        </h1>
        <p className="text-lg text-blue-900 mb-4 text-center">
          Plan your meals, discover new recipes, and make healthy eating easy.
        </p>
        <div>
          <Button variant="secondary">Plan a meal</Button>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center min-h-[15vh] bg-blue-50 rounded-lg shadow-md p-8 mt-4">
        <div>Upcoming Meals</div>
      </div>
      <div className="flex flex-col items-center justify-center min-h-[15vh] bg-blue-50 rounded-lg shadow-md p-8 mt-4">
        <div>Popular Meals</div>
      </div>
      <div className="flex flex-col items-center justify-center min-h-[15vh] bg-blue-50 rounded-lg shadow-md p-8 mt-4">
        <div>Stats (how many meals cooked this/per week)</div>
      </div>
    </div>
  );
};

export default Home;
