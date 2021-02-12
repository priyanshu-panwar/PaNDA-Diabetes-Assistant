from django.urls import path, include
from .api import RegisterAPI, LoginAPI, UserAPI, AllUserAPI, UserIdAPI
from knox import views as knox_views

urlpatterns = [
    path('api/auth', include('knox.urls')),
    path('api/auth/register', RegisterAPI.as_view()),
    path('api/auth/login', LoginAPI.as_view()),
    path('api/auth/user', UserAPI.as_view()),
    path('api/auth/logout', knox_views.LogoutView.as_view(), name="knox_logout"),
    path('api/auth/allusers', AllUserAPI.as_view(), name="all_users"),
    path('api/auth/user/<int:pk>', UserIdAPI.as_view(), name="single_user"),
]
