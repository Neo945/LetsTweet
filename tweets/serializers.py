from rest_framework import serializers
from .models import Tweet

TWEET_ACTION_OPTIONS = ['like','unlike','retweet']

class TweetActionSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    action = serializers.CharField()

    def validate_action(self,value):
        if not value.lower().strip() in TWEET_ACTION_OPTIONS:
            raise serializers.ValidationError("Not a currect value")
        return value.lower().strip()


class TweetSerialzer(serializers.ModelSerializer):
    likes = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = Tweet
        fields = ['id','content','likes']
    
    def get_likes(self,obj):
        return obj.likes.count()


    def clean_content(self,data):
        if len(data)>255:
            raise serializers.ValidationError("Too long")
        return data
