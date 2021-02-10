from django.http.response import Http404, JsonResponse
from django.shortcuts import render,redirect
from django.views import View
from django.shortcuts import HttpResponse
from .models import Tweet
from .forms import TweetFOrm
import random

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
        data_list = [{'id':x.id,'content':x.content,"likes":random.randint(0,100)} for x in tl]
        return JsonResponse({'response':data_list})


class TweetForm(View):
    def get(self,request,*args,**kwargs):
        return render(request,'components/forms.html',{'form':TweetFOrm()})
    def post(self,request,*args,**kwargs):
        next_url = request.POST.get('next') or None
        form = TweetFOrm(request.POST)
        if form.is_valid():
            obj = form.save(commit=True)
            obj.save()
            if next_url!=None:
                return redirect(next_url)
            form = TweetFOrm()
        return render(request,'components/forms.html',{'form':TweetFOrm()})
