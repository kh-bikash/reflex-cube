from abc import ABC, abstractmethod
from typing import Dict, Any, Optional

class Cube(ABC):
    @property
    @abstractmethod
    def name(self) -> str:
        pass

    @property
    @abstractmethod
    def description(self) -> str:
        pass

    @abstractmethod
    def run(self, input_data: Any) -> Dict[str, Any]:
        """
        Execute the Cube's main logic.
        input_data can be text, image bytes, or json.
        """
        pass
