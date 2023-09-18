from django.shortcuts import render
from department.models import Department
from rest_framework import viewsets
from department.serializers import DepartmentSerializer


class DepartmentViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing and editing user instances.
    """
    serializer_class = DepartmentSerializer
    queryset = Department.objects.all()

    def to_representation(self, instance):
        data = super().to_representation(instance)

        # Add additional fields to the response
        data['additional_field'] = 'Some value'

        return data