import torch
import torch.nn as nn
import torchvision.models as models

class SimpleCNN(nn.Module):
    """
    A simple Convolutional Neural Network for learning from scratch.
    Great for educational purposes and understanding feature extraction.
    """
    def __init__(self, num_classes=10):
        super(SimpleCNN, self).__init__()
        self.features = nn.Sequential(
            # Block 1
            nn.Conv2d(3, 32, kernel_size=3, padding=1),
            nn.ReLU(),
            nn.MaxPool2d(2, 2), # 224 -> 112
            
            # Block 2
            nn.Conv2d(32, 64, kernel_size=3, padding=1),
            nn.ReLU(),
            nn.MaxPool2d(2, 2), # 112 -> 56

            # Block 3
            nn.Conv2d(64, 128, kernel_size=3, padding=1),
            nn.ReLU(),
            nn.MaxPool2d(2, 2), # 56 -> 28
            
            # Block 4
            nn.Conv2d(128, 128, kernel_size=3, padding=1),
            nn.ReLU(),
            nn.MaxPool2d(2, 2), # 28 -> 14
        )
        
        self.classifier = nn.Sequential(
            nn.Flatten(),
            nn.Linear(128 * 14 * 14, 512),
            nn.ReLU(),
            nn.Dropout(0.5),
            nn.Linear(512, num_classes)
        )

    def forward(self, x):
        x = self.features(x)
        x = self.classifier(x)
        return x

def get_model(type, num_classes):
    """
    Factory function to get the appropriate model.
    """
    if type == "scratch":
        print(f"[Vision Core] Initializing SimpleCNN for {num_classes} classes.")
        return SimpleCNN(num_classes=num_classes)
    
    elif type == "pretrained":
        print(f"[Vision Core] Initializing MobileNetV3 (Pretrained) for {num_classes} classes.")
        # Load standard small model
        model = models.mobilenet_v3_small(weights='DEFAULT')
        
        # Freezing weights logic (optional, but good for speed)
        # For now, let's fine-tune everything for better adaptation, or just freeze features
        # for param in model.parameters():
        #     param.requires_grad = False
            
        # Replace head
        in_features = model.classifier[3].in_features
        model.classifier[3] = nn.Linear(in_features, num_classes)
        return model
        
    else:
        raise ValueError(f"Unknown model type: {type}")
