import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Progress } from "../components/ui/progress";
import { Badge } from "../components/ui/badge";
import { Play, Download, TrendingUp, Cpu, Clock, CheckCircle } from "lucide-react";

const DashboardPreview = () => {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
            Your AI Model Dashboard
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Monitor training progress, analyze performance metrics, and manage your models all in one intuitive interface.
          </p>
        </div>
        
        <div className="max-w-6xl mx-auto">
          {/* Dashboard Mock */}
          <Card className="p-8 bg-gradient-card backdrop-blur-sm border-primary/10">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Training Progress */}
              <div className="lg:col-span-2 space-y-6">
                <div>
                  <h3 className="text-2xl font-semibold mb-4 text-foreground">Active Training Sessions</h3>
                  
                  <div className="space-y-4">
                    <Card className="p-4 bg-secondary/30 border-ai-green/30">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-full bg-ai-green/20">
                            <Cpu className="w-4 h-4 text-ai-green" />
                          </div>
                          <div>
                            <h4 className="font-medium text-foreground">Sentiment Analysis Model</h4>
                            <p className="text-sm text-muted-foreground">Fine-tuning BERT for product reviews</p>
                          </div>
                        </div>
                        <Badge className="bg-ai-green/20 text-ai-green">Training</Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Progress</span>
                          <span className="text-foreground">73%</span>
                        </div>
                        <Progress value={73} className="h-2" />
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>Epoch 7/10</span>
                          <span>ETA: 12 min</span>
                        </div>
                      </div>
                    </Card>
                    
                    <Card className="p-4 bg-secondary/30 border-primary/30">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-full bg-primary/20">
                            <TrendingUp className="w-4 h-4 text-primary" />
                          </div>
                          <div>
                            <h4 className="font-medium text-foreground">Image Classifier</h4>
                            <p className="text-sm text-muted-foreground">Custom dataset classification</p>
                          </div>
                        </div>
                        <Badge className="bg-primary/20 text-primary">Training</Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Progress</span>
                          <span className="text-foreground">45%</span>
                        </div>
                        <Progress value={45} className="h-2" />
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>Epoch 4/8</span>
                          <span>ETA: 25 min</span>
                        </div>
                      </div>
                    </Card>
                  </div>
                </div>
                
                {/* Metrics */}
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-foreground">Performance Metrics</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <Card className="p-4 bg-secondary/20 text-center">
                      <div className="text-2xl font-bold text-ai-green mb-1">94.7%</div>
                      <div className="text-sm text-muted-foreground">Accuracy</div>
                    </Card>
                    <Card className="p-4 bg-secondary/20 text-center">
                      <div className="text-2xl font-bold text-ai-blue mb-1">0.23</div>
                      <div className="text-sm text-muted-foreground">Loss</div>
                    </Card>
                    <Card className="p-4 bg-secondary/20 text-center">
                      <div className="text-2xl font-bold text-primary mb-1">2.1s</div>
                      <div className="text-sm text-muted-foreground">Inference</div>
                    </Card>
                  </div>
                </div>
              </div>
              
              {/* Recent Models */}
              <div>
                <h3 className="text-lg font-semibold mb-4 text-foreground">Recent Models</h3>
                <div className="space-y-3">
                  <Card className="p-3 bg-secondary/20">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-sm text-foreground">Text Summarizer</h4>
                      <CheckCircle className="w-4 h-4 text-ai-green" />
                    </div>
                    <p className="text-xs text-muted-foreground mb-3">Completed 2 hours ago</p>
                    <Button size="sm" variant="ai-outline" className="w-full">
                      <Download className="w-3 h-3" />
                      Download
                    </Button>
                  </Card>
                  
                  <Card className="p-3 bg-secondary/20">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-sm text-foreground">Code Generator</h4>
                      <CheckCircle className="w-4 h-4 text-ai-green" />
                    </div>
                    <p className="text-xs text-muted-foreground mb-3">Completed 1 day ago</p>
                    <Button size="sm" variant="ai-outline" className="w-full">
                      <Download className="w-3 h-3" />
                      Download
                    </Button>
                  </Card>
                  
                  <Card className="p-3 bg-secondary/20">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-sm text-foreground">Speech Recognizer</h4>
                      <Clock className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <p className="text-xs text-muted-foreground mb-3">In queue</p>
                    <Button size="sm" variant="secondary" className="w-full">
                      <Play className="w-3 h-3" />
                      Start Training
                    </Button>
                  </Card>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default DashboardPreview;