from django.db import models
from django.conf import settings
import random

User = settings.AUTH_USER_MODEL

# Create your models here.
class Tweet(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE) # many to many
    content = models.TextField(null=True,blank=True)
    image = models.FileField(upload_to='images/',blank=True,null=True)

    class Meta:
        ordering = ['-id']

    def serialize(self):
        return {
            "id":self.id,
            "content":self.content,
            "likes":random.randint(0,100)
        }
    def __str__(self) -> str:
        return self.content
