from django.db import models

# Create your models here.

class Category(models.Model):

    name = models.CharField(max_length=255, unique=True)


class App(models.Model):

    title = models.CharField(max_length=255)
    category = models.ForeignKey(Category, models.DO_NOTHING)
    tags = models.CharField(max_length=255)
    description = models.TextField()
    website = models.CharField(max_length=255)
    twitter = models.CharField(max_length=255, null=True, blank=True)
    dikalo = models.CharField(max_length=255, null=True, blank=True)
    telegram = models.CharField(max_length=255, null=True, blank=True)
    facebook = models.CharField(max_length=255, null=True, blank=True)
    whatsapp = models.CharField(max_length=255, null=True, blank=True)
    playstore = models.CharField(max_length=255, null=True, blank=True)
    appstore = models.CharField(max_length=255, null=True, blank=True)
    slack = models.CharField(max_length=255, null=True, blank=True)
    github_account = models.CharField(max_length=255, null=True, blank=True)
    otherslinks = models.TextField(null=True, blank=True)
    contact = models.CharField(max_length=255)

    class Meta:
        ordering = ('id',)
