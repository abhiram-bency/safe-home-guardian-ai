
import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { BellRing, Clock, Video, Shield, AlertTriangle, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Settings = () => {
  const [notificationSettings, setNotificationSettings] = useState({
    doorAlerts: true,
    motionAlerts: true,
    cameraAlerts: false,
    dailyReports: true,
    soundAlerts: true,
  });
  
  const [alarmSettings, setAlarmSettings] = useState({
    alarmMode: "home",
    alarmVolume: 50,
    delaySeconds: 30,
  });
  
  const { toast } = useToast();
  
  const handleNotificationToggle = (setting: keyof typeof notificationSettings) => {
    setNotificationSettings((prev) => ({
      ...prev,
      [setting]: !prev[setting],
    }));
  };
  
  const handleAlarmModeChange = (value: string) => {
    setAlarmSettings((prev) => ({
      ...prev,
      alarmMode: value,
    }));
  };
  
  const handleVolumeChange = (value: number[]) => {
    setAlarmSettings((prev) => ({
      ...prev,
      alarmVolume: value[0],
    }));
  };
  
  const handleSaveSettings = () => {
    // In a real app, you would save these to a database
    toast({
      title: "Settings Saved",
      description: "Your security preferences have been updated.",
    });
  };

  return (
    <MainLayout>
      <div className="container py-12">
        <h1 className="text-3xl font-bold mb-8">Security Settings</h1>
        
        <Tabs defaultValue="notifications" className="max-w-4xl">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <BellRing className="h-4 w-4" /> Notifications
            </TabsTrigger>
            <TabsTrigger value="alarm" className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" /> Alarm System
            </TabsTrigger>
            <TabsTrigger value="camera" className="flex items-center gap-2">
              <Video className="h-4 w-4" /> Camera Settings
            </TabsTrigger>
          </TabsList>
          
          {/* Notifications Tab */}
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>
                  Choose which security events you want to be notified about.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="door-alerts">Door/Window Alerts</Label>
                    <div className="text-sm text-muted-foreground">
                      Get notified when doors or windows are opened
                    </div>
                  </div>
                  <Switch
                    id="door-alerts"
                    checked={notificationSettings.doorAlerts}
                    onCheckedChange={() => handleNotificationToggle("doorAlerts")}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="motion-alerts">Motion Detection</Label>
                    <div className="text-sm text-muted-foreground">
                      Receive alerts when motion is detected in monitored areas
                    </div>
                  </div>
                  <Switch
                    id="motion-alerts"
                    checked={notificationSettings.motionAlerts}
                    onCheckedChange={() => handleNotificationToggle("motionAlerts")}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="camera-alerts">Camera Event Alerts</Label>
                    <div className="text-sm text-muted-foreground">
                      Get notified when cameras detect suspicious activity
                    </div>
                  </div>
                  <Switch
                    id="camera-alerts"
                    checked={notificationSettings.cameraAlerts}
                    onCheckedChange={() => handleNotificationToggle("cameraAlerts")}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="daily-reports">Daily Security Reports</Label>
                    <div className="text-sm text-muted-foreground">
                      Receive a daily summary of security events
                    </div>
                  </div>
                  <Switch
                    id="daily-reports"
                    checked={notificationSettings.dailyReports}
                    onCheckedChange={() => handleNotificationToggle("dailyReports")}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="sound-alerts">Sound Alerts</Label>
                    <div className="text-sm text-muted-foreground">
                      Play sound on your device when alerts are received
                    </div>
                  </div>
                  <Switch
                    id="sound-alerts"
                    checked={notificationSettings.soundAlerts}
                    onCheckedChange={() => handleNotificationToggle("soundAlerts")}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSaveSettings} className="ml-auto">
                  <Save className="mr-2 h-4 w-4" /> Save Changes
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          {/* Alarm Tab */}
          <TabsContent value="alarm">
            <Card>
              <CardHeader>
                <CardTitle>Alarm System Configuration</CardTitle>
                <CardDescription>
                  Manage your alarm system settings and security modes.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="alarm-mode">Alarm Mode</Label>
                  <Select 
                    value={alarmSettings.alarmMode} 
                    onValueChange={handleAlarmModeChange}
                  >
                    <SelectTrigger id="alarm-mode">
                      <SelectValue placeholder="Select mode" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="disarmed">
                        <div className="flex items-center">
                          <Shield className="mr-2 h-4 w-4 text-muted-foreground" />
                          <span>Disarmed</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="home">
                        <div className="flex items-center">
                          <Shield className="mr-2 h-4 w-4 text-accent" />
                          <span>Home Mode</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="away">
                        <div className="flex items-center">
                          <Shield className="mr-2 h-4 w-4 text-security-green" />
                          <span>Away Mode</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="night">
                        <div className="flex items-center">
                          <Shield className="mr-2 h-4 w-4 text-security-blue" />
                          <span>Night Mode</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="alarm-volume">Alarm Volume</Label>
                    <span className="text-sm text-muted-foreground">{alarmSettings.alarmVolume}%</span>
                  </div>
                  <Slider
                    id="alarm-volume"
                    min={0}
                    max={100}
                    step={1}
                    value={[alarmSettings.alarmVolume]}
                    onValueChange={handleVolumeChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="entry-delay">Entry Delay (seconds)</Label>
                  <Select 
                    value={alarmSettings.delaySeconds.toString()} 
                    onValueChange={(value) => {
                      setAlarmSettings((prev) => ({
                        ...prev,
                        delaySeconds: parseInt(value),
                      }));
                    }}
                  >
                    <SelectTrigger id="entry-delay">
                      <SelectValue placeholder="Select delay" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">No Delay</SelectItem>
                      <SelectItem value="15">15 Seconds</SelectItem>
                      <SelectItem value="30">30 Seconds</SelectItem>
                      <SelectItem value="45">45 Seconds</SelectItem>
                      <SelectItem value="60">60 Seconds</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-muted-foreground mt-1">
                    Time between door opening and alarm triggering
                  </p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <Label>Scheduled Security Modes</Label>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Set up automatic alarm mode changes based on your schedule through the chatbot assistant.
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSaveSettings} className="ml-auto">
                  <Save className="mr-2 h-4 w-4" /> Save Changes
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          {/* Camera Tab */}
          <TabsContent value="camera">
            <Card>
              <CardHeader>
                <CardTitle>Camera Settings</CardTitle>
                <CardDescription>
                  Manage your security camera configuration.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center py-8">
                  <Video className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                  <p className="text-lg font-medium">Camera Settings Coming Soon</p>
                  <p className="text-muted-foreground">
                    This feature will be available in the next update.
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Button disabled className="ml-auto">
                  Coming Soon
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Settings;
