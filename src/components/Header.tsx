import { Badge } from "@/components/ui/badge";
import { AuthButton } from "@/components/AuthButton";
import { Zap, Globe, Sparkles } from "lucide-react";

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Zap className="w-8 h-8 text-primary animate-float" />
              <Sparkles className="w-4 h-4 text-accent absolute -top-1 -right-1 animate-pulse" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                ChainStream
              </h1>
              <p className="text-xs text-muted-foreground">Global video connections</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="bg-gradient-accent border-0 text-accent-foreground hidden sm:flex">
              <Globe className="w-3 h-3 mr-1" />
              Worldwide
            </Badge>
            <AuthButton />
          </div>
        </div>
      </div>
    </header>
  );
};