from django.urls import path

from . import api

urlpatterns = [
    path('server/getservers/', api.ServerAPI.as_view(), name='api-get-servers'),
    path('server/createserver/', api.ServerAPI.as_view(), name='api-create-server'),
    path('server/getserverdetail/<uuid:pk>', api.ServerDetail, name='api-get-server-detail'),
    path('server/getcategories/', api.ServerCategoriesAPI, name='api-get-server-categories'),
    path('server/getserverscategory/<int:pk>', api.ServersInCategoryAPI.as_view(), name='api-get-servers-in-category'),
    path('server/searchserver/', api.ServerSearch.as_view(), name='api-search-server'),
    path('server/create-category-channel', api.CategoryChannelsCreate, name='api-create-category-channel'),
]

