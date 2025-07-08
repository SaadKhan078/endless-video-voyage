import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MapPin, Calendar, User } from "lucide-react";

interface VideoPlayerProps {
  videoId: string;
  platform: 'youtube' | 'tiktok';
  title: string;
  description: string;
  country: string;
  addedAt: string;
  isLatest?: boolean;
  userEmail?: string;
  userName?: string;
  userAvatarUrl?: string;
}

export const VideoPlayer = ({ 
  videoId, 
  platform, 
  title, 
  description, 
  country, 
  addedAt,
  isLatest = false,
  userEmail,
  userName,
  userAvatarUrl 
}: VideoPlayerProps) => {
  const getEmbedUrl = () => {
    if (platform === 'youtube') {
      return `https://www.youtube.com/embed/${videoId}?rel=0&showinfo=0`;
    } else {
      return `https://www.tiktok.com/embed/v2/${videoId}`;
    }
  };

  return (
    <Card className={`overflow-hidden bg-gradient-card border-0 shadow-xl ${isLatest ? 'animate-pulse-glow' : ''} transition-all duration-500`}>
      <div className="aspect-video relative">
        <iframe
          src={getEmbedUrl()}
          className="w-full h-full rounded-t-lg"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
        {isLatest && (
          <Badge 
            variant="secondary" 
            className="absolute top-4 right-4 bg-chain-success text-white animate-float"
          >
            Latest in Chain
          </Badge>
        )}
      </div>
      
      <div className="p-6 space-y-4">
        <h3 className="text-xl font-bold text-foreground leading-tight">
          {title}
        </h3>
        
        <p className="text-muted-foreground leading-relaxed">
          {description}
        </p>
        
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-primary" />
            <span className="font-medium">{country}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-primary" />
            <span>{addedAt}</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <Badge variant="outline" className="w-fit capitalize">
            {platform}
          </Badge>
          
          {userName && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Added by</span>
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={userAvatarUrl || undefined} alt={userName} />
                  <AvatarFallback className="bg-gradient-primary text-primary-foreground text-xs">
                    {userName.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <span className="font-medium">{userName}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};