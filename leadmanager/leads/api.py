from .models import Lead
from .serializers import LeadSerializer

from datetime import date, datetime
from rest_framework import viewsets, permissions, generics
from django.contrib.auth import get_user_model
import django_filters


class AdminAuthenticationPermission(permissions.BasePermission):

    def has_permission(self, request, view):
        user = request.user
        if user and user.is_authenticated:
            return user.is_superuser
        return False


class LeadViewSet(viewsets.ModelViewSet):
    serializer_class = LeadSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        today = datetime.now().date()
        return self.request.user.leads.filter(takenAtDate=today)

    def perform_create(self, serializer):
        serializer.save(patient=self.request.user)


class UserListFilter(django_filters.FilterSet):
    name = django_filters.CharFilter(lookup_expr='iexact')

    class Meta:
        model = get_user_model()
        fields = ['id']


class LeadIdAPI(generics.ListAPIView):
    permission_classes = [
        AdminAuthenticationPermission,
    ]
    serializer_class = LeadSerializer
    filter_class = UserListFilter

    def get_queryset(self):
        today = datetime.now().date()
        queryset = Lead.objects.filter(
            patient__pk=self.kwargs['pk'], takenAtDate=today)
        return queryset


class AllLeadsAPI(generics.ListAPIView):
    permission_classes = [
        AdminAuthenticationPermission
    ]
    serializer_class = LeadSerializer

    def get_queryset(self):
        queryset = Lead.objects.filter(takenAtDate=datetime.now().date())
        return queryset
