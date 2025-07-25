# Generated by Django 5.2.3 on 2025-06-27 08:49

import django.db.models.deletion
import server.models
import uuid
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=25)),
            ],
        ),
        migrations.CreateModel(
            name='ServerCategory',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=120)),
                ('icon', models.ImageField(upload_to=server.models.server_directory_path_picture)),
            ],
        ),
        migrations.CreateModel(
            name='TextChannels',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=25)),
                ('topic', models.CharField(max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='Server',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('picture', models.ImageField(upload_to=server.models.server_directory_path_picture)),
                ('banner', models.ImageField(upload_to=server.models.server_directory_path_banner)),
                ('title', models.CharField(max_length=25)),
                ('description', models.CharField(max_length=144)),
                ('date', models.DateTimeField(auto_now_add=True)),
                ('categories', models.ManyToManyField(to='server.category')),
                ('members', models.ManyToManyField(related_name='server_members', to=settings.AUTH_USER_MODEL)),
                ('moderators', models.ManyToManyField(related_name='server_moderators', to=settings.AUTH_USER_MODEL)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='server_owner', to=settings.AUTH_USER_MODEL)),
                ('server_category', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='server.servercategory')),
            ],
        ),
        migrations.AddField(
            model_name='category',
            name='text_channels',
            field=models.ManyToManyField(to='server.textchannels'),
        ),
    ]
