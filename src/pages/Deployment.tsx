
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, Globe, Rocket } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Deployment = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Deployment Information
        </h1>
        
        <div className="grid gap-6 md:grid-cols-2">
          {/* Live Demo Card */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Globe className="w-5 h-5" />
                Live Demo
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300">
                Once deployed to GitHub Pages, your pathfinding visualizer will be available at:
              </p>
              <div className="bg-gray-900 p-3 rounded border border-gray-600">
                <code className="text-green-400">
                  https://yourusername.github.io/heloo/
                </code>
              </div>
              <Button 
                className="w-full bg-blue-600 hover:bg-blue-700"
                onClick={() => window.open('https://yourusername.github.io/heloo/', '_blank')}
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                View Live Demo
              </Button>
            </CardContent>
          </Card>

          {/* GitHub Repository Card */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Github className="w-5 h-5" />
                GitHub Repository
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300">
                Your source code will be available in the GitHub repository:
              </p>
              <div className="bg-gray-900 p-3 rounded border border-gray-600">
                <code className="text-green-400">
                  https://github.com/yourusername/heloo
                </code>
              </div>
              <Button 
                variant="outline" 
                className="w-full border-gray-600 text-white hover:bg-gray-700"
                onClick={() => window.open('https://github.com/yourusername/heloo', '_blank')}
              >
                <Github className="w-4 h-4 mr-2" />
                View Repository
              </Button>
            </CardContent>
          </Card>

          {/* Deployment Steps Card */}
          <Card className="bg-gray-800 border-gray-700 md:col-span-2">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Rocket className="w-5 h-5" />
                Deployment Steps
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="space-y-3 text-gray-300">
                <li className="flex items-start gap-3">
                  <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">1</span>
                  <div>
                    <strong className="text-white">Connect to GitHub:</strong>
                    <p>Click the GitHub button in the top right of Lovable and connect your account.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">2</span>
                  <div>
                    <strong className="text-white">Create Repository:</strong>
                    <p>Name it "heloo" and let Lovable create the repository with your code.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">3</span>
                  <div>
                    <strong className="text-white">Enable GitHub Pages:</strong>
                    <p>Go to your repository Settings → Pages → Deploy from branch (main).</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">4</span>
                  <div>
                    <strong className="text-white">Access Your App:</strong>
                    <p>Your pathfinding visualizer will be live at the GitHub Pages URL!</p>
                  </div>
                </li>
              </ol>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 text-center">
          <Button 
            onClick={() => navigate('/')}
            className="bg-purple-600 hover:bg-purple-700"
          >
            Back to Pathfinding Visualizer
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Deployment;
