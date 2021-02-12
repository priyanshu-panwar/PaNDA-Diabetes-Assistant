from rest_framework import generics, permissions
from rest_framework.response import Response
from knox.models import AuthToken, User
from django.contrib.auth import get_user_model
import django_filters

from .serializers import LoginSerializer, UserSerializer, RegisterSerializer

# isSuperUserPermission


class AdminAuthenticationPermission(permissions.BasePermission):

    def has_permission(self, request, view):
        user = request.user
        if user and user.is_authenticated:
            return user.is_superuser
        return False


# Register API
class RegisterAPI(generics.GenericAPIView):
    permission_classes = [
        AdminAuthenticationPermission,
    ]
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)[1]
        })

# Login API


class LoginAPI(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)[1]
        })

# get user api


class UserAPI(generics.RetrieveAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user


# get all users
class AllUserAPI(generics.ListAPIView):
    permission_classes = [
        AdminAuthenticationPermission,
    ]
    serializer_class = UserSerializer
    queryset = get_user_model().objects.filter(is_superuser=False)

# get user by id


class UserListFilter(django_filters.FilterSet):
    name = django_filters.CharFilter(lookup_expr='iexact')

    class Meta:
        model = get_user_model()
        fields = ['id']


class UserIdAPI(generics.ListAPIView):
    permission_classes = [
        AdminAuthenticationPermission,
    ]
    serializer_class = UserSerializer
    filter_class = UserListFilter

    def get_queryset(self):
        queryset = get_user_model().objects.filter(pk=self.kwargs['pk'])
        return queryset
