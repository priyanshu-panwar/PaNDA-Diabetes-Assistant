from .models import Lead
from .serializers import LeadSerializer

from datetime import date, datetime

from rest_framework import viewsets, permissions


class LeadViewSet(viewsets.ModelViewSet):
    serializer_class = LeadSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        today = datetime.now().date()
        return self.request.user.leads.filter(takenAtDate=today)

    def perform_create(self, serializer):
        serializer.save(patient=self.request.user)
