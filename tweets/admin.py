from django.contrib import admin
from .models import Tweet,TweetLike
# from django.contrib.auth.models import User
# from django.contrib.sites.models import Site
# from django.contrib.auth.models import Group
# Register your models here.
class TweetLikeAdmin(admin.TabularInline):
    model = TweetLike

class TweetAdmin(admin.ModelAdmin):
    inlines = [TweetLikeAdmin]
    list_display = ['__str__','user']
    search_fields = ['user__username','user__email','content']
    class Meta:
        model = Tweet

admin.site.register(Tweet,TweetAdmin)
# admin.site.unregister(User)
# admin.site.unregister(Group)
# admin.site.unregister(Site)
