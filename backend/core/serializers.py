from django.db import models
import rest_framework
from rest_framework.serializers import ModelSerializer, SlugRelatedField
from rest_framework.fields import SlugField
from core.models import App, Category
import requests
from rest_framework.exceptions import ValidationError


def is_working_url(value):
    try:
        r = requests.get(value)
        assert r.status_code == 200
    except:
        raise ValidationError(f"Is not a valid url")

class AppWriteSerializer(ModelSerializer):

    category = SlugRelatedField(queryset=Category.objects.all(),
                    slug_field='name')

    class Meta:
        fields = ('title', 'category', 'tags', 'description', 'website', 'twitter',
            'dikalo', 'telegram', 'facebook', 'whatsapp', 'playstore', 'appstore',
            'slack', 'github_account', 'otherslinks', 'contact')
        model = App

# TODO: add validation methods


class AppSerializer(AppWriteSerializer):

    class Meta:
        fields = ('title', 'category', 'tags', 'description', 'website', 'twitter',
            'dikalo', 'telegram', 'facebook', 'whatsapp', 'playstore', 'appstore',
            'slack', 'github_account', 'otherslinks')
        model = App
