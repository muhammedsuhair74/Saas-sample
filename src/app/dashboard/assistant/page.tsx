// app/dashboard/assistant/page.tsx
import ChatBox from "@/components/ChatBox";

export default function AssistantPage() {
  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">🧠 AI Assistant</h1>
      <ChatBox />
    </div>
  );
}
