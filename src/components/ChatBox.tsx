"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader } from "lucide-react";
import { useState } from "react";
import { GiArtificialHive } from "react-icons/gi";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function ChatBox() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true); 

    try {
      let res = await fetch("/api/ai-assistant", {
        method: "POST",
        body: JSON.stringify({ message: input }),
      });
      if (!res.ok) {
        res = await fetch("/api/geminiaAi", {
          method: "POST",
          body: JSON.stringify({ message: input }),
          headers: { "Content-Type": "application/json" },
        });
      }

      const data = await res.json();

      if (data) {
        console.log(data.response);
        const assistantMessage: Message = {
          role: "assistant",
          content: data.text,
        };
        setMessages((prev) => [...prev, assistantMessage]);
      }
    } catch (err) {
      console.error("Error talking to AI:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="absolute bottom-10 right-10">
      {!isOpen && (
        <GiArtificialHive
          onClick={() => setIsOpen(true)}
          className="text-white text-2xl cursor-pointer"
        />
      )}
      {isOpen && (
        <div className="w-full max-w-2xl mx-auto border rounded-md p-4 flex flex-col h-[500px] bg-background shadow-md">
          <div className="flex justify-between mb-3 center">
            <p className="text-sm text-muted-foreground content-center">
              Powered by OpenAI
            </p>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
            >
              X
            </Button>
          </div>
          <ScrollArea className="flex-1 overflow-y-auto space-y-4 pr-2 mb-4">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`rounded p-3 text-sm whitespace-pre-wrap mt-2 ${
                  msg.role === "user"
                    ? "bg-primary text-primary-foreground self-end ml-12"
                    : "bg-muted text-muted-foreground self-start mr-12"
                }`}
              >
                {msg.content}
              </div>
            ))}
            {loading && (
              <div className="flex items-center text-sm text-muted-foreground gap-2">
                <Loader className="h-4 w-4 animate-spin" /> AI is thinking...
              </div>
            )}
          </ScrollArea>

          <div className="flex items-center gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask something..."
            />
            <Button onClick={sendMessage} disabled={loading}>
              Send
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
