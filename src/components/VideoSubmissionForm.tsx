import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Link, Loader2, Sparkles, CheckCircle } from "lucide-react";

interface VideoSubmissionFormProps {
  onSubmit: (videoData: VideoSubmissionData) => Promise<boolean>;
  isLoading?: boolean;
}

export interface VideoSubmissionData {
  url: string;
  title: string;
  description: string;
  country: string;
}

export const VideoSubmissionForm = ({ onSubmit, isLoading = false }: VideoSubmissionFormProps) => {
  const [formData, setFormData] = useState<VideoSubmissionData>({
    url: '',
    title: '',
    description: '',
    country: ''
  });
  const [urlValid, setUrlValid] = useState<boolean | null>(null);
  const { toast } = useToast();

  const validateVideoUrl = (url: string) => {
    const youtubeRegex = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/;
    const tiktokRegex = /(?:tiktok\.com\/@[^\/]+\/video\/|tiktok\.com\/t\/)([a-zA-Z0-9]+)/;
    
    const isValid = youtubeRegex.test(url) || tiktokRegex.test(url);
    setUrlValid(isValid);
    return isValid;
  };

  const handleUrlChange = (url: string) => {
    setFormData(prev => ({ ...prev, url }));
    if (url) {
      validateVideoUrl(url);
    } else {
      setUrlValid(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!urlValid) {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid YouTube or TikTok URL",
        variant: "destructive"
      });
      return;
    }

    const success = await onSubmit(formData);
    
    if (success) {
      setFormData({
        url: '',
        title: '',
        description: '',
        country: ''
      });
      setUrlValid(null);
      toast({
        title: "Video added to chain! ✨",
        description: "Your video has been successfully added to the ChainStream",
      });
    }
  };

  return (
    <Card className="p-6 bg-gradient-card border-0 shadow-xl">
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-6 h-6 text-primary animate-float" />
            <h2 className="text-2xl font-bold text-foreground">Add to Chain</h2>
            <Sparkles className="w-6 h-6 text-primary animate-float" />
          </div>
          <p className="text-muted-foreground">
            Share a video that continues the chain's theme or mood
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="url" className="text-sm font-medium">
              Video URL *
            </Label>
            <div className="relative">
              <Link className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
              <Input
                id="url"
                type="url"
                placeholder="Paste YouTube or TikTok URL here..."
                value={formData.url}
                onChange={(e) => handleUrlChange(e.target.value)}
                className={`pl-10 transition-all duration-300 ${
                  urlValid === true ? 'border-chain-success' : 
                  urlValid === false ? 'border-destructive' : ''
                }`}
                required
              />
              {urlValid === true && (
                <CheckCircle className="absolute right-3 top-3 w-4 h-4 text-chain-success" />
              )}
            </div>
            <div className="flex gap-2 mt-2">
              <Badge variant="outline" className="text-xs">YouTube</Badge>
              <Badge variant="outline" className="text-xs">TikTok</Badge>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="title" className="text-sm font-medium">
              Video Title *
            </Label>
            <Input
              id="title"
              placeholder="Give your video a catchy title..."
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-medium">
              Description *
            </Label>
            <Textarea
              id="description"
              placeholder="Describe how this video connects to the chain's theme..."
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="min-h-[100px] resize-none"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="country" className="text-sm font-medium">
              Country *
            </Label>
            <Input
              id="country"
              placeholder="Where is this video from?"
              value={formData.country}
              onChange={(e) => setFormData(prev => ({ ...prev, country: e.target.value }))}
              required
            />
          </div>

          <Button 
            type="submit" 
            variant="submitVideo"
            className="w-full text-lg py-6"
            disabled={isLoading || !urlValid}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                AI is checking the connection...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                Add to ChainStream
              </>
            )}
          </Button>
        </form>
      </div>
    </Card>
  );
};