from rest_framework import serializers
from .models import Tweet

class TweetSerialzer(serializers.ModelSerializer):
    class Meta:
        model = Tweet
        fields = ['content']
    
    def clean_content(self,data):
        if len(data)>255:
            raise serializers.ValidationError("Too long")
        return data
