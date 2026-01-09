from typing import Dict, Any, List
from .base import Cube
import datetime

class NexusCube(Cube):
    def __init__(self):
        # In-memory "Long Term" storage simulation for MVP
        self.memory: List[Dict[str, str]] = []
        self.user_profile: Dict[str, str] = {}

    @property
    def name(self) -> str:
        return "Nexus Cube"

    @property
    def description(self) -> str:
        return "The Persistent Second Brain."

    def run(self, input_data: Any) -> Dict[str, Any]:
        """
        Input: {'text': "My dog's name is Rex"}
        Output: Response based on memory.
        """
        user_input = input_data.get("text", "").strip()
        timestamp = datetime.datetime.now().strftime("%H:%M")

        if not user_input:
            return {"status": "error", "message": "Empty input."}

        # 1. Memory Extraction (Mock Logic)
        tokens = user_input.lower().split()
        
        # Simple heuristic to "learn" facts
        if "my name is" in user_input.lower():
            name = user_input.lower().split("my name is")[-1].strip().title()
            self.user_profile["name"] = name
            response = f"Nice to meet you, {name}. I've saved that to my long-term memory."
        
        elif "remember that" in user_input.lower():
            fact = user_input.lower().split("remember that")[-1].strip()
            self.memory.append({"fact": fact, "time": timestamp})
            response = f"Got it. I'll remember that {fact}."

        elif "what do you know" in user_input.lower():
            if not self.memory and not self.user_profile:
                response = "I don't know much about you yet. Tell me something!"
            else:
                facts = [m['fact'] for m in self.memory]
                profile = [f"{k}: {v}" for k,v in self.user_profile.items()]
                response = "Here's what I have stored:\n" + "\n".join(profile + facts)

        elif "who am i" in user_input.lower():
             name = self.user_profile.get("name", "User")
             response = f"You are {name}."

        else:
            # Fallback Chat
            # TODO: Connect to local LLM (Phi-3)
            name = self.user_profile.get("name", "")
            prefix = f"{name}, " if name else ""
            response = f"{prefix}I've processed: '{user_input}'. (Memory Active)"

        # Append to conversation log (simulation)
        self.memory.append({"role": "user", "content": user_input, "time": timestamp})

        return {
            "status": "success",
            "reply": response,
            "memory_size": len(self.memory) + len(self.user_profile)
        }
