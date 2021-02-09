from django.http.response import Http404, JsonResponse
from django.shortcuts import render
from django.views import View
from django.shortcuts import HttpResponse
from .models import Tweet

# Create your views here.
class HomeView(View):
    def get(self,request,*args,**kwargs):
        # print(request,args,kwargs)
        # return HttpResponse("Hello World")
        return render(request=request,template_name='pages/home.html',context={})

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

class tweet_list_view(View):
    def get(self,request,*args,**kwargs):
        tl = Tweet.objects.all()
        data_list = [{'id':x.id,'content':x.content} for x in tl]
        return JsonResponse({'response':data_list})
