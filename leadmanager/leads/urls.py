from django.urls import path
from rest_framework import routers
from .api import LeadViewSet, LeadIdAPI, AllLeadsAPI

router = routers.DefaultRouter()
router.register('api/leads', LeadViewSet, 'leads')

urlpatterns = router.urls

urlpatterns += [
    path('api/leads/<int:pk>', LeadIdAPI.as_view(), name='single_leads'),
    path('api/leads/all', AllLeadsAPI.as_view(), name='all_leads')
]
