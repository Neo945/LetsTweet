from django.http.response import Http404, JsonResponse
from django.shortcuts import render,redirect
from django.views import View
from django.shortcuts import HttpResponse
from rest_framework import serializers
from rest_framework.utils.serializer_helpers import JSONBoundField
from .models import Tweet, User
from .forms import TweetFOrm
import random
from django.utils.http import is_safe_url
from django.conf import settings
from .serializers import TweetSerialzer,TweetActionSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view,permission_classes,authentication_classes
from rest_framework.authentication import SessionAuthentication
from rest_framework.permissions import IsAuthenticated
from letsTweet.rest_api.dev import DevAuthentication
import json
# Create your views here.
class HomeView(View):
    def get(self,request,*args,**kwargs):
        return render(request=request,template_name='pages/home.html',context={})

@api_view(['GET'])
def Tweets_detail_views(request,tweet_id,*args,**kwargs):
    tweet = Tweet.objects.filter(pk=tweet_id)
    if not tweet.exists():
        return Response({},status=404)
    serializer = TweetSerialzer(tweet.first())
    return Response(serializer.data,status=201)

@api_view(['DELETE','GET','POST'])
@permission_classes([IsAuthenticated])
def Tweets_delete_views(request,tweet_id,*args,**kwargs):
    tweet = Tweet.objects.filter(pk=tweet_id)
    if not tweet.exists():
        return Response({},status=404)
    tweet = tweet.filter(user=request.user)
    if not tweet.exists():
        return Response({},status=401)
    tweet.first().delete()
    return Response({'message':'success'},status=201)



@api_view(['GET'])
def tweet_list_view(request,*args,**kwargs):
    tl = Tweet.objects.all()
    seriazer = TweetSerialzer(tl,many=True)
    return Response(seriazer.data)

@api_view(['POST'])
# @authentication_classes([SessionAuthentication]) # D
@permission_classes([IsAuthenticated])
def TweetForm(request,*args,**kwargs):
    data = request.data or None
    serializer = TweetSerialzer(data=data)
    if serializer.is_valid():
        obj = serializer.save(user=request.user)
        return Response(serializer.data,status=201)
    return Response({},status=400)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def Tweets_action_views(request,*args,**kwargs):
    print(request.data)
    serializer = TweetActionSerializer(data=request.data)
    if serializer.is_valid(raise_exception=True):
        data = serializer.validated_data
        tweet_id = data.get('id')
        action = data.get('action')
        content = data.get('content')
        tweet = Tweet.objects.filter(pk=tweet_id)
        if not tweet.exists():
            return Response({},status=404)
        obj = tweet.first()
        if action=='like':
            obj.likes.add(request.user)
        elif action=='unlike':
            obj.likes.remove(request.user)
        elif action=='retweet':
            newT = Tweet.objects.create(user=request.user,parent=obj,content=content)
    return Response({'message':'success'},status=200)















class Tweets_detail_views_pure_django(View):
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

class tweet_list_view_pure_django(View):
    def get(self,request,*args,**kwargs):
        tl = Tweet.objects.all()
        data_list = [x.serialize() for x in tl]
        return JsonResponse({'response':data_list})

class TweetFormPureDjango(View):
    def get(self,request,*args,**kwargs):
        print(request.user)
        if not request.user.is_authenticated:
            if request.is_ajax():
                return JsonResponse({},status=401)
            return JsonResponse(settings.LOGIN_URL)
        return render(request,'components/forms.html',{'form':TweetFOrm()})
    def post(self,request,*args,**kwargs):
        user = request.user or None
        if not request.user.is_authenticated:
            user = None
            if request.is_ajax():
                return JsonResponse({},status=401)
            return JsonResponse(settings.LOGIN_URL)
        next_url = request.POST.get('next') or None
        form = TweetFOrm(request.POST)
        if form.is_valid():
            obj = form.save(commit=False)
            obj.user = user
            obj.save()
            if request.is_ajax():
                return JsonResponse(obj.serialize(),status=201)
            if next_url!=None and is_safe_url(next_url,settings.ALLOWED_HOSTS):
                return redirect(next_url)
            form = TweetFOrm()
        if form.errors:
            if request.is_ajax():
                return JsonResponse(form.errors,status=400)
        return render(request,'components/forms.html',{'form':TweetFOrm()})
