from .models import Server, ServerCategory, TextChannels, Category
from .serializers import ServerCategorySerializer, ServerTextChannelsSerializer, ServerChannelCategories, ServerSerializer, ServerDetailSerializer
from django.db.models import Q
from django.contrib.auth.models import User

#Django REst
from rest_framework.views import APIView
from rest_framework import permissions
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes, parser_classes
from rest_framework.parsers import MultiPartParser, JSONParser
from django.http.response import Http404
from rest_framework.pagination import PageNumberPagination

#For the Server Search
from rest_framework import generics
from rest_framework import filters


class ResponsePagination(PageNumberPagination):
    page_query_param = 'p'
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 10


class ServerAPI(APIView):
    permission_classes = [permissions.IsAuthenticated]
    parser_classes = [MultiPartParser]

    def get(self, request, format=None):
        servers = Server.objects.filter(Q(members = request.user) | Q(user = request.user)).distinct()
        serializer = ServerSerializer(servers, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = ServerSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save(user = request.user)
            return Response(serializer.data, status = status.HTTP_201_Created)
        return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated,])
def ServerDetail(request, pk):
    if request.method == 'GET':
        server = Server.objects.get(pk=pk)
        serializer = ServerDetailSerializer(server)
        if request.user in server.moderators.all() or request.user == request.user:
            admin = True
        else:
            admin = False
        return Response({
            'data': serializer.data,
            'is_admin': admin,
        })
@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated,])
def ServerCategoriesAPI(request, pk):
    if request.method == 'GET':
        categories = ServerCategory.objects.all()
        serializer = ServerCategorySerializer(categories, many=True)
        return Response(serializer.data)

class ServersInCategoryAPI(APIView):
    permission_classes = [permissions.IsAuthenticated]
    def get_object(self, pk):
        try:
            return ServerCategory.objects.get(pk=pk)
        except ServerCategory.DoesNotExist:
            raise Http404
    def get(self, request, pk, format=None):
        category = self.get_object(pk)
        servers = Server.objects.filter(server_category = category).order_by('-date')
        paginator = ResponsePagination()
        results = paginator.paginate_queryset(servers, many =True)
        serializer = ServerSerializer(results, many=True, context={'request': request})
        return paginator.get_paginated_response(serializer.data)

class ServerSearch(generics.ListAPIView):
    queryset = Server.objects.all()
    serializer_class = ServerSerializer
    filter_backends = (filters.SearchFilter,)
    search_fields = ('title', 'description')
