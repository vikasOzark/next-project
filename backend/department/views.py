from django.shortcuts import render
from department.models import Department
from rest_framework import viewsets
from department.serializers import DepartmentSerializer
from utils.permissions import TokenAuthentication


class DepartmentViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing and editing user instances.
    """
    permission_classes = [TokenAuthentication]
    serializer_class = DepartmentSerializer
    queryset = Department.objects.all()
