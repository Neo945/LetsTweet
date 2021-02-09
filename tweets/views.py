from django.http.response import Http404, JsonResponse
from django.shortcuts import render
from django.views import View
from django.shortcuts import HttpResponse
from .models import Tweet

# Create your views here.
class HomeView(View):
    def get(self,request,*args,**kwargs):
        # print(request,args,kwargs)
        return HttpResponse("Hello World")

class Tweets_detail_views(View):
    def get(self,request,tweet_id,*args,**kwargs):
        data = {
            "id" : int(tweet_id),
        }
        status = 200
        try:
            tweet = Tweet.objects.get(pk = int(tweet_id))
            data['content'] = tweet.content
        except:
            # raise Http404
            data['message'] = 'Not found'
            status = 404
        return JsonResponse(data,status=status)

