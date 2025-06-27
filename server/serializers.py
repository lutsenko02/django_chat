from rest_framework import serializers

from .models import *
from authy.serializers import UserSerializer


class ServerCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ServerCategory
        fields = '__all__'

class ServerTextChannelsSerializer(serializers.ModelSerializer):
    class Meta:
        model = TextChannels
        fields = '__all__'

class ServerChannelCategories(serializers.ModelSerializer):
    text_channels = ServerTextChannelsSerializer(many=True, required=False)
    class Meta:
        model = Category
        fields = '__all__'

class ServerSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    members = UserSerializer(many=True, required=False)
    moderators = UserSerializer(many=True, required=False)
    categories = ServerChannelCategories(many=True, required=False)
    server_category = ServerChannelCategories(required=False)
    class Meta:
        model = Server
        fields = '__all__'

class ServerDetailSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    members = UserSerializer(many=True)
    class Meta:
        model = Server
        fields = '__all__'
        depth = 2