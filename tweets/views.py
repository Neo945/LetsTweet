from django.http.response import Http404
from django.shortcuts import render
from django.views import View
from django.shortcuts import HttpResponse
from .models import Tweet

# Create your views here.
class HomeView(View):
    def get(self,request,*args,**kwargs):
        print(request,args,kwargs)
        return HttpResponse("Hello World")

class Tweets_detail_views(View):
    def get(self,request,tweet_id,*args,**kwargs):
        try:
            tweet = Tweet.objects.get(pk = tweet_id)
        except:
            raise Http404
        return HttpResponse(f"Hello {tweet_id}- {tweet.content}")

