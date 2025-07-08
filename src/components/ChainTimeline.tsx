import { VideoPlayer } from "./VideoPlayer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowDown, Zap } from "lucide-react";

interface ChainVideo {
  id: string;
  videoId: string;
  platform: 'youtube' | 'tiktok';
  title: string;
  description: string;
  country: string;
  addedAt: string;
  position: number;
}

interface ChainTimelineProps {
  videos: ChainVideo[];
  showFull?: boolean;
}

export const ChainTimeline = ({ videos, showFull = false }: ChainTimelineProps) => {
  const displayedVideos = showFull ? videos : videos.slice(0, 3);
  const hasMore = videos.length > 3 && !showFull;

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-foreground flex items-center justify-center gap-2">
          <Zap className="w-6 h-6 text-primary" />
          The Chain
        </h2>
        <p className="text-muted-foreground">
          {videos.length} videos connected by theme and mood
        </p>
      </div>

      <div className="relative">
        {displayedVideos.map((video, index) => (
          <div key={video.id} className="relative">
            <VideoPlayer
              videoId={video.videoId}
              platform={video.platform}
              title={video.title}
              description={video.description}
              country={video.country}
              addedAt={video.addedAt}
              isLatest={index === 0}
            />
            
            {index < displayedVideos.length - 1 && (
              <div className="flex items-center justify-center my-6">
                <div className="flex items-center gap-2 bg-gradient-accent px-4 py-2 rounded-full shadow-lg">
                  <ArrowDown className="w-4 h-4 text-accent-foreground animate-bounce" />
                  <span className="text-sm font-medium text-accent-foreground">
                    Connected by mood
                  </span>
                  <ArrowDown className="w-4 h-4 text-accent-foreground animate-bounce" />
                </div>
              </div>
            )}
          </div>
        ))}
        
        {hasMore && (
          <Card className="p-6 bg-gradient-accent border-0 text-center">
            <div className="space-y-2">
              <Badge variant="outline" className="bg-white/20">
                +{videos.length - 3} more videos
              </Badge>
              <p className="text-accent-foreground text-sm">
                The chain continues...
              </p>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};