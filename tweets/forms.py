from django import forms
from .models import Tweet

class TweetFOrm(forms.ModelForm):
    class Meta:
        model = Tweet
        fields = ['content']

    def clean_content(self):
        data = self.cleaned_data.get('content')
        if len(data)>255:
            raise forms.ValidationError("Too long")
        return data