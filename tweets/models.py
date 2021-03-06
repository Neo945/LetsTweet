from django.db import models
from django.conf import settings
import random

User = settings.AUTH_USER_MODEL
class TweetLike(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    tweet = models.ForeignKey('Tweet',on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True)

# Create your models here.
class Tweet(models.Model):
    parent = models.ForeignKey('self',null=True,on_delete=models.SET_NULL)
    user = models.ForeignKey(User,on_delete=models.CASCADE) # many to many
    content = models.TextField(null=True,blank=True)
    image = models.FileField(upload_to='images/',blank=True,null=True)
    likes = models.ManyToManyField(User,related_name='tweet_user',blank=True,through=TweetLike)
    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-id']

    @property
    def is_retweet(self):
        return self.parent!=None


    # def serialize(self):
        # return {
            # "id":self.id,
            # "content":self.content,
            # "likes":random.randint(0,100)
        # }
    def __str__(self) -> str:
        return self.content
