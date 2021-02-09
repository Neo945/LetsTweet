from django.shortcuts import render
from django.views import View
from django.shortcuts import HttpResponse
# Create your views here.
class HomeView(View):
    def get(self,request,*args,**kwargs):
        print(request,args,kwargs)
        return HttpResponse("Hello World")

class Tweets_detail_views(View):
    def get(self,request,tweet_id,*args,**kwargs):
        print(request,args,kwargs)
        return HttpResponse(f"Hello {tweet_id} World")

