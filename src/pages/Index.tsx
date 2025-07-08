import { useState } from "react";
import { Header } from "@/components/Header";
import { VideoPlayer } from "@/components/VideoPlayer";
import { VideoSubmissionForm, VideoSubmissionData } from "@/components/VideoSubmissionForm";
import { ChainTimeline } from "@/components/ChainTimeline";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Sparkles, ArrowRight, Globe, Users, Zap } from "lucide-react";
import heroBackground from "@/assets/hero-background.jpg";

// Mock data for demonstration
const mockVideos = [
  {
    id: "1",
    videoId: "dQw4w9WgXcQ",
    platform: "youtube" as const,
    title: "Never Gonna Give You Up",
    description: "A classic that brings joy and nostalgia to people worldwide",
    country: "United Kingdom",
    addedAt: "2 hours ago",
    position: 1
  },
  {
    id: "2", 
    videoId: "9bZkp7q19f0",
    platform: "youtube" as const,
    title: "PSY - GANGNAM STYLE",
    description: "Energetic dance moves that spread happiness globally",
    country: "South Korea",
    addedAt: "5 hours ago", 
    position: 2
  },
  {
    id: "3",
    videoId: "kJQP7kiw5Fk",
    platform: "youtube" as const,
    title: "Despacito",
    description: "Vibrant Latin rhythms that make the world dance",
    country: "Puerto Rico",
    addedAt: "8 hours ago",
    position: 3
  }
];

const Index = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSubmissionForm, setShowSubmissionForm] = useState(false);
  const { toast } = useToast();

  const handleVideoSubmission = async (videoData: VideoSubmissionData): Promise<boolean> => {
    setIsSubmitting(true);
    
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Mock AI validation (for demo purposes)
    const aiApproved = Math.random() > 0.3; // 70% approval rate
    
    if (aiApproved) {
      toast({
        title: "✨ Perfect match!",
        description: "AI detected a great thematic connection. Your video has been added to the chain!",
      });
      setShowSubmissionForm(false);
      setIsSubmitting(false);
      return true;
    } else {
      toast({
        title: "🤔 Theme mismatch",
        description: "AI couldn't find a strong connection to the current chain. Try a different video that matches the mood!",
        variant: "destructive"
      });
      setIsSubmitting(false);
      return false;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section 
        className="relative py-20 px-4 text-center overflow-hidden"
        style={{
          backgroundImage: `url(${heroBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm"></div>
        <div className="relative container mx-auto max-w-4xl space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent animate-slide-in-up">
              Connect the World
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto animate-slide-in-up">
              A never-ending chain of videos connected by theme, mood, and global creativity
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
              <Globe className="w-4 h-4 text-primary" />
              <span>Global Community</span>
            </div>
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
              <Zap className="w-4 h-4 text-primary" />
              <span>AI-Powered Connections</span>
            </div>
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
              <Users className="w-4 h-4 text-primary" />
              <span>Creative Expression</span>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12 max-w-4xl space-y-12">
        {/* Latest Video */}
        <section className="space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold text-foreground flex items-center justify-center gap-2">
              <Sparkles className="w-8 h-8 text-primary animate-float" />
              Latest in the Chain
            </h2>
            <p className="text-muted-foreground">
              The newest video that continues our global story
            </p>
          </div>
          
          <div className="animate-slide-in-up">
            <VideoPlayer
              {...mockVideos[0]}
              isLatest={true}
            />
          </div>
          
          <div className="text-center space-y-4">
            {!showSubmissionForm && (
              <Button 
                onClick={() => setShowSubmissionForm(true)}
                variant="playful"
                size="lg"
                className="text-lg px-8 py-6"
              >
                <Sparkles className="w-5 h-5" />
                Add Next Video
                <ArrowRight className="w-5 h-5" />
              </Button>
            )}
          </div>
        </section>

        {/* Submission Form */}
        {showSubmissionForm && (
          <section className="animate-slide-in-up">
            <VideoSubmissionForm 
              onSubmit={handleVideoSubmission}
              isLoading={isSubmitting}
            />
            <div className="text-center mt-4">
              <Button 
                variant="ghost" 
                onClick={() => setShowSubmissionForm(false)}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
            </div>
          </section>
        )}

        {/* Chain Timeline */}
        <section className="animate-slide-in-up">
          <ChainTimeline videos={mockVideos} />
        </section>

        {/* How it Works */}
        <section className="space-y-8">
          <h2 className="text-3xl font-bold text-center text-foreground">
            How ChainStream Works
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6 text-center space-y-4 bg-gradient-card border-0">
              <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mx-auto">
                <span className="text-white font-bold text-xl">1</span>
              </div>
              <h3 className="font-bold text-lg">Watch Latest</h3>
              <p className="text-muted-foreground text-sm">
                Start by watching the current last video in our global chain
              </p>
            </Card>
            
            <Card className="p-6 text-center space-y-4 bg-gradient-card border-0">
              <div className="w-12 h-12 bg-gradient-accent rounded-full flex items-center justify-center mx-auto">
                <span className="text-accent-foreground font-bold text-xl">2</span>
              </div>
              <h3 className="font-bold text-lg">Find Connection</h3>
              <p className="text-muted-foreground text-sm">
                Share a video that matches the theme, mood, or feeling
              </p>
            </Card>
            
            <Card className="p-6 text-center space-y-4 bg-gradient-card border-0">
              <div className="w-12 h-12 bg-chain-success rounded-full flex items-center justify-center mx-auto">
                <span className="text-white font-bold text-xl">3</span>
              </div>
              <h3 className="font-bold text-lg">AI Validates</h3>
              <p className="text-muted-foreground text-sm">
                Our AI checks the connection and adds it to the chain if it fits
              </p>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Index;
