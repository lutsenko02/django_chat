import os
import uuid

from django.conf import settings
from django.contrib.auth.models import User
from django.db import models


def server_directory_path_banner(instance, filename):
    return f"servers/server_{instance.id}/banner.jpg"

def server_directory_path_picture(instance, filename):
    return f"servers/server_{instance.id}/picture.jpg"

class ServerCategory(models.Model):
    title = models.CharField(max_length=120)
    icon = models.ImageField(upload_to=server_directory_path_picture)
    def __str__(self):
        return self.title

class TextChannels(models.Model):
    title = models.CharField(max_length=25)
    topic = models.CharField(max_length=50)
    def __str__(self):
        return self.title

class Category(models.Model):
    title = models.CharField(max_length=25)
    text_channels = models.ManyToManyField(TextChannels)
    def __str__(self):
        return self.title

# Create your models here.
class Server(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    picture = models.ImageField(upload_to=server_directory_path_picture, null=False)
    banner = models.ImageField(upload_to=server_directory_path_banner, null=False)
    title = models.CharField(max_length=25)
    description = models.CharField(max_length=144, null=False)
    date = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='server_owner')
    members = models.ManyToManyField(User, related_name='server_members')
    moderators = models.ManyToManyField(User, related_name='server_moderators')
    categories = models.ManyToManyField(Category)
    server_category = models.ForeignKey(ServerCategory, on_delete=models.CASCADE, null=True)
    def __str__(self):
        return self.title
