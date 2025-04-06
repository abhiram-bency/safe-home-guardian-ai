
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Users, Bot, Lock } from "lucide-react";

const About = () => {
  const team = [
    { name: "Abhiram B", role: "Team Lead & Frontend Developer" },
    { name: "Noshin M K", role: "Security Specialist & Backend Developer" },
    { name: "Aditya Vardhan Singh", role: "AI Integration & UX Designer" },
  ];

  return (
    <MainLayout>
      <div className="container py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">About Safe Home Guardian</h1>
            <div className="w-20 h-1 bg-accent mx-auto mb-6"></div>
            <p className="text-lg text-muted-foreground">
              Enhancing home security through intelligent AI-powered monitoring
            </p>
          </div>

          <Card className="mb-12">
            <CardContent className="pt-6">
              <p className="mb-4">
                This project, Safe Home Guardian, is developed as part of an academic endeavor by a dedicated team of Computer Science Engineering students. The team includes Abhiram B, Noshin M K, Aditya Vardhan Singh, who are currently pursuing their B.Tech in Computer Science Engineering.
              </p>
              <p className="mb-4">
                The main objective of this project is to utilize artificial intelligence to help users monitor home security in a smart and efficient way, enhancing the security through intelligent digital support.
              </p>
              <p>
                Our AI-powered assistant provides real-time updates on door/window status, camera feeds, potential intrusions, and helps manage security settings—all through a simple, intuitive interface.
              </p>
            </CardContent>
          </Card>

          <h2 className="text-2xl font-bold mb-6 text-center">Core Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div className="bg-white p-6 rounded-lg shadow-md flex">
              <div className="mr-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Comprehensive Monitoring</h3>
                <p className="text-muted-foreground">
                  Get real-time updates on all entry points, camera feeds, and potential security threats.
                </p>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md flex">
              <div className="mr-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <Bot className="h-6 w-6 text-primary" />
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">AI-Powered Assistant</h3>
                <p className="text-muted-foreground">
                  Interact naturally with our intelligent chatbot to get information and manage your security system.
                </p>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md flex">
              <div className="mr-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <Lock className="h-6 w-6 text-primary" />
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Smart Alert System</h3>
                <p className="text-muted-foreground">
                  Receive intelligent alerts that minimize false alarms while ensuring you're notified of real threats.
                </p>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md flex">
              <div className="mr-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <Users className="h-6 w-6 text-primary" />
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">User-Friendly Interface</h3>
                <p className="text-muted-foreground">
                  Manage complex security features through an intuitive, easy-to-navigate interface.
                </p>
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-bold mb-6 text-center">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {team.map((member, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="bg-secondary h-24 w-24 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">
                    {member.name.charAt(0)}
                  </span>
                </div>
                <h3 className="font-semibold text-lg">{member.name}</h3>
                <p className="text-muted-foreground">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default About;
